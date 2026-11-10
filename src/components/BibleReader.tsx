import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Highlighter,
  Volume2,
  Copy,
  Image as ImageIcon,
  Bookmark,
  X,
  Check,
} from 'lucide-react';
import type { BookMeta, BookDetail, Highlight, ReadingSettings } from '../types';

interface BibleReaderProps {
  book: BookMeta | null;
  bookDetail: BookDetail | null;
  chapter: number;
  settings: ReadingSettings;
  highlights: Highlight[];
  onPreviousChapter: () => void;
  onNextChapter: () => void;
  onExplainVerses: (verses: { number: number; text: string }[]) => void;
  onHighlightVerses: (
    verseNumbers: number[],
    color: 'yellow' | 'green' | 'blue' | 'pink' | null
  ) => void;
  onBookmarkVerse: (verseNumber: number, text: string) => void;
  onCreateCard: (verses: { number: number; text: string }[]) => void;
  isLoading: boolean;
}

export const BibleReader: React.FC<BibleReaderProps> = ({
  book,
  bookDetail,
  chapter,
  settings,
  highlights,
  onPreviousChapter,
  onNextChapter,
  onExplainVerses,
  onHighlightVerses,
  onBookmarkVerse,
  onCreateCard,
  isLoading,
}) => {
  const [selectedVerseNumbers, setSelectedVerseNumbers] = useState<number[]>([]);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Clear selections when chapter changes
  React.useEffect(() => {
    setSelectedVerseNumbers([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [book?.abbrev, chapter]);

  if (isLoading || !book || !bookDetail) {
    return (
      <div className="reader-wrapper" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>📖</div>
        <p style={{ color: 'var(--text-muted)' }}>Carregando as Sagradas Escrituras...</p>
      </div>
    );
  }

  const chapterIndex = chapter - 1;
  const verses = bookDetail.chapters[chapterIndex] || [];

  const handleVerseClick = (verseNum: number) => {
    setSelectedVerseNumbers((prev) => {
      if (prev.includes(verseNum)) {
        return prev.filter((n) => n !== verseNum);
      } else {
        return [...prev, verseNum].sort((a, b) => a - b);
      }
    });
  };

  const getSelectedVersesData = () => {
    return selectedVerseNumbers.map((num) => ({
      number: num,
      text: verses[num - 1] || '',
    }));
  };

  const handleCopy = () => {
    const selected = getSelectedVersesData();
    if (selected.length === 0) return;

    const range =
      selected.length === 1
        ? `${chapter}:${selected[0].number}`
        : `${chapter}:${selected[0].number}-${selected[selected.length - 1].number}`;
    const textToCopy = `"${selected.map((v) => v.text).join(' ')}" — ${book.name} ${range} (NVI)`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    });
  };

  const handleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta leitura por áudio.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const selected = getSelectedVersesData();
    const textToRead =
      selected.length > 0
        ? selected.map((v) => v.text).join(' ')
        : verses.join(' ');

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const isFirstChapter = chapter === 1;
  const isLastChapter = chapter === book.chaptersCount;

  let fontFamilyStyle = 'var(--font-serif)';
  if (settings.fontFamily === 'sans') fontFamilyStyle = 'var(--font-sans)';
  else if (settings.fontFamily === 'serif') fontFamilyStyle = 'Georgia, serif';

  let lineSpacingStyle = '1.85';
  if (settings.lineSpacing === 'comfortable') lineSpacingStyle = '1.65';
  if (settings.lineSpacing === 'spacious') lineSpacingStyle = '2.1';

  return (
    <main className="reader-wrapper">
      {/* Chapter Navigation top */}
      <div className="chapter-nav-bar">
        <button
          className="nav-arrow-btn"
          onClick={onPreviousChapter}
          disabled={isFirstChapter}
          title="Capítulo Anterior"
        >
          <ChevronLeft size={16} />
          <span>Anterior</span>
        </button>

        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          {book.category}
        </div>

        <button
          className="nav-arrow-btn"
          onClick={onNextChapter}
          disabled={isLastChapter}
          title="Próximo Capítulo"
        >
          <span>Próximo</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Chapter Hero */}
      <div className="chapter-title-hero">
        <span className="chapter-badge">
          {book.abbrev === 'sl' ? 'Salmo' : 'Capítulo'} {chapter}
        </span>
        <h1 className="chapter-main-title">
          {book.abbrev === 'sl' ? `Salmo ${chapter}` : `${book.name} ${chapter}`}
        </h1>
        <p className="chapter-author-note">
          {book.author ? `Escrito por ${book.author} • ` : ''}
          {book.summary}
        </p>
      </div>

      {/* Verses Flow */}
      <article
        className="scripture-container"
        style={{
          fontFamily: fontFamilyStyle,
          fontSize: `${settings.fontSize}px`,
          lineHeight: lineSpacingStyle,
        }}
      >
        {verses.map((verseText, idx) => {
          const verseNum = idx + 1;
          const isSelected = selectedVerseNumbers.includes(verseNum);

          const hl = highlights.find(
            (h) =>
              h.bookAbbrev === book.abbrev &&
              h.chapter === chapter &&
              h.verseNumber === verseNum
          );

          let hlClass = '';
          if (hl) hlClass = `highlighted-${hl.color}`;

          return (
            <div
              key={verseNum}
              className={`verse-row ${isSelected ? 'selected' : ''} ${hlClass}`}
              onClick={() => handleVerseClick(verseNum)}
            >
              <span className="verse-number">{verseNum}</span>
              <span className="verse-text">{verseText}</span>
            </div>
          );
        })}
      </article>

      {/* Bottom Chapter Switcher */}
      <div
        className="chapter-nav-bar"
        style={{ marginTop: '36px', borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}
      >
        <button
          className="nav-arrow-btn"
          onClick={onPreviousChapter}
          disabled={isFirstChapter}
        >
          <ChevronLeft size={16} />
          <span>{book.name} {chapter - 1}</span>
        </button>

        <button
          className="nav-arrow-btn"
          onClick={onNextChapter}
          disabled={isLastChapter}
        >
          <span>{book.name} {chapter + 1}</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Floating Action Menu when 1+ verses are selected */}
      {selectedVerseNumbers.length > 0 && (
        <aside className="verse-selection-toolbar" role="toolbar" aria-label="Ações de versículo">
          {/* Main Action: Explicar Trecho */}
          <button
            className="toolbar-btn primary"
            onClick={() => onExplainVerses(getSelectedVersesData())}
            title="Explicar o significado, contexto e aplicação prática deste trecho"
            id="btn-explain-passage"
          >
            <Sparkles size={16} />
            <span>Explicar Trecho</span>
          </button>

          {/* Color Highlight */}
          <div style={{ position: 'relative' }}>
            <button
              className="toolbar-btn"
              onClick={() => setShowColorPicker(!showColorPicker)}
              title="Destacar com cor"
            >
              <Highlighter size={15} />
              <span>Marcar</span>
            </button>

            {showColorPicker && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '42px',
                  left: '0',
                  backgroundColor: 'var(--sheet-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 10px',
                  display: 'flex',
                  gap: '8px',
                  boxShadow: 'var(--shadow-md)',
                  zIndex: 60,
                }}
              >
                {(['yellow', 'green', 'blue', 'pink'] as const).map((color) => {
                  const bg =
                    color === 'yellow'
                      ? '#fde047'
                      : color === 'green'
                      ? '#86efac'
                      : color === 'blue'
                      ? '#93c5fd'
                      : '#f9a8d4';
                  return (
                    <button
                      key={color}
                      className="color-swatch-btn"
                      style={{ backgroundColor: bg }}
                      onClick={() => {
                        onHighlightVerses(selectedVerseNumbers, color);
                        setShowColorPicker(false);
                      }}
                      title={`Marcar com ${color}`}
                    />
                  );
                })}
                <button
                  onClick={() => {
                    onHighlightVerses(selectedVerseNumbers, null);
                    setShowColorPicker(false);
                  }}
                  title="Remover marcação"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                  }}
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Audio Speech */}
          <button
            className="toolbar-btn"
            onClick={handleSpeech}
            title={isSpeaking ? 'Pausar áudio' : 'Ouvir leitura em áudio'}
          >
            <Volume2 size={15} color={isSpeaking ? 'var(--accent-gold)' : undefined} />
            <span>{isSpeaking ? 'Parar' : 'Ouvir'}</span>
          </button>

          {/* Copy formatted text */}
          <button
            className="toolbar-btn"
            onClick={handleCopy}
            title="Copiar com referência"
          >
            {copiedNotification ? <Check size={15} color="#22c55e" /> : <Copy size={15} />}
            <span>{copiedNotification ? 'Copiado!' : 'Copiar'}</span>
          </button>

          {/* Create Image Card */}
          <button
            className="toolbar-btn"
            onClick={() => onCreateCard(getSelectedVersesData())}
            title="Criar cartão com imagem para redes sociais"
          >
            <ImageIcon size={15} />
            <span>Card</span>
          </button>

          {/* Bookmark */}
          <button
            className="toolbar-btn"
            onClick={() => {
              const selected = getSelectedVersesData();
              if (selected[0]) {
                onBookmarkVerse(selected[0].number, selected[0].text);
              }
            }}
            title="Adicionar aos favoritos"
          >
            <Bookmark size={15} />
          </button>

          {/* Clear selection */}
          <button
            className="icon-button"
            onClick={() => setSelectedVerseNumbers([])}
            title="Desmarcar seleção"
            style={{ width: '28px', height: '28px' }}
          >
            <X size={15} />
          </button>
        </aside>
      )}
    </main>
  );
};
