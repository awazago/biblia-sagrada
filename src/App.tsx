import { useState, useEffect } from 'react';
import type { BookMeta, BookDetail, ReadingSettings, Highlight, PersonalNote, GeneratedExplanation } from './types';
import { Header } from './components/Header';
import { BibleReader } from './components/BibleReader';
import { BookSelectorModal } from './components/BookSelectorModal';
import { ExplanationDrawer } from './components/ExplanationDrawer';
import { SearchModal } from './components/SearchModal';
import { SettingsModal } from './components/SettingsModal';
import { CardGeneratorModal } from './components/CardGeneratorModal';
import { IosInstallGuideModal } from './components/IosInstallGuideModal';
import { DailyDevotionalModal } from './components/DailyDevotionalModal';
import { BookmarksModal } from './components/BookmarksModal';
import { DonationModal } from './components/DonationModal';
import { EmotionalPsalmsModal } from './components/EmotionalPsalmsModal';
import { ReadingPlansModal } from './components/ReadingPlansModal';
import { SleepAudioModal } from './components/SleepAudioModal';
import { MilestoneCelebrationModal } from './components/MilestoneCelebrationModal';
import { ArtGalleryModal } from './components/ArtGalleryModal';
import { BottomNav, type NavTabType } from './components/BottomNav';
import { explainPassage } from './utils/explainer';
import { loadStreakData, recordDailyReading, type StreakData } from './utils/streak';
import { Analytics } from '@vercel/analytics/react';
import { Minimize2 } from 'lucide-react';

const STORAGE_KEY_SETTINGS = 'biblia_settings_v1';
const STORAGE_KEY_LAST_READ = 'biblia_last_read_v1';
const STORAGE_KEY_HIGHLIGHTS = 'biblia_highlights_v1';
const STORAGE_KEY_NOTES = 'biblia_notes_v1';

