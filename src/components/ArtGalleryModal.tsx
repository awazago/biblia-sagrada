import React, { useState } from 'react';
import { X, Image as ImageIcon, BookOpen, Sparkles, ExternalLink } from 'lucide-react';
import { BIBLE_ILLUSTRATIONS, type BibleIllustration } from '../data/illustrationsData';

interface ArtGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToChapter: (bookAbbrev: string, chapter: number) => void;
}

export const ArtGalleryModal: React.FC<ArtGalleryModalProps> = ({
  isOpen,
  onClose,
  onNavigateToChapter,
}) => {
  const [selectedArt, setSelectedArt] = useState<BibleIllustration | null>(null);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '840px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ImageIcon size={20} color="var(--accent-gold)" />
            <h2 className="modal-title">Galeria da Bíblia Ilustrada</h2>
          </div>
          <button className="icon-button" onClick={onClose} title="Fechar">
            <X size={20} />
          </button>
        </div>

        {/* Subtitle intro */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Grandes passagens e histórias das Escrituras em pinturas sacras clássicas. Clique em qualquer obra para ler o capítulo na Bíblia.
        </div>

        {/* Gallery Grid */}
        <div className="modal-body" style={{ padding: '20px', overflowY: 'auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '18px',
            }}
          >
            {BIBLE_ILLUSTRATIONS.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArt(art)}
                style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-card)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ position: 'relative', height: '170px', overflow: 'hidden' }}>
                  <img
                    src={art.imagePath}
                    alt={art.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.75)',
                      backdropFilter: 'blur(4px)',
                      color: 'var(--accent-gold)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    {art.bookName} {art.chapter}
                  </div>
                </div>

                <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                      {art.title}
                    </h3>
                    <p style={{ fontSize: '0.82rem', fontStyle: 'italic', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      "{art.subtitle}"
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-color)', fontSize: '0.76rem' }}>
                    <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>Ver Detalhes</span>
                    <ExternalLink size={14} color="var(--accent-gold)" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Art Detail Lightbox inside modal */}
        {selectedArt && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              zIndex: 1200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
            onClick={() => setSelectedArt(null)}
          >
            <div
              style={{
                maxWidth: '780px',
                width: '100%',
                backgroundColor: '#09090b',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid rgba(234, 179, 8, 0.3)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src={selectedArt.imagePath}
                  alt={selectedArt.title}
                  style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain', display: 'block' }}
                />
                <button
                  className="icon-button"
                  onClick={() => setSelectedArt(null)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: '#ffffff',
                    borderRadius: '50%',
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ padding: '20px 24px', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-gold)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  <Sparkles size={14} />
                  <span>{selectedArt.bookName} {selectedArt.chapter} • Arte Sacra</span>
                </div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', margin: '4px 0 6px 0' }}>
                  {selectedArt.title}
                </h2>
                <p style={{ fontStyle: 'italic', color: '#e4e4e7', fontSize: '0.92rem', margin: '0 0 10px 0' }}>
                  "{selectedArt.subtitle}"
                </p>
                <p style={{ color: '#a1a1aa', fontSize: '0.82rem', margin: '0 0 16px 0', lineHeight: 1.6 }}>
                  {selectedArt.artistNote}
                </p>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => {
                      onNavigateToChapter(selectedArt.bookAbbrev, selectedArt.chapter);
                      setSelectedArt(null);
                      onClose();
                    }}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      backgroundColor: 'var(--accent-gold)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                    }}
                  >
                    <BookOpen size={17} />
                    <span>Ler {selectedArt.bookName} {selectedArt.chapter} na Bíblia</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
