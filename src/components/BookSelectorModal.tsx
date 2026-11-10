import React, { useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import type { BookMeta } from '../types';

interface BookSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: BookMeta[];
  currentBook: BookMeta | null;
  currentChapter: number;
  onSelect: (book: BookMeta, chapter: number) => void;
  defaultFilter?: string;
}

export const BookSelectorModal: React.FC<BookSelectorModalProps> = ({
  isOpen,
  onClose,
  books,
  currentBook,
  currentChapter,
  onSelect,
  defaultFilter = 'all',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>(defaultFilter);
  const [activeBook, setActiveBook] = useState<BookMeta | null>(currentBook);
  const [viewStep, setViewStep] = useState<'books' | 'chapters'>('books');

  // Sync active book when opening
  React.useEffect(() => {
    if (isOpen) {
      setActiveBook(currentBook);
      setViewStep('books');
      setSearchTerm('');
    }
  }, [isOpen, currentBook]);

  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      // Filter tab
      if (selectedFilter === 'salmos') {
        if (b.abbrev !== 'sl') return false;
      } else if (selectedFilter === 'ot') {
        if (!b.testament.includes('Antigo')) return false;
      } else if (selectedFilter === 'nt') {
        if (!b.testament.includes('Novo')) return false;
      } else if (selectedFilter === 'gospels') {
        if (!b.category.includes('Evangelho')) return false;
      } else if (selectedFilter === 'letters') {
        if (!b.category.includes('Carta')) return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        return (
          b.name.toLowerCase().includes(query) ||
          b.abbrev.toLowerCase().includes(query) ||
          b.category.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [books, selectedFilter, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 className="modal-title">
              {viewStep === 'books'
                ? 'Selecionar Livro'
                : `${activeBook?.name} — Escolha o Capítulo`}
            </h2>
            {viewStep === 'chapters' && (
              <button
                onClick={() => setViewStep('books')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--accent-gold)',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'underline',
                  marginLeft: '8px',
                }}
              >
                ← Voltar aos livros
              </button>
            )}
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {viewStep === 'books' ? (
            <>
              {/* Search input */}
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon-inside" />
                <input
                  type="text"
                  placeholder="Pesquisar livro (ex: Salmos, João, Romanos...)"
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>

              {/* Filter pills */}
              <div className="filter-pills-row">
                <button
                  className={`filter-pill ${selectedFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedFilter('all')}
                >
                  Todos (66)
                </button>
                <button
                  className={`filter-pill ${selectedFilter === 'salmos' ? 'active' : ''}`}
                  onClick={() => setSelectedFilter('salmos')}
                  style={{
                    backgroundColor:
                      selectedFilter === 'salmos' ? 'var(--accent-gold)' : undefined,
                  }}
                >
                  🕊️ Salmos (150)
                </button>
                <button
                  className={`filter-pill ${selectedFilter === 'ot' ? 'active' : ''}`}
                  onClick={() => setSelectedFilter('ot')}
                >
                  Antigo Testamento (39)
                </button>
                <button
                  className={`filter-pill ${selectedFilter === 'nt' ? 'active' : ''}`}
                  onClick={() => setSelectedFilter('nt')}
                >
                  Novo Testamento (27)
                </button>
                <button
                  className={`filter-pill ${selectedFilter === 'gospels' ? 'active' : ''}`}
                  onClick={() => setSelectedFilter('gospels')}
                >
                  Evangelhos
                </button>
                <button
                  className={`filter-pill ${selectedFilter === 'letters' ? 'active' : ''}`}
                  onClick={() => setSelectedFilter('letters')}
                >
                  Cartas / Epístolas
                </button>
              </div>

              {/* Grid of Books */}
              <div className="books-grid">
                {filteredBooks.map((b) => {
                  const isCurrent = currentBook?.abbrev === b.abbrev;
                  const isSalmos = b.abbrev === 'sl';
                  return (
                    <div
                      key={b.abbrev}
                      className={`book-card-item ${isCurrent ? 'selected' : ''}`}
                      onClick={() => {
                        setActiveBook(b);
                        setViewStep('chapters');
                      }}
                      style={
                        isSalmos
                          ? {
                              border: '1px solid var(--accent-gold)',
                              background: 'var(--accent-subtle)',
                            }
                          : undefined
                      }
                    >
                      <div className="book-card-name">
                        {isSalmos && '🕊️ '}
                        {b.name}
                      </div>
                      <div className="book-card-sub">
                        {b.chaptersCount} {b.chaptersCount === 1 ? 'capítulo' : 'capítulos'}
                      </div>
                      <div
                        style={{
                          fontSize: '0.68rem',
                          color: 'var(--accent-gold)',
                          marginTop: '2px',
                        }}
                      >
                        {b.category}
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredBooks.length === 0 && (
                <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                  Nenhum livro encontrado para "{searchTerm}".
                </div>
              )}
            </>
          ) : (
            /* Chapters Grid */
            <div>
              <div
                style={{
                  marginBottom: '16px',
                  padding: '12px 14px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  lineHeight: '1.5',
                  color: 'var(--text-secondary)',
                }}
              >
                <strong style={{ color: 'var(--text-primary)' }}>
                  {activeBook?.name}
                </strong>{' '}
                — {activeBook?.summary}
              </div>

              <div className="chapters-grid">
                {Array.from({ length: activeBook?.chaptersCount || 0 }, (_, i) => i + 1).map(
                  (chapNum) => {
                    const isSelected =
                      currentBook?.abbrev === activeBook?.abbrev &&
                      currentChapter === chapNum;
                    return (
                      <button
                        key={chapNum}
                        className={`chapter-btn-item ${isSelected ? 'active' : ''}`}
                        onClick={() => {
                          if (activeBook) {
                            onSelect(activeBook, chapNum);
                            onClose();
                          }
                        }}
                      >
                        {chapNum}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