export function App() {
  const [books, setBooks] = useState<BookMeta[]>([]);
  const [currentBook, setCurrentBook] = useState<BookMeta | null>(null);
  const [currentChapter, setCurrentChapter] = useState<number>(23); // Default Salmo 23!
  const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);
  const [isLoadingBook, setIsLoadingBook] = useState<boolean>(true);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  // Settings
  const [settings, setSettings] = useState<ReadingSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      fontSize: 19,
      theme: 'dark',
      fontFamily: 'literata',
      lineSpacing: 'relaxed',
      redLetter: true,
    };
  });

  // Highlights and Notes
  const [highlights, setHighlights] = useState<Highlight[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HIGHLIGHTS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [notes, setNotes] = useState<PersonalNote[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTES);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Modals & Drawers state
  const [isBookSelectorOpen, setIsBookSelectorOpen] = useState(false);
  const [bookSelectorFilter, setBookSelectorFilter] = useState('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInstallGuideOpen, setIsInstallGuideOpen] = useState(false);
  const [isDevotionalOpen, setIsDevotionalOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [isEmotionalPsalmsOpen, setIsEmotionalPsalmsOpen] = useState(false);
  const [isReadingPlansOpen, setIsReadingPlansOpen] = useState(false);
  const [isSleepAudioOpen, setIsSleepAudioOpen] = useState(false);
  const [isArtGalleryOpen, setIsArtGalleryOpen] = useState(false);
  const [celebrationMilestone, setCelebrationMilestone] = useState<number | null>(null);
  const [streakData, setStreakData] = useState<StreakData>(() => loadStreakData());

  // Record daily devotional streak on mount and chapter reading
  useEffect(() => {
    const res = recordDailyReading();
    setStreakData(res.data);
    if (res.newMilestoneReached) {
      setCelebrationMilestone(res.newMilestoneReached);
    }
  }, [currentChapter, currentBook]);

  // Explanation Drawer
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);
  const [activeExplanation, setActiveExplanation] = useState<GeneratedExplanation | null>(null);

  // Card Generator
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [cardVerses, setCardVerses] = useState<{ number: number; text: string }[]>([]);
  const [cardRefLabel, setCardRefLabel] = useState('');

  // Active Bottom Tab
  const [activeTab, setActiveTab] = useState<NavTabType>('reading');

  // Apply theme to body
  useEffect(() => {
    document.body.setAttribute('data-theme', settings.theme);
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  }, [settings]);

  // Save highlights and notes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_HIGHLIGHTS, JSON.stringify(highlights));
  }, [highlights]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));
  }, [notes]);

  // Load books index
  useEffect(() => {
    fetch('/data/bible-index.json')
      .then((res) => res.json())
      .then((data: BookMeta[]) => {
        setBooks(data);

        // Check if user had a saved last read
        try {
          const savedLast = localStorage.getItem(STORAGE_KEY_LAST_READ);
          if (savedLast) {
            const parsed = JSON.parse(savedLast);
            const found = data.find((b) => b.abbrev === parsed.bookAbbrev);
            if (found) {
              setCurrentBook(found);
              setCurrentChapter(parsed.chapter || 1);
              return;
            }
          }
        } catch {}

        // Default to Salmos 23
        const salmos = data.find((b) => b.abbrev === 'sl') || data[0];
        setCurrentBook(salmos);
        setCurrentChapter(23);
      })
      .catch((err) => console.error('Erro ao carregar índice da Bíblia:', err));
  }, []);

  // Fetch book content whenever currentBook changes
  useEffect(() => {
    if (!currentBook) return;

    setIsLoadingBook(true);
    fetch(`/data/books/${currentBook.abbrev.toLowerCase()}.json`)
      .then((res) => res.json())
      .then((detail: BookDetail) => {
        setBookDetail(detail);
        setIsLoadingBook(false);
        // Persist last read
        localStorage.setItem(
          STORAGE_KEY_LAST_READ,
          JSON.stringify({ bookAbbrev: currentBook.abbrev, chapter: currentChapter })
        );
      })
      .catch((err) => {
        console.error('Erro ao carregar livro:', err);
        setIsLoadingBook(false);
      });
  }, [currentBook?.abbrev]);

  // Persist chapter changes
  useEffect(() => {
    if (currentBook) {
      localStorage.setItem(
        STORAGE_KEY_LAST_READ,
        JSON.stringify({ bookAbbrev: currentBook.abbrev, chapter: currentChapter })
      );
    }
  }, [currentChapter, currentBook]);

  // Handlers
  const handleSelectBookChapter = (book: BookMeta, chapter: number) => {
    setCurrentBook(book);
    setCurrentChapter(chapter);
    setActiveTab('reading');
  };

  const handlePreviousChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter((prev) => prev - 1);
    }
  };

  const handleNextChapter = () => {
    if (currentBook && currentChapter < currentBook.chaptersCount) {
      setCurrentChapter((prev) => prev + 1);
    }
  };

  // Explain passage
  const handleExplainVerses = async (verses: { number: number; text: string }[]) => {
    if (!currentBook || verses.length === 0) return;
    const explanation = await explainPassage(currentBook, currentChapter, verses);
    setActiveExplanation(explanation);
    setIsExplanationOpen(true);
  };

  // Highlights
  const handleHighlightVerses = (
    verseNumbers: number[],
    color: 'yellow' | 'green' | 'blue' | 'pink' | null
  ) => {
    if (!currentBook || !bookDetail) return;
    const chapters = bookDetail.chapters[currentChapter - 1] || [];

    setHighlights((prev) => {
      const filtered = prev.filter(
        (h) =>
          !(
            h.bookAbbrev === currentBook.abbrev &&
            h.chapter === currentChapter &&
            verseNumbers.includes(h.verseNumber)
          )
      );

      if (!color) return filtered;

      const newItems: Highlight[] = verseNumbers.map((num) => ({
        id: `${currentBook.abbrev}-${currentChapter}-${num}-${Date.now()}`,
        bookAbbrev: currentBook.abbrev,
        bookName: currentBook.name,
        chapter: currentChapter,
        verseIndex: num - 1,
        verseNumber: num,
        text: chapters[num - 1] || '',
        color,
        timestamp: Date.now(),
      }));

      return [...filtered, ...newItems];
    });
  };

  // Bookmark verse
  const handleBookmarkVerse = (verseNumber: number) => {
    if (!currentBook) return;
    handleHighlightVerses([verseNumber], 'yellow');
    alert(`Versículo ${currentBook.name} ${currentChapter}:${verseNumber} adicionado aos seus favoritos!`);
  };

  // Create card
  const handleCreateCard = (verses: { number: number; text: string }[]) => {
    if (!currentBook || verses.length === 0) return;
    const range =
      verses.length === 1
        ? `${currentChapter}:${verses[0].number}`
        : `${currentChapter}:${verses[0].number}-${verses[verses.length - 1].number}`;
    setCardRefLabel(`${currentBook.name} ${range}`);
    setCardVerses(verses);
    setIsCardModalOpen(true);
  };

  // Save personal note from explanation drawer
  const handleSaveNote = (noteText: string) => {
    if (!currentBook || !noteText.trim()) return;
    const newNote: PersonalNote = {
      id: `${currentBook.abbrev}-${currentChapter}-${Date.now()}`,
      bookAbbrev: currentBook.abbrev,
      bookName: currentBook.name,
      chapter: currentChapter,
      verseNumber: 1,
      note: noteText,
      timestamp: Date.now(),
    };
    setNotes((prev) => [newNote, ...prev.filter((n) => n.id !== newNote.id)]);
  };

  // Open Psalm from Emotional directory
  const handleSelectPsalm = (psalmNumber: number) => {
    const salmosBook = books.find((b) => b.abbrev === 'sl') || currentBook;
    if (salmosBook) {
      handleSelectBookChapter(salmosBook, psalmNumber);
    }
  };

  // Open passage from Reading Plans
  const handleOpenPlanPassage = (bookAbbrev: string, chapter: number) => {
    const book = books.find((b) => b.abbrev === bookAbbrev);
    if (book) {
      handleSelectBookChapter(book, chapter);
    }
  };

  // Bottom Nav switcher
  const handleBottomTabSelect = (tab: NavTabType) => {
    setActiveTab(tab);
    if (tab === 'salmos') {
      setIsEmotionalPsalmsOpen(true);
    } else if (tab === 'plans') {
      setIsReadingPlansOpen(true);
    } else if (tab === 'search') {
      setIsSearchOpen(true);
    } else if (tab === 'bookmarks') {
      setIsBookmarksOpen(true);
    } else if (tab === 'settings') {
      setIsSettingsOpen(true);
    }
  };

  const salmosBook = books.find((b) => b.abbrev === 'sl') || null;

  return (
    <div className={`app-container ${isFocusMode ? 'focus-mode' : ''}`}>
      {/* Top Header */}
      {!isFocusMode && (
        <Header
          currentBook={currentBook}
          currentChapter={currentChapter}
          onOpenBookSelector={() => {
            setBookSelectorFilter('all');
            setIsBookSelectorOpen(true);
          }}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenInstallGuide={() => setIsInstallGuideOpen(true)}
          onOpenDailyDevotional={() => setIsDevotionalOpen(true)}
          onOpenDonation={() => setIsDonationOpen(true)}
          onOpenReadingPlans={() => setIsReadingPlansOpen(true)}
          currentStreak={streakData.currentStreak}
          onOpenSleepAudio={() => setIsSleepAudioOpen(true)}
          onOpenStreakInfo={() => setCelebrationMilestone(streakData.currentStreak)}
          onOpenArtGallery={() => setIsArtGalleryOpen(true)}
          isFocusMode={isFocusMode}
          onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
        />
      )}

      {/* Bible Reader */}
      <BibleReader
        book={currentBook}
        bookDetail={bookDetail}
        chapter={currentChapter}
        settings={settings}
        highlights={highlights}
        onPreviousChapter={handlePreviousChapter}
        onNextChapter={handleNextChapter}
        onExplainVerses={handleExplainVerses}
        onHighlightVerses={handleHighlightVerses}
        onBookmarkVerse={handleBookmarkVerse}
        onCreateCard={handleCreateCard}
        isLoading={isLoadingBook}
      />

      {/* Floating Exit Button in Focus Mode */}
      {isFocusMode && (
        <button
          className="exit-focus-btn"
          onClick={() => setIsFocusMode(false)}
          title="Sair do Modo Foco"
        >
          <Minimize2 size={16} />
          <span>Sair do Modo Foco</span>
        </button>
      )}

      {/* Bottom Navigation (iOS Style) */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={handleBottomTabSelect}
        isFocusMode={isFocusMode}
      />

      {/* Book & Chapter Selector Modal */}
      <BookSelectorModal
        isOpen={isBookSelectorOpen}
        onClose={() => {
          setIsBookSelectorOpen(false);
          setActiveTab('reading');
        }}
        books={books}
        currentBook={currentBook}
        currentChapter={currentChapter}
        onSelect={handleSelectBookChapter}
        defaultFilter={bookSelectorFilter}
      />

      {/* Emotional Psalms Directory Modal */}
      <EmotionalPsalmsModal
        isOpen={isEmotionalPsalmsOpen}
        onClose={() => {
          setIsEmotionalPsalmsOpen(false);
          setActiveTab('reading');
        }}
        onSelectPsalm={handleSelectPsalm}
        salmosBook={salmosBook}
      />

      {/* Reading Plans & O.R.A.R. Guide Modal */}
      <ReadingPlansModal
        isOpen={isReadingPlansOpen}
        onClose={() => {
          setIsReadingPlansOpen(false);
          setActiveTab('reading');
        }}
        books={books}
        onOpenDayPassage={handleOpenPlanPassage}
      />

      {/* Explanation Drawer / Sheet */}
      <ExplanationDrawer
        isOpen={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        explanation={activeExplanation}
        onSaveNote={handleSaveNote}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => {
          setIsSearchOpen(false);
          setActiveTab('reading');
        }}
        books={books}
        onSelectResult={(book, chapter) => {
          handleSelectBookChapter(book, chapter);
        }}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => {
          setIsSettingsOpen(false);
          setActiveTab('reading');
        }}
        settings={settings}
        onUpdateSettings={(newVals) => setSettings((prev) => ({ ...prev, ...newVals }))}
        onOpenInstallGuide={() => setIsInstallGuideOpen(true)}
        onOpenDonation={() => setIsDonationOpen(true)}
        onOpenReadingPlans={() => setIsReadingPlansOpen(true)}
      />

      {/* Donation Modal */}
      <DonationModal
        isOpen={isDonationOpen}
        onClose={() => setIsDonationOpen(false)}
      />

      {/* Card Generator Modal */}
      <CardGeneratorModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        referenceLabel={cardRefLabel}
        verses={cardVerses}
      />

      {/* iPhone PWA Installation Guide Modal */}
      <IosInstallGuideModal
        isOpen={isInstallGuideOpen}
        onClose={() => setIsInstallGuideOpen(false)}
      />

      {/* Daily Devotional & Verse Modal */}
      <DailyDevotionalModal
        isOpen={isDevotionalOpen}
        onClose={() => setIsDevotionalOpen(false)}
        books={books}
        onReadInBible={(bookAbbrev, chapter) => {
          const b = books.find((x) => x.abbrev === bookAbbrev);
          if (b) handleSelectBookChapter(b, chapter);
        }}
      />

      {/* Bookmarks & Study Notes Modal */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => {
          setIsBookmarksOpen(false);
          setActiveTab('reading');
        }}
        highlights={highlights}
        notes={notes}
        books={books}
        onNavigateTo={(abbrev, chapter) => {
          const b = books.find((x) => x.abbrev === abbrev);
          if (b) handleSelectBookChapter(b, chapter);
        }}
        onDeleteHighlight={(id) =>
          setHighlights((prev) => prev.filter((h) => h.id !== id))
        }
        onDeleteNote={(id) =>
          setNotes((prev) => prev.filter((n) => n.id !== id))
        }
      />

      {/* Sleep Audio Modal */}
      <SleepAudioModal
        isOpen={isSleepAudioOpen}
        onClose={() => setIsSleepAudioOpen(false)}
      />

      {/* Habit Streak Milestone Celebration & Voluntary Donation Modal */}
      <MilestoneCelebrationModal
        isOpen={celebrationMilestone !== null}
        onClose={() => setCelebrationMilestone(null)}
        milestoneDays={celebrationMilestone || streakData.currentStreak}
      />

      {/* Illustrated Bible Sacred Art Gallery Modal */}
      <ArtGalleryModal
        isOpen={isArtGalleryOpen}
        onClose={() => setIsArtGalleryOpen(false)}
        onNavigateToChapter={(bookAbbrev, chap) => {
          const b = books.find((x) => x.abbrev === bookAbbrev);
          if (b) handleSelectBookChapter(b, chap);
        }}
      />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
