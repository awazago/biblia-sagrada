import React from 'react';
import { X, Sliders, Heart, Calendar, Image as ImageIcon } from 'lucide-react';
import type { ReadingSettings, ThemeMode } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ReadingSettings;
  onUpdateSettings: (newSettings: Partial<ReadingSettings>) => void;
  onOpenInstallGuide: () => void;
  onOpenDonation: () => void;
  onOpenReadingPlans: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onOpenInstallGuide,
  onOpenDonation,
  onOpenReadingPlans,
}) => {
  if (!isOpen) return null;

  const themes: { id: ThemeMode; label: string; icon: string; previewBg: string; previewText: string }[] = [
    { id: 'light', label: 'Claro (Papel)', icon: '☀️', previewBg: '#fcfaf6', previewText: '#231f1a' },
    { id: 'sepia', label: 'Sépia (Pergaminho)', icon: '📜', previewBg: '#f4ecda', previewText: '#382c1e' },
    { id: 'dark', label: 'Noite', icon: '🌙', previewBg: '#0e131f', previewText: '#f3efe6' },
    { id: 'oled', label: 'OLED (iPhone)', icon: '🖤', previewBg: '#000000', previewText: '#faf8f5' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '520px' }}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={18} color="var(--accent-gold)" />
            <h2 className="modal-title">Ajustes de Leitura</h2>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Theme Selection */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                marginBottom: '10px',
                fontWeight: 700,
              }}
            >
              Tema Visual
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {themes.map((t) => {
                const isSelected = settings.theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onUpdateSettings({ theme: t.id })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: t.previewBg,
                      color: t.previewText,
                      border: isSelected
                        ? '2px solid var(--accent-gold)'
                        : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 0 0 2px var(--accent-gold)' : undefined,
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{t.icon}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <label
                style={{
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--text-muted)',
                  fontWeight: 700,
                }}
              >
                Tamanho da Fonte
              </label>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-gold)' }}>
                {settings.fontSize}px
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>A-</span>
              <input
                type="range"
                min="16"
                max="28"
                step="1"
                value={settings.fontSize}
                onChange={(e) => onUpdateSettings({ fontSize: parseInt(e.target.value, 10) })}
                style={{
                  flex: 1,
                  accentColor: 'var(--accent-gold)',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>A+</span>
            </div>
          </div>

          {/* Font Family */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                marginBottom: '10px',
                fontWeight: 700,
              }}
            >
              Estilo da Tipografia
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { id: 'literata', label: 'Literata (Bíblica)' },
                { id: 'serif', label: 'Georgia' },
                { id: 'sans', label: 'Sem Serifa' },
              ].map((f) => {
                const isSelected = settings.fontFamily === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => onUpdateSettings({ fontFamily: f.id as any })}
                    className={`filter-pill ${isSelected ? 'active' : ''}`}
                    style={{ flex: 1, textAlign: 'center' }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Line spacing */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                marginBottom: '10px',
                fontWeight: 700,
              }}
            >
              Espaçamento entre Linhas
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { id: 'comfortable', label: 'Confortável' },
                { id: 'relaxed', label: 'Relaxado' },
                { id: 'spacious', label: 'Espaçoso' },
              ].map((s) => {
                const isSelected = settings.lineSpacing === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => onUpdateSettings({ lineSpacing: s.id as any })}
                    className={`filter-pill ${isSelected ? 'active' : ''}`}
                    style={{ flex: 1, textAlign: 'center' }}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Illustrated Bible Mode Toggle */}
          <div
            style={{
              padding: '14px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <ImageIcon size={16} color="var(--accent-gold)" />
                <span>Bíblia Ilustrada (Artes Sacras)</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Exibir pinturas clássicas em passagens e capítulos marcantes
              </div>
            </div>
            <button
              onClick={() =>
                onUpdateSettings({
                  showIllustrations: settings.showIllustrations === false ? true : false,
                })
              }
              className={`filter-pill ${settings.showIllustrations !== false ? 'active' : ''}`}
              style={{ padding: '6px 14px', fontSize: '0.82rem' }}
            >
              {settings.showIllustrations !== false ? 'Ativado' : 'Desativado'}
            </button>
          </div>

          {/* Reading Plans Banner in Settings */}
          <div
            style={{
              padding: '14px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} color="var(--accent-gold)" />
                <span>Planos de Leitura Bíblica</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Guia didático O.R.A.R. e metas diárias
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenReadingPlans();
              }}
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Ver Planos
            </button>
          </div>

          {/* Donation Callout in Settings */}
          <div
            style={{
              padding: '14px',
              backgroundColor: 'var(--accent-gold-light)',
              border: '1px solid var(--accent-gold)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Heart size={16} fill="#ef4444" color="#ef4444" />
                <span>Apoie este Aplicativo</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                Ajude a manter os servidores ativos via PIX
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenDonation();
              }}
              style={{
                backgroundColor: 'var(--accent-gold)',
                color: '#ffffff',
                border: 'none',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Fazer Doação
            </button>
          </div>

          {/* Install PWA Guide Banner */}
          <div
            style={{
              padding: '14px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                App no Celular / iPhone
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Instale este app sem precisar de App Store
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenInstallGuide();
              }}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Ver Tutorial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
