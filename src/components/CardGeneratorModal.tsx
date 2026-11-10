import React, { useRef, useState, useEffect } from 'react';
import { X, Download, Share2, Sparkles, Check } from 'lucide-react';

interface CardGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  referenceLabel: string;
  verses: { number: number; text: string }[];
}

export const CardGeneratorModal: React.FC<CardGeneratorModalProps> = ({
  isOpen,
  onClose,
  referenceLabel,
  verses,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [styleTheme, setStyleTheme] = useState<'gold' | 'night' | 'parchment' | 'emerald'>('gold');
  const [imageGeneratedUrl, setImageGeneratedUrl] = useState<string | null>(null);
  const [sharedDone, setSharedDone] = useState(false);

  useEffect(() => {
    if (!isOpen || !canvasRef.current || verses.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensions: 1080 x 1350 (standard portrait Instagram / WhatsApp card)
    canvas.width = 1080;
    canvas.height = 1350;

    // Background Gradient based on theme
    const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    if (styleTheme === 'gold') {
      bgGrad.addColorStop(0, '#1c1306');
      bgGrad.addColorStop(0.5, '#2e1d05');
      bgGrad.addColorStop(1, '#110b02');
    } else if (styleTheme === 'night') {
      bgGrad.addColorStop(0, '#0a0e1a');
      bgGrad.addColorStop(0.5, '#121829');
      bgGrad.addColorStop(1, '#05070d');
    } else if (styleTheme === 'parchment') {
      bgGrad.addColorStop(0, '#f9f5ea');
      bgGrad.addColorStop(0.5, '#eee5cf');
      bgGrad.addColorStop(1, '#dfd2b5');
    } else if (styleTheme === 'emerald') {
      bgGrad.addColorStop(0, '#062016');
      bgGrad.addColorStop(0.5, '#0b3827');
      bgGrad.addColorStop(1, '#03120c');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle golden decorative outer & inner border
    const isParchment = styleTheme === 'parchment';
    ctx.strokeStyle = isParchment ? 'rgba(161, 98, 7, 0.4)' : 'rgba(234, 179, 8, 0.4)';
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    ctx.strokeStyle = isParchment ? 'rgba(161, 98, 7, 0.2)' : 'rgba(234, 179, 8, 0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(62, 62, canvas.width - 124, canvas.height - 124);

    // Decorative Cross / Emblem at top
    const cx = canvas.width / 2;
    const topY = 160;

    ctx.fillStyle = isParchment ? '#b45309' : '#facc15';
    // Draw golden cross
    ctx.fillRect(cx - 5, topY - 35, 10, 70);
    ctx.fillRect(cx - 24, topY - 14, 48, 10);

    // Small rays
    ctx.font = '600 24px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = isParchment ? '#78350f' : '#eab308';
    ctx.fillText('B Í B L I A   S A G R A D A', cx, topY + 70);

    // Scripture Text
    const fullText = verses.map((v) => v.text).join(' ');
    ctx.fillStyle = isParchment ? '#231f1a' : '#fdfbf7';
    ctx.font = '400 44px "Literata", Georgia, serif';
    ctx.textAlign = 'center';

    // Word wrap helper
    const words = fullText.split(' ');
    let lines: string[] = [];
    let currentLine = '';
    const maxWidth = 840;

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    // Limit lines if text is huge
    if (lines.length > 10) {
      lines = lines.slice(0, 10);
      lines[9] += '...';
    }

    const lineHeight = 64;
    const startY = 400 + (600 - lines.length * lineHeight) / 2;

    lines.forEach((line, index) => {
      ctx.fillText(line, cx, startY + index * lineHeight);
    });

    // Reference at bottom
    ctx.fillStyle = isParchment ? '#a16207' : '#facc15';
    ctx.font = '700 38px "Cinzel", Georgia, serif';
    ctx.fillText(referenceLabel, cx, 1140);

    // Small footer watermark
    ctx.fillStyle = isParchment ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)';
    ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Aplicativo Bíblia Sagrada PWA', cx, 1220);

    setImageGeneratedUrl(canvas.toDataURL('image/png'));
  }, [isOpen, styleTheme, referenceLabel, verses]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!imageGeneratedUrl) return;
    const link = document.createElement('a');
    link.download = `biblia-${referenceLabel.replace(/[\s:]+/g, '-')}.png`;
    link.href = imageGeneratedUrl;
    link.click();
  };

  const handleShare = async () => {
    if (!imageGeneratedUrl) return;
    if (navigator.share) {
      try {
        const blob = await (await fetch(imageGeneratedUrl)).blob();
        const file = new File([blob], 'versiculo.png', { type: 'image/png' });
        await navigator.share({
          title: referenceLabel,
          text: `"${verses.map((v) => v.text).join(' ')}" — ${referenceLabel}`,
          files: [file],
        });
        setSharedDone(true);
        setTimeout(() => setSharedDone(false), 2000);
      } catch (e) {
        console.log('Compartilhamento cancelado ou não suportado:', e);
      }
    } else {
      handleDownload();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px' }}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--accent-gold)" />
            <h2 className="modal-title">Cartão de Versículo</h2>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ textAlign: 'center' }}>
          {/* Style Selector */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '14px' }}>
            {[
              { id: 'gold', label: 'Dourado' },
              { id: 'night', label: 'Noite' },
              { id: 'parchment', label: 'Pergaminho' },
              { id: 'emerald', label: 'Esmeralda' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStyleTheme(st.id as any)}
                className={`filter-pill ${styleTheme === st.id ? 'active' : ''}`}
                style={{ fontSize: '0.8rem' }}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Canvas Preview */}
          <div
            style={{
              maxWidth: '280px',
              margin: '0 auto 16px auto',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-color)',
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={handleDownload}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
              }}
            >
              <Download size={16} />
              <span>Baixar Imagem</span>
            </button>

            <button
              onClick={handleShare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'var(--accent-gold)',
                color: '#ffffff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
              }}
            >
              {sharedDone ? <Check size={16} /> : <Share2 size={16} />}
              <span>{sharedDone ? 'Compartilhado!' : 'Compartilhar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
