import React, { useState } from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  Compass,
  HeartHandshake,
  Heart,
  ExternalLink,
  HelpCircle,
  PenTool,
  Check,
  Volume2,
} from 'lucide-react';
import type { GeneratedExplanation } from '../types';

interface ExplanationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  explanation: GeneratedExplanation | null;
  savedNote?: string;
  onSaveNote?: (noteText: string) => void;
}

export const ExplanationDrawer: React.FC<ExplanationDrawerProps> = ({
  isOpen,
  onClose,
  explanation,
  savedNote = '',
  onSaveNote,
}) => {
  const [noteText, setNoteText] = useState(savedNote);
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  React.useEffect(() => {
    setNoteText(savedNote);
  }, [savedNote, explanation?.referenceLabel]);

  if (!isOpen || !explanation) return null;

  const handleSave = () => {
    if (onSaveNote) {
      onSaveNote(noteText);
      setIsSavedNotice(true);
      setTimeout(() => setIsSavedNotice(false), 2000);
    }
  };

  const handleSpeech = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${explanation.title}. ${explanation.theologicalMeaning}. Aplicação prática: ${explanation.practicalApplication}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside
        className="drawer-content"
        onClick={(e) => e.stopPropagation()}
        aria-label="Painel de Estudo Bíblico"
      >
        {/* Header */}
        <header className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--accent-gold-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-gold)',
              }}
            >
              <Sparkles size={18} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--accent-gold)',
                  fontWeight: 700,
                }}
              >
                Estudo & Explicação
              </div>
              <h2
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                {explanation.referenceLabel}
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              className="icon-button"
              onClick={handleSpeech}
              title={isSpeaking ? 'Parar narração' : 'Ouvir explicação'}
            >
              <Volume2 size={18} color={isSpeaking ? 'var(--accent-gold)' : undefined} />
            </button>
            <button className="icon-button" onClick={onClose} title="Fechar painel">
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="drawer-body">
          {/* Selected Scripture Quote Card */}
          <section
            style={{
              padding: '16px 18px',
              backgroundColor: 'var(--bg-secondary)',
              borderLeft: '4px solid var(--accent-gold)',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-serif)',
              fontSize: '1.02rem',
              lineHeight: '1.7',
              color: 'var(--text-primary)',
              fontStyle: 'italic',
            }}
          >
            "{explanation.selectedText}"
          </section>

          {/* 1. Contexto Histórico & Autoria */}
          <section className="study-card">
            <h3 className="study-card-title">
              <Compass size={17} />
              <span>Contexto Histórico & Cultural</span>
            </h3>
            <div className="study-card-content">
              {explanation.historicalContext}
            </div>
          </section>

          {/* 2. Exegese & Significado do Trecho */}
          <section className="study-card">
            <h3 className="study-card-title">
              <BookOpen size={17} />
              <span>Significado Teológico & Exegese</span>
            </h3>
            <div className="study-card-content">
              {explanation.theologicalMeaning}
            </div>
          </section>

          {/* 3. Termos no Original (Hebraico / Grego) */}
          {explanation.originalKeywords && explanation.originalKeywords.length > 0 && (
            <section className="study-card">
              <h3 className="study-card-title">
                <Sparkles size={17} />
                <span>Termos-Chave no Idioma Original</span>
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '6px' }}>
                {explanation.originalKeywords.map((item, idx) => (
                  <div key={idx} className="original-keyword-badge">
                    <span className="original-term">{item.term}</span>
                    <span className="original-lang">{item.language}</span>
                    <span className="original-meaning">{item.meaning}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 4. Aplicação Prática para Sua Vida */}
          <section className="study-card" style={{ borderLeft: '3px solid #10b981' }}>
            <h3 className="study-card-title" style={{ color: '#10b981' }}>
              <HeartHandshake size={17} />
              <span>Aplicação Prática para Hoje</span>
            </h3>
            <div className="study-card-content">
              {explanation.practicalApplication}
            </div>
          </section>

          {/* 5. Oração Inspirada */}
          <section className="study-card" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <h3 className="study-card-title">
              <Heart size={17} />
              <span>Oração Baseada no Texto</span>
            </h3>
            <div
              className="study-card-content"
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '0.98rem',
                color: 'var(--text-primary)',
              }}
            >
              {explanation.prayer}
            </div>
          </section>

          {/* 6. Versículos Relacionados (Referências Cruzadas) */}
          {explanation.crossReferences && explanation.crossReferences.length > 0 && (
            <section className="study-card">
              <h3 className="study-card-title">
                <ExternalLink size={17} />
                <span>Versículos Relacionados</span>
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {explanation.crossReferences.map((ref, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 12px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.88rem',
                      lineHeight: '1.5',
                    }}
                  >
                    <div style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>
                      {ref.ref}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', marginTop: '3px' }}>
                      "{ref.text}"
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 7. Perguntas para Reflexão */}
          {explanation.reflectionQuestions && explanation.reflectionQuestions.length > 0 && (
            <section className="study-card">
              <h3 className="study-card-title">
                <HelpCircle size={17} />
                <span>Para Meditar e Compartilhar</span>
              </h3>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {explanation.reflectionQuestions.map((q, idx) => (
                  <li key={idx} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {q}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 8. Bloco de Anotações Pessoais */}
          <section className="study-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 className="study-card-title" style={{ margin: 0 }}>
                <PenTool size={16} />
                <span>Minhas Anotações & Revelações</span>
              </h3>
              <button
                onClick={handleSave}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'var(--accent-gold)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {isSavedNotice ? <Check size={14} /> : null}
                <span>{isSavedNotice ? 'Salvo!' : 'Salvar'}</span>
              </button>
            </div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Escreva aqui o que Deus ministrou ao seu coração através desta leitura..."
              rows={4}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                outline: 'none',
                resize: 'vertical',
              }}
            />
          </section>
        </div>
      </aside>
    </div>
  );
};
