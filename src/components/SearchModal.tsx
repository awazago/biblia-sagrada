import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import type { BookMeta } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: BookMeta[];
  onSelectResult: (book: BookMeta, chapter: number, verseNum?: number) => void;
}

const QUICK_SEARCH_TOPICS = [
  { label: '🕊️ Salmo 23 (O Bom Pastor)', bookAbbrev: 'sl', chapter: 23 },
  { label: '🛡️ Salmo 91 (Abrigo do Altíssimo)', bookAbbrev: 'sl', chapter: 91 },
  { label: '🌿 Salmo 1 (A Árvore Frutífera)', bookAbbrev: 'sl', chapter: 1 },
  { label: '🏔️ Salmo 121 (O Meu Socorro)', bookAbbrev: 'sl', chapter: 121 },
  { label: '❤️ João 3:16 (O Amor de Deus)', bookAbbrev: 'jo', chapter: 3 },
  { label: '⛰️ Mateus 5 (As Bem-Aventuranças)', bookAbbrev: 'mt', chapter: 5 },
  { label: '✨ Romanos 8 (Mais que Vencedores)', bookAbbrev: 'rm', chapter: 8 },
  { label: '🕊️ 1 Coríntios 13 (O Amor Ágape)', bookAbbrev: '1co', chapter: 13 },
  { label: '💪 Filipenses 4 (A Paz e a Força)', bookAbbrev: 'fp', chapter: 4 },
  { label: '⚔️ Efésios 6 (A Armadura de Deus)', bookAbbrev: 'ef', chapter: 6 },
  { label: '🌟 Isaías 53 (O Servo Sofredor)', bookAbbrev: 'is', chapter: 53 },
  { label: '🌱 Jeremias 29:11 (Planos de Paz)', bookAbbrev: 'jr', chapter: 29 },
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  books,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const parseReference = (text: string) => {
    const trimmed = text.trim().toLowerCase();
    const match = trimmed.match(/^([a-zà-ú\s0-9]+)\s+(\d+)(?::(\d+))?$/i);
    if (!match) return null;

    const bookQuery = match[1].trim();
    const chap = parseInt(match[2], 10);
    const verse = match[3] ? parseInt(match[3], 10) : undefined;

    const matchedBook = books.find(
      (b) =>
        b.name.toLowerCase() === bookQuery ||
        b.abbrev.toLowerCase() === bookQuery ||
        b.name.toLowerCase().startsWith(bookQuery)
    );

    if (matchedBook && chap >= 1 && chap <= matchedBook.chaptersCount) {
      return { book: matchedBook, chapter: chap, verse };
    }
    return null;
  };

  const directRef = parseReference(query);

  const matchedBooks = books.filter((b) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.abbrev.toLowerCase().includes(q) ||
      b.summary.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px' }}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={18} color="var(--accent-gold)" />
            <h2 className="modal-title">Buscar nas Escrituras</h2>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Search box */}
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon-inside" />
            <input
              type="text"
              placeholder="Digite um livro, capítulo ou tema (ex: Salmo 23, João 3, paz, esperança)..."
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>

          {/* Direct parsed reference jump */}
          {directRef && (
            <div
              style={{
                marginBottom: '16px',
                padding: '12px 16px',
                backgroundColor: 'var(--accent-gold-light)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                border: '1px solid var(--accent-gold)',
              }}
              onClick={() => {
                onSelectResult(directRef.book, directRef.chapter, directRef.verse);
                onClose();
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>
                  Abrir passagem imediatamente:
                </div>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                  {directRef.book.name} capítulo {directRef.chapter}
                  {directRef.verse ? `, versículo ${directRef.verse}` : ''}
                </div>
              </div>
              <ArrowRight size={18} color="var(--accent-gold)" />
            </div>
          )}

          {/* Matched books list */}
          {matchedBooks.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  fontSize: '0.78rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--text-muted)',
                  marginBottom: '8px',
                  fontWeight: 700,
                }}
              >
                Livros Correspondentes ({matchedBooks.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {matchedBooks.slice(0, 6).map((b) => (
                  <div
                    key={b.abbrev}
                    style={{
                      padding: '10px 14px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      onSelectResult(b, 1);
                      onClose();
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                        {b.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          marginLeft: '8px',
                        }}
                      >
                        {b.category} • {b.chaptersCount} cap.
                      </span>
                    </div>
                    <ArrowRight size={15} color="var(--text-muted)" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Shortcuts */}
          <div>
            <div
              style={{
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                marginBottom: '10px',
                fontWeight: 700,
              }}
            >
              Passagens & Salmos Mais Acessados
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '8px',
              }}
            >
              {QUICK_SEARCH_TOPICS.map((topic, idx) => {
                const book = books.find((b) => b.abbrev === topic.bookAbbrev);
                return (
                  <button
                    key={idx}
                    style={{
                      textAlign: 'left',
                      padding: '10px 12px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    onClick={() => {
                      if (book) {
                        onSelectResult(book, topic.chapter);
                        onClose();
                      }
                    }}
                  >
                    <span>{topic.label}</span>
                    <ArrowRight size={14} color="var(--accent-gold)" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
