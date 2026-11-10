import React from 'react';
import { X, Smartphone, Share, PlusSquare, Cloud } from 'lucide-react';

interface IosInstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IosInstallGuideModal: React.FC<IosInstallGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '540px' }}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Smartphone size={20} color="var(--accent-gold)" />
            <h2 className="modal-title">Como Instalar no iPhone (PWA)</h2>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Hero Callout */}
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--accent-gold-light)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <img
              src="/icons/apple-touch-icon.png"
              alt="Ícone Bíblia"
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              }}
            />
            <div>
              <div style={{ fontWeight: 700, color: 'var(--accent-gold)', fontSize: '1rem' }}>
                Transforme em App Nativo no iPhone
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                Funciona em tela cheia, sem barra de navegação, com ícone na sua tela inicial e leitura 100% offline!
              </div>
            </div>
          </div>

          {/* Steps for iOS Safari */}
          <div>
            <div
              style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                marginBottom: '14px',
                fontWeight: 700,
              }}
            >
              Passo a Passo no Safari (iPhone & iPad)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Step 1 */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: 'var(--accent-gold)',
                    flexShrink: 0,
                  }}
                >
                  1
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                    Toque no botão Compartilhar do Safari
                  </div>
                  <div style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    É o ícone com um quadrado e uma seta apontando para cima (
                    <Share size={14} style={{ verticalAlign: 'middle', margin: '0 2px' }} />
                    ) na barra inferior do Safari.
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: 'var(--accent-gold)',
                    flexShrink: 0,
                  }}
                >
                  2
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                    Role para cima e toque em "Adicionar à Tela de Início"
                  </div>
                  <div style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Procure pelo ícone com o sinal de mais (
                    <PlusSquare size={14} style={{ verticalAlign: 'middle', margin: '0 2px' }} />
                    ) no menu de opções.
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: 'var(--accent-gold)',
                    flexShrink: 0,
                  }}
                >
                  3
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                    Toque em "Adicionar" no canto superior direito
                  </div>
                  <div style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Pronto! O aplicativo da Bíblia Sagrada será colocado entre seus outros aplicativos.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Android & PC Note */}
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
            }}
          >
            <strong>No Computador ou Android:</strong> Clique no ícone de "Instalar" na barra de endereços do Chrome / Edge para ter a mesma experiência como aplicativo de desktop ou smartphone.
          </div>

          {/* Cloud Ready Notice */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--accent-gold)',
              fontSize: '0.82rem',
              fontWeight: 600,
            }}
          >
            <Cloud size={16} />
            <span>Pronto para publicação na nuvem (Vercel, Netlify, Cloudflare)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
