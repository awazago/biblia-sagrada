import React from 'react';
import { BookOpen, Search, Settings, Sparkles, Smartphone, Heart } from 'lucide-react';
import type { BookMeta } from '../types';

interface HeaderProps {
  currentBook: BookMeta | null;
  currentChapter: number;
  onOpenBookSelector: () => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onOpenInstallGuide: () => void;
  onOpenDailyDevotional: () => void;
  onOpenDonation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentBook,
  currentChapter,
  onOpenBookSelector,
  onOpenSearch,
  onOpenSettings,
  onOpenInstallGuide,
  onOpenDailyDevotional,
  onOpenDonation,
}) => {
  return (
    <header className="app-header">
      {/* Brand & Book/Chapter selector */}
      <div className="brand-badge" onClick={onOpenBookSelector}>
        <img
          src="/icons/apple-touch-icon.png"
          alt="Bíblia Sagrada"
          className="brand-icon-mini"
        />
        <button
          className="book-selector-btn"
          id="btn-book-selector"
          title="Escolher livro e capítulo"
        >
          <BookOpen size={16} color="var(--accent-gold)" />
          <span>
            {currentBook ? `${currentBook.name} ${currentChapter}` : 'Carregando...'}
          </span>
          <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>▾</span>
        </button>
      </div>

      {/* Header Actions */}
      <div className="header-actions">
        <button
          className="icon-button"
          onClick={onOpenDailyDevotional}
          title="Versículo e Reflexão do Dia"
          id="btn-daily-devotional"
        >
          <Sparkles size={19} color="var(--accent-gold)" />
        </button>

        <button
          className="icon-button"
          onClick={onOpenSearch}
          title="Buscar versículos e temas"
          id="btn-open-search"
        >
          <Search size={19} />
        </button>

        <button
          className="icon-button"
          onClick={onOpenDonation}
          title="Apoiar com Doação (PIX)"
          id="btn-open-donation"
          style={{ color: '#ef4444' }}
        >
          <Heart size={19} fill="#ef4444" fillOpacity={0.2} />
        </button>

        <button
          className="icon-button"
          onClick={onOpenInstallGuide}
          title="Instalar no iPhone / Celular (PWA)"
          id="btn-install-pwa"
        >
          <Smartphone size={19} />
        </button>

        <button
          className="icon-button"
          onClick={onOpenSettings}
          title="Ajustes de Leitura"
          id="btn-open-settings"
        >
          <Settings size={19} />
        </button>
      </div>
    </header>
  );
};
