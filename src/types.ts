export interface BookMeta {
  id: number;
  abbrev: string;
  name: string;
  testament: 'Antigo Testamento' | 'Novo Testamento' | string;
  category: string;
  author: string;
  summary: string;
  chaptersCount: number;
  versesCount: number;
}

export interface BookDetail extends BookMeta {
  chapters: string[][];
}

export interface OriginalKeyword {
  term: string;
  language: 'Hebraico' | 'Grego' | 'Aramaico';
  meaning: string;
}

export interface CrossReference {
  ref: string;
  text: string;
}

export interface CuratedCommentary {
  bookAbbrev: string;
  chapter: number;
  title: string;
  author: string;
  historicalContext: string;
  keyThemes: string[];
  originalKeywords: OriginalKeyword[];
  verseNotes: Record<string, string>;
  practicalApplication: string;
  prayer: string;
  crossReferences: CrossReference[];
}

export interface GeneratedExplanation {
  title: string;
  referenceLabel: string;
  selectedText: string;
  historicalContext: string;
  theologicalMeaning: string;
  originalKeywords: OriginalKeyword[];
  practicalApplication: string;
  prayer: string;
  crossReferences: CrossReference[];
  reflectionQuestions: string[];
}

export interface Highlight {
  id: string;
  bookAbbrev: string;
  bookName: string;
  chapter: number;
  verseIndex: number;
  verseNumber: number;
  text: string;
  color: 'yellow' | 'green' | 'blue' | 'pink';
  timestamp: number;
}

export interface PersonalNote {
  id: string;
  bookAbbrev: string;
  bookName: string;
  chapter: number;
  verseNumber: number;
  note: string;
  timestamp: number;
}

export type ThemeMode = 'light' | 'sepia' | 'dark' | 'oled';

export interface ReadingSettings {
  fontSize: number; // in px: 16 to 28
  theme: ThemeMode;
  fontFamily: 'literata' | 'serif' | 'sans';
  lineSpacing: 'comfortable' | 'relaxed' | 'spacious';
  redLetter: boolean; // Jesus words highlighted
}
