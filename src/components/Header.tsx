import React from 'react';
import { BookOpen, Search, Settings, Sparkles, Smartphone, Heart, Calendar, Maximize2, Minimize2, Moon, Flame, Image as ImageIcon } from 'lucide-react';
import type { BookMeta } from '../types';

interface HeaderProps {
  currentBook: BookMeta | null;
  currentChapter: number;
  currentStreak: number;
  onOpenBookSelector: () => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onOpenInstallGuide: () => void;
  onOpenDailyDevotional: () => void;
  onOpenDonation: () => void;
  onOpenReadingPlans: () => void;
  onOpenSleepAudio: () => void;
  onOpenStreakInfo: () => void;
  onOpenArtGallery: () => void;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentBook,
  currentChapter,
  currentStreak,
  onOpenBookSelector,
  onOpenSearch,
  onOpenSettings,
  onOpenInstallGuide,
  onOpenDailyDevotional,
  onOpenDonation,
  onOpenReadingPlans,
  onOpenSleepAudio,
  onOpenStreakInfo,
  onOpenArtGallery,
  isFocusMode,
  onToggleFocusMode,
}) => {
  return (
    <header className={`app-header ${isFocusMode ? 'focus-mode-header' : ''}`}>
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
        {/* Streak Habit Tracker Badge */}
        <button
          className="streak-badge-btn"
          onClick={onOpenStreakInfo}
          title={`Constância: ${currentStreak} dia(s) consecutivo(s) na Palavra de Deus. Clique para ver seus marcos!`}
          id="btn-streak-badge"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(234, 179, 8, 0.12)',
            border: '1px solid rgba(234, 179, 8, 0.35)',
            borderRadius: '16px',
            padding: '4px 9px',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: 'var(--accent-gold)',
            cursor: 'pointer',
          }}
        >
          <Flame size={14} color="#f59e0b" fill="#f59e0b" />
          <span>{currentStreak}d</span>
        </button>

        {/* Reading Plans Button */}
        <button
          className="icon-button"
          onClick={onOpenReadingPlans}
          title="Planos de Leitura & Guia Como Ler a Bíblia"
          id="btn-reading-plans"
        >
          <Calendar size={19} color="var(--accent-gold)" />
        </button>

        {/* Illustrated Bible Art Gallery Button */}
        <button
          className="icon-button"
          onClick={onOpenArtGallery}
          title="Bíblia Ilustrada (Galeria de Arte Sacra)"
          id="btn-art-gallery"
        >
          <ImageIcon size={19} color="var(--accent-gold)" />
        </button>

        {/* Sleep Audio Button */}
        <button
          className="icon-button"
          onClick={onOpenSleepAudio}
          title="Áudio para Dormir em Paz (Salmos Narrados)"
          id="btn-sleep-audio"
        >
          <Moon size={19} color="var(--accent-gold)" />
        </button>

        {/* Daily Devotional */}
        <button
          className="icon-button"
          onClick={onOpenDailyDevotional}
          title="Versículo e Reflexão do Dia"
          id="btn-daily-devotional"
        >
          <Sparkles size={19} />
        </button>

        {/* Search */}
        <button
          className="icon-button"
          onClick={onOpenSearch}
          title="Buscar versículos e temas"
          id="btn-open-search"
        >
          <Search size={19} />
        </button>

        {/* Donation PIX */}
        <button
          className="icon-button"
          onClick={onOpenDonation}
          title="Apoiar com Doação (PIX)"
          id="btn-open-donation"
          style={{ color: '#ef4444' }}
        >
          <Heart size={19} fill="#ef4444" fillOpacity={0.2} />
        </button>

        {/* Focus Mode Toggle */}
        <button
          className="icon-button"
          onClick={onToggleFocusMode}
          title={isFocusMode ? 'Sair do Modo Foco' : 'Modo Foco em Tela Cheia'}
          id="btn-toggle-focus"
        >
          {isFocusMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>

        {/* Install PWA */}
        <button
          className="icon-button"
          onClick={onOpenInstallGuide}
          title="Instalar no iPhone / Celular (PWA)"
          id="btn-install-pwa"
        >
          <Smartphone size={19} />
        </button>

        {/* Settings */}
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
