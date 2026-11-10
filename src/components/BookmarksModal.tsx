import React, { useState } from 'react';
import { X, Bookmark, Highlighter, Trash2, ArrowRight, Download } from 'lucide-react';
import type { Highlight, PersonalNote, BookMeta } from '../types';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlights: Highlight[];
  notes: PersonalNote[];
  books?: BookMeta[];
  onNavigateTo: (bookAbbrev: string, chapter: number, verseNum: number) => void;
  onDeleteHighlight: (id: string) => void;
  onDeleteNote: (id: string) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  highlights,
  notes,
  onNavigateTo,
  onDeleteHighlight,
  onDeleteNote,
}) => {
  const [activeTab, setActiveTab] = useState<'highlights' | 'notes'>('highlights');

  if (!isOpen) return null;

  const handleExportBackup = () => {
    let content = `BÍBLIA SAGRADA - MINHAS ANOTAÇÕES E VERSÍCULOS MARCADOS\n`;
    content += `Data do Backup: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}\n`;
    content += `========================================================\n\n`;

    content += `--- VERSÍCULOS MARCADOS (${highlights.length}) ---\n\n`;
    highlights.forEach((hl, i) => {
      content += `${i + 1}. ${hl.bookName} ${hl.chapter}:${hl.verseNumber}\n`;
      content += `"${hl.text}"\n`;
      content += `Cor: ${hl.color} | Salvo em: ${new Date(hl.timestamp).toLocaleDateString('pt-BR')}\n\n`;
    });

    content += `\n--- MINHAS ANOTAÇÕES DE ESTUDO (${notes.length}) ---\n\n`;
    notes.forEach((nt, i) => {
      content += `${i + 1}. Referência: ${nt.bookName} Capítulo ${nt.chapter}\n`;
      content += `Data: ${new Date(nt.timestamp).toLocaleDateString('pt-BR')}\n`;
      content += `Anotação:\n${nt.note}\n\n`;
      content += `--------------------------------------------------------\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `biblia-sagrada-backup-${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '580px' }}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bookmark size={18} color="var(--accent-gold)" />
            <h2 className="modal-title">Marcadores & Notas</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {(highlights.length > 0 || notes.length > 0) && (
              <button
                className="icon-button"
                onClick={handleExportBackup}
                title="Exportar backup em arquivo texto"
              >
                <Download size={18} />
              </button>
            )}
            <button className="icon-button" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="modal-body">
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <button
              onClick={() => setActiveTab('highlights')}
              className={`filter-pill ${activeTab === 'highlights' ? 'active' : ''}`}
              style={{ flex: 1, textAlign: 'center' }}
            >
              Versículos Marcados ({highlights.length})
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`filter-pill ${activeTab === 'notes' ? 'active' : ''}`}
              style={{ flex: 1, textAlign: 'center' }}
            >
              Minhas Anotações ({notes.length})
            </button>
          </div>

          {/* Highlights Tab */}
          {activeTab === 'highlights' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {highlights.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                  <Highlighter size={32} style={{ opacity: 0.4, marginBottom: '8px' }} />
                  <div>Nenhum versículo marcado com cor ainda.</div>
                  <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                    Selecione qualquer versículo durante a leitura e toque em "Marcar".
                  </div>
                </div>
              ) : (
                highlights.map((hl) => {
                  const colorBg =
                    hl.color === 'yellow'
                      ? 'var(--hl-yellow)'
                      : hl.color === 'green'
                      ? 'var(--hl-green)'
                      : hl.color === 'blue'
                      ? 'var(--hl-blue)'
                      : 'var(--hl-pink)';

                  return (
                    <div
                      key={hl.id}
                      style={{
                        padding: '12px 14px',
                        backgroundColor: colorBg,
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: '0.88rem',
                            color: 'var(--accent-gold)',
                          }}
                        >
                          {hl.bookName} {hl.chapter}:{hl.verseNumber}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            onClick={() => {
                              onNavigateTo(hl.bookAbbrev, hl.chapter, hl.verseNumber);
                              onClose();
                            }}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--text-primary)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.78rem',
                              fontWeight: 600,
                            }}
                          >
                            <span>Ir ao texto</span>
                            <ArrowRight size={14} />
                          </button>
                          <button
                            onClick={() => onDeleteHighlight(hl.id)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--text-muted)',
                              cursor: 'pointer',
                            }}
                            title="Remover marcação"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '0.94rem',
                          color: 'var(--text-primary)',
                          lineHeight: '1.5',
                          margin: 0,
                        }}
                      >
                        "{hl.text}"
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {notes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                  <Bookmark size={32} style={{ opacity: 0.4, marginBottom: '8px' }} />
                  <div>Você ainda não salvou anotações.</div>
                  <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                    Ao abrir a explicação de qualquer trecho, você pode registrar suas revelações e orações no campo de anotações.
                  </div>
                </div>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    style={{
                      padding: '14px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          color: 'var(--accent-gold)',
                        }}
                      >
                        {note.bookName} {note.chapter}:{note.verseNumber}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => {
                            onNavigateTo(note.bookAbbrev, note.chapter, note.verseNumber);
                            onClose();
                          }}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                          }}
                        >
                          <span>Abrir</span>
                          <ArrowRight size={14} />
                        </button>
                        <button
                          onClick={() => onDeleteNote(note.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                          }}
                          title="Excluir nota"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-primary)',
                        lineHeight: '1.6',
                        whiteSpace: 'pre-line',
                        margin: 0,
                      }}
                    >
                      {note.note}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
