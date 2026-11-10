import React, { useState } from 'react';
import { X, Heart, Copy, Check, Sparkles, ShieldCheck } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PIX_KEY = '453c92a9-7813-48fe-9f61-1b400357576e';

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
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
        style={{ maxWidth: '520px' }}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={20} color="#ef4444" fill="#ef4444" />
            <h2 className="modal-title">Apoie este Ministério</h2>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Hero Callout */}
          <div
            style={{
              padding: '16px 18px',
              backgroundColor: 'var(--accent-gold-light)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--accent-gold)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--accent-gold)',
                fontWeight: 700,
                fontSize: '0.82rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '6px',
              }}
            >
              <Sparkles size={14} />
              <span>Sem Anúncios • 100% Gratuito</span>
            </div>
            <p
              style={{
                color: 'var(--text-primary)',
                fontSize: '0.92rem',
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              Este aplicativo foi desenvolvido para abençoar vidas com a Palavra de Deus. Sua contribuição voluntária ajuda a manter os servidores ativos, rápidos e disponíveis para milhares de pessoas.
            </p>
          </div>

          {/* Scripture Quote */}
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: 'var(--bg-secondary)',
              borderLeft: '3px solid var(--accent-gold)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
            }}
          >
            "Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, pois Deus ama quem dá com alegria."
            <div style={{ fontWeight: 700, fontStyle: 'normal', color: 'var(--accent-gold)', marginTop: '4px', fontSize: '0.8rem' }}>
              2 Coríntios 9:7
            </div>
          </div>

          {/* PIX Key Box */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                marginBottom: '8px',
                fontWeight: 700,
              }}
            >
              Chave PIX (Aleatória)
            </label>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
              }}
            >
              <span
                style={{
                  flex: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.88rem',
                  color: 'var(--text-primary)',
                  wordBreak: 'break-all',
                  userSelect: 'all',
                }}
              >
                {PIX_KEY}
              </span>

              <button
                onClick={handleCopy}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: copied ? '#22c55e' : 'var(--accent-gold)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background-color 0.2s',
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.84rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
            }}
          >
            <strong>Como transferir pelo seu banco:</strong>
            <ol style={{ paddingLeft: '18px', marginTop: '6px' }}>
              <li>Abra o aplicativo do seu banco (Nubank, Itaú, Bradesco, Inter, etc.).</li>
              <li>Vá na área <strong>PIX</strong> e selecione <strong>Chave Aleatória</strong> ou <strong>Copia e Cola</strong>.</li>
              <li>Cole a chave copiada acima e confirme o valor que desejar doar.</li>
            </ol>
          </div>

          {/* Gratitude & Security */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
            }}
          >
            <ShieldCheck size={16} color="#10b981" />
            <span>Qualquer quantia faz a diferença e ajuda a manter o app no ar. Que Deus abençoe!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
