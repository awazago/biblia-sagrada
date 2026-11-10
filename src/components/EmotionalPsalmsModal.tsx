import React, { useState } from 'react';
import { X, Sparkles, Feather, ArrowRight } from 'lucide-react';
import { EMOTIONAL_CATEGORIES } from '../data/emotionalPsalmsData';
import type { BookMeta } from '../types';

interface EmotionalPsalmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPsalm: (psalmNumber: number) => void;
  salmosBook?: BookMeta | null;
}

export const EmotionalPsalmsModal: React.FC<EmotionalPsalmsModalProps> = ({
  isOpen,
  onClose,
  onSelectPsalm,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ansiedade');
  const [viewMode, setViewMode] = useState<'needs' | 'all150'>('needs');

  if (!isOpen) return null;

  const currentCategory =
    EMOTIONAL_CATEGORIES.find((c) => c.id === selectedCategory) ||
    EMOTIONAL_CATEGORIES[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Feather size={20} color="var(--accent-gold)" />
            <h2 className="modal-title">Salmos para sua Alma</h2>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* View Mode Switcher */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <button
              onClick={() => setViewMode('needs')}
              className={`filter-pill ${viewMode === 'needs' ? 'active' : ''}`}
              style={{ flex: 1, textAlign: 'center' }}
            >
              🕊️ Por Necessidade / Momento
            </button>
            <button
              onClick={() => setViewMode('all150')}
              className={`filter-pill ${viewMode === 'all150' ? 'active' : ''}`}
              style={{ flex: 1, textAlign: 'center' }}
            >
              📜 Todos os 150 Salmos
            </button>
          </div>

          {viewMode === 'needs' ? (
            <>
              {/* Category Pills */}
              <div className="filter-pills-row" style={{ marginBottom: '14px' }}>
                {EMOTIONAL_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`filter-pill ${isSelected ? 'active' : ''}`}
                    >
                      <span>{cat.emoji}</span>
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Category Description Banner */}
              <div
                style={{
                  padding: '12px 14px',
                  backgroundColor: 'var(--accent-gold-light)',
                  border: '1px solid var(--accent-gold)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '16px',
                  fontSize: '0.88rem',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Sparkles size={16} color="var(--accent-gold)" />
                <span>{currentCategory.description}</span>
              </div>

              {/* List of Recommended Psalms for this need */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentCategory.psalms.map((item) => (
                  <div
                    key={item.number}
                    onClick={() => {
                      onSelectPsalm(item.number);
                      onClose();
                    }}
                    style={{
                      padding: '14px 16px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-gold)';
                      e.currentTarget.style.backgroundColor = 'var(--accent-subtle)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--accent-gold)' }}>
                          Salmo {item.number}
                        </span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          — {item.title}
                        </span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: 'var(--accent-gold)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                        }}
                      >
                        <span>Ler Salmo</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                        fontSize: '0.92rem',
                        color: 'var(--text-primary)',
                        lineHeight: '1.5',
                      }}
                    >
                      "{item.keyVerse}"
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      💡 {item.themeDesc}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Grid of all 150 Psalms */
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Toque em qualquer número para abrir o Salmo diretamente:
              </p>
              <div className="chapters-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(46px, 1fr))' }}>
                {Array.from({ length: 150 }, (_, i) => i + 1).map((psalmNum) => (
                  <button
                    key={psalmNum}
                    className="chapter-btn-item"
                    onClick={() => {
                      onSelectPsalm(psalmNum);
                      onClose();
                    }}
                  >
                    {psalmNum}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
