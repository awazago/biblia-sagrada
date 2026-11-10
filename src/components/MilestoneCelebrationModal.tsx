import { useState } from 'react';
import { X, Award, Sparkles, Heart, Copy, Check } from 'lucide-react';

interface MilestoneCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  milestoneDays: number;
}

const PIX_KEY = '453c92a9-7813-48fe-9f61-1b400357576e';

export const MilestoneCelebrationModal: React.FC<MilestoneCelebrationModalProps> = ({
  isOpen,
  onClose,
  milestoneDays,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(PIX_KEY).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '500px', textAlign: 'center' }}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color="var(--accent-gold)" />
            <h2 className="modal-title">Conquista Espiritual!</h2>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Trophy icon */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-gold-light)',
              border: '2px solid var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              color: 'var(--accent-gold)',
              boxShadow: '0 0 20px rgba(234, 179, 8, 0.25)',
            }}
          >
            <Sparkles size={36} />
          </div>

          <div>
            <div
              style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--accent-gold)',
                fontWeight: 700,
                marginBottom: '4px',
              }}
            >
              Marco de Constância
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              🔥 {milestoneDays} Dias Seguidos na Palavra!
            </h3>
          </div>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
            Parabéns por cuidar da sua vida espiritual e perseverar na presença de Deus. O Senhor honra o seu tempo e a sua dedicação diária.
          </p>

          {/* Contextual Gratitude & Voluntary Donation */}
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--accent-gold-light)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--accent-gold)',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-gold)', marginBottom: '4px' }}>
              <Heart size={16} fill="#ef4444" color="#ef4444" />
              <span>Gostaria de Apoiar este Aplicativo?</span>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-primary)', lineHeight: '1.5', margin: '0 0 10px 0' }}>
              Nosso app é mantido de forma 100% gratuita e sem anúncios graças à generosidade de irmãos como você. Qualquer quantia nos ajuda a cobrir os servidores:
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
              }}
            >
              <span
                style={{
                  flex: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.78rem',
                  color: 'var(--text-primary)',
                  wordBreak: 'break-all',
                }}
              >
                {PIX_KEY}
              </span>
              <button
                onClick={handleCopy}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: copied ? '#22c55e' : 'var(--accent-gold)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          {/* Continue button */}
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'var(--accent-gold)',
              color: '#ffffff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.92rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '4px',
            }}
          >
            Continuar Meditando
          </button>
        </div>
      </div>
    </div>
  );
};
