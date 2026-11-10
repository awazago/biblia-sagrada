import React from 'react';
import { BookOpen, Search, Bookmark, Settings, Feather } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'reading' | 'salmos' | 'search' | 'bookmarks' | 'settings';
  onSelectTab: (tab: 'reading' | 'salmos' | 'search' | 'bookmarks' | 'settings') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="bottom-nav" aria-label="Navegação inferior">
      <button
        className={`nav-item ${activeTab === 'reading' ? 'active' : ''}`}
        onClick={() => onSelectTab('reading')}
        id="nav-tab-reading"
      >
        <BookOpen size={20} />
        <span>Leitura</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'salmos' ? 'active' : ''}`}
        onClick={() => onSelectTab('salmos')}
        id="nav-tab-salmos"
        style={activeTab === 'salmos' ? { color: 'var(--accent-gold)' } : undefined}
      >
        <Feather size={20} />
        <span>Salmos</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
        onClick={() => onSelectTab('search')}
        id="nav-tab-search"
      >
        <Search size={20} />
        <span>Buscar</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'bookmarks' ? 'active' : ''}`}
        onClick={() => onSelectTab('bookmarks')}
        id="nav-tab-bookmarks"
      >
        <Bookmark size={20} />
        <span>Marcadores</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
        onClick={() => onSelectTab('settings')}
        id="nav-tab-settings"
      >
        <Settings size={20} />
        <span>Ajustes</span>
      </button>
    </nav>
  );
};
