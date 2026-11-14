export interface BibleIllustration {
  id: string;
  bookAbbrev: string;
  bookName: string;
  chapter: number;
  title: string;
  subtitle: string;
  imagePath: string;
  artistNote: string;
}

export const BIBLE_ILLUSTRATIONS: BibleIllustration[] = [
  {
    id: 'genesis-1',
    bookAbbrev: 'gn',
    bookName: 'Gênesis',
    chapter: 1,
    title: 'A Criação do Mundo',
    subtitle: 'No princípio, criou Deus os céus e a terra.',
    imagePath: '/images/illustrations/genesis-1.jpg',
    artistNote: 'Pintura sacra barroca com iluminação celestial dividindo a escuridão primordial sobre as águas.',
  },
  {
    id: 'salmo-23',
    bookAbbrev: 'sl',
    bookName: 'Salmos',
    chapter: 23,
    title: 'O Bom Pastor e o Descanso da Alma',
    subtitle: 'O Senhor é o meu pastor; de nada terei falta.',
    imagePath: '/images/illustrations/salmo-23.jpg',
    artistNote: 'Cristo, o Bom Pastor, conduzindo o rebanho em pastagens verdejantes ao entardecer dourado junto a águas mansas.',
  },
  {
    id: 'salmo-91',
    bookAbbrev: 'sl',
    bookName: 'Salmos',
    chapter: 91,
    title: 'O Abrigo do Altíssimo',
    subtitle: 'Aquele que habita no abrigo do Altíssimo descansará à sombra do Todo-poderoso.',
    imagePath: '/images/illustrations/salmo-91.jpg',
    artistNote: 'O crente em profunda oração sob o refúgio das asas celestiais dos anjos e a luz divina protetora.',
  },
  {
    id: 'mateus-5',
    bookAbbrev: 'mt',
    bookName: 'Mateus',
    chapter: 5,
    title: 'O Sermão da Montanha',
    subtitle: 'Bem-aventurados os puros de coração, pois verão a Deus.',
    imagePath: '/images/illustrations/mateus-5.jpg',
    artistNote: 'Jesus ensinando as Bem-Aventuranças às multidões nas colinas da Galileia com vista para o Mar.',
  },
];

export function getIllustrationForChapter(
  bookAbbrev: string,
  chapter: number
): BibleIllustration | undefined {
  const norm = bookAbbrev.toLowerCase();
  return BIBLE_ILLUSTRATIONS.find(
    (item) => item.bookAbbrev === norm && item.chapter === chapter
  );
}
