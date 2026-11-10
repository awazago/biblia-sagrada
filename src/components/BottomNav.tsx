import React from 'react';
import { BookOpen, Search, Bookmark, Settings, Feather, Calendar } from 'lucide-react';

export type NavTabType = 'reading' | 'salmos' | 'plans' | 'search' | 'bookmarks' | 'settings';

interface BottomNavProps {
  activeTab: NavTabType;
  onSelectTab: (tab: NavTabType) => void;
  isFocusMode?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab, isFocusMode }) => {
  if (isFocusMode) return null;

  return (
    <nav className="bottom-nav" aria-label="Navegação inferior">
      <button
        className={`nav-item ${activeTab === 'reading' ? 'active' : ''}`}
        onClick={() => onSelectTab('reading')}
        id="nav-tab-reading"
      >
        <BookOpen size={19} />
        <span>Leitura</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'salmos' ? 'active' : ''}`}
        onClick={() => onSelectTab('salmos')}
        id="nav-tab-salmos"
        style={activeTab === 'salmos' ? { color: 'var(--accent-gold)' } : undefined}
      >
        <Feather size={19} />
        <span>Salmos</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'plans' ? 'active' : ''}`}
        onClick={() => onSelectTab('plans')}
        id="nav-tab-plans"
        style={activeTab === 'plans' ? { color: 'var(--accent-gold)' } : undefined}
      >
        <Calendar size={19} />
        <span>Planos</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
        onClick={() => onSelectTab('search')}
        id="nav-tab-search"
      >
        <Search size={19} />
        <span>Buscar</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'bookmarks' ? 'active' : ''}`}
        onClick={() => onSelectTab('bookmarks')}
        id="nav-tab-bookmarks"
      >
        <Bookmark size={19} />
        <span>Notas</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
        onClick={() => onSelectTab('settings')}
        id="nav-tab-settings"
      >
        <Settings size={19} />
        <span>Ajustes</span>
      </button>
    </nav>
  );
};
