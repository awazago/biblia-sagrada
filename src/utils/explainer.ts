import type { BookMeta, CuratedCommentary, GeneratedExplanation, OriginalKeyword, CrossReference } from '../types';

let cachedCuratedCommentaries: Record<string, CuratedCommentary> | null = null;

export async function loadCuratedCommentaries(): Promise<Record<string, CuratedCommentary>> {
  if (cachedCuratedCommentaries) return cachedCuratedCommentaries;
  try {
    const res = await fetch('/data/curated-commentaries.json');
    if (res.ok) {
      cachedCuratedCommentaries = await res.json();
      return cachedCuratedCommentaries || {};
    }
  } catch (err) {
    console.warn('Erro ao carregar comentários curados:', err);
  }
  return {};
}

// Known cross references map for key books & themes
const THEMATIC_CROSS_REFS: Record<string, CrossReference[]> = {
  paz: [
    { ref: 'Filipenses 4:7', text: 'E a paz de Deus, que excede todo o entendimento, guardará os vossos corações.' },
    { ref: 'João 14:27', text: 'Deixo-lhes a paz; a minha paz lhes dou. Não lhes dou a paz como o mundo a dá.' },
    { ref: 'Salmos 29:11', text: 'O Senhor dá força ao seu povo; o Senhor abençoa com paz ao seu povo.' }
  ],
  fe: [
    { ref: 'Hebreus 11:1', text: 'Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.' },
    { ref: 'Romanos 10:17', text: 'Consequentemente, a fé vem por ouvir a mensagem, e a mensagem é ouvida mediante a palavra de Cristo.' },
    { ref: '2 Coríntios 5:7', text: 'Porque vivemos por fé, e não pelo que vemos.' }
  ],
  amor: [
    { ref: '1 Coríntios 13:13', text: 'Assim, permanecem agora estes três: a fé, a esperança e o amor. O maior deles, porém, é o amor.' },
    { ref: '1 João 4:19', text: 'Nós amamos porque ele nos amou primeiro.' },
    { ref: 'João 3:16', text: 'Porque Deus tanto amou o mundo que deu o seu Filho Unigênito.' }
  ],
  protecao: [
    { ref: 'Salmos 91:1-2', text: 'Aquele que habita no abrigo do Altíssimo descansará à sombra do Todo-poderoso.' },
    { ref: 'Provérbios 18:10', text: 'Torre forte é o nome do Senhor; para ela corre o justo e está seguro.' },
    { ref: 'Salmos 121:7', text: 'O Senhor o protegerá de todo o mal, protegerá a sua vida.' }
  ],
  perdao: [
    { ref: '1 João 1:9', text: 'Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar e nos purificar de toda injustiça.' },
    { ref: 'Efésios 4:32', text: 'Sejam bondosos e compassivos uns para com os outros, perdoando-se mutuamente, assim como Deus os perdoou em Cristo.' },
    { ref: 'Miqueias 7:18-19', text: 'Quem é comparável a ti, ó Deus, que perdoas o pecado e esqueces a transgressão?' }
  ],
  esperanca: [
    { ref: 'Jeremias 29:11', text: 'Porque sou eu que conheço os planos que tenho para vocês, planos de fazê-los prosperar e de dar-lhes esperança e um futuro.' },
    { ref: 'Romanos 15:13', text: 'Que o Deus da esperança os encha de toda alegria e paz, por sua confiança nele.' },
    { ref: 'Isaías 40:31', text: 'Mas aqueles que esperam no Senhor renovam as suas forças. Voam alto como águias.' }
  ]
};

export async function explainPassage(
  book: BookMeta,
  chapter: number,
  selectedVerses: { number: number; text: string }[]
): Promise<GeneratedExplanation> {
  const curated = await loadCuratedCommentaries();
  const key = `${book.abbrev.toLowerCase()}-${chapter}`;
  const curatedEntry = curated[key];

  const firstVerseNum = selectedVerses[0]?.number || 1;
  const lastVerseNum = selectedVerses[selectedVerses.length - 1]?.number || firstVerseNum;
  const verseRangeLabel = firstVerseNum === lastVerseNum 
    ? `${book.name} ${chapter}:${firstVerseNum}`
    : `${book.name} ${chapter}:${firstVerseNum}-${lastVerseNum}`;

  const joinedText = selectedVerses.map(v => `${v.number}. ${v.text}`).join(' ');

  // 1. If we have a curated entry for this chapter
  if (curatedEntry) {
    const matchingNotes: string[] = [];
    selectedVerses.forEach(v => {
      const singleNote = curatedEntry.verseNotes[String(v.number)];
      if (singleNote) matchingNotes.push(`• V. ${v.number}: ${singleNote}`);
    });

    Object.keys(curatedEntry.verseNotes).forEach(k => {
      if (k.includes('-')) {
        const [start, end] = k.split('-').map(Number);
        if (selectedVerses.some(v => v.number >= start && v.number <= end)) {
          matchingNotes.push(`• V. ${k}: ${curatedEntry.verseNotes[k]}`);
        }
      }
    });

    const specificTheology = matchingNotes.length > 0
      ? matchingNotes.join('\n\n')
      : `Este trecho situa-se no coração do capítulo cujo tema é "${curatedEntry.title}". Os versículos destacam como a fidelidade de Deus atua de forma tangível na caminhada humana.`;

    return {
      title: curatedEntry.title,
      referenceLabel: verseRangeLabel,
      selectedText: joinedText,
      historicalContext: curatedEntry.historicalContext,
      theologicalMeaning: specificTheology,
      originalKeywords: curatedEntry.originalKeywords,
      practicalApplication: curatedEntry.practicalApplication,
      prayer: curatedEntry.prayer,
      crossReferences: curatedEntry.crossReferences,
      reflectionQuestions: [
        'Como a verdade deste trecho confronta ou fortalece suas decisões atuais?',
        'Existe alguma área da sua vida onde você precisa exercer a confiança expressa neste versículo?',
        'De que maneira prática você pode compartilhar esse ensinamento com alguém próximo hoje?'
      ]
    };
  }

  // 2. Intelligent Exegetical Engine for any other chapter/passage across all 66 books
  const isOldTestament = book.testament.includes('Antigo');
  const lowerText = joinedText.toLowerCase();

  let themeTopic = 'fe';
  if (lowerText.includes('paz') || lowerText.includes('descanso') || lowerText.includes('tranquilo')) {
    themeTopic = 'paz';
  } else if (lowerText.includes('amor') || lowerText.includes('bondade') || lowerText.includes('misericórdia')) {
    themeTopic = 'amor';
  } else if (lowerText.includes('proteg') || lowerText.includes('refúgio') || lowerText.includes('guarda') || lowerText.includes('socorro')) {
    themeTopic = 'protecao';
  } else if (lowerText.includes('perd') || lowerText.includes('graça') || lowerText.includes('culpa') || lowerText.includes('pecado')) {
    themeTopic = 'perdao';
  } else if (lowerText.includes('espera') || lowerText.includes('futuro') || lowerText.includes('promessa') || lowerText.includes('vitória')) {
    themeTopic = 'esperanca';
  }

  const originalKeywords: OriginalKeyword[] = isOldTestament
    ? [
        { term: 'Hesed (חֶסֶד)', language: 'Hebraico', meaning: 'Amor pactual incondicional, lealdade e fidelidade inquebrável de Deus.' },
        { term: 'Shalom (שָׁלוֹם)', language: 'Hebraico', meaning: 'Plenitude de vida, paz integral, integridade da alma e bem-estar divino.' },
        { term: 'Emunah (אֱמוּנָה)', language: 'Hebraico', meaning: 'Fidelidade, firmeza inabalável, confiança provada em Deus.' }
      ]
    : [
        { term: 'Agape (ἀγάπη)', language: 'Grego', meaning: 'O amor supremo, desinteressado e sacrificial manifestado em Cristo.' },
        { term: 'Charis (χάris)', language: 'Grego', meaning: 'Graça divina concedida de graça, favor imerecido e poder transformador.' },
        { term: 'Zoe (ζωή)', language: 'Grego', meaning: 'A vida divina essencial, eterna e indestrutível que brota de Deus.' }
      ];

  const historicalContext = `O livro de ${book.name} pertence à categoria de ${book.category} do ${book.testament}. Escrito sob a inspiração de ${book.author}, este escrito tinha como objetivo central revelar: ${book.summary}. No contexto histórico da época, os leitores enfrentavam desafios reais de fé, sobrevivência e aliança espiritual, e estas palavras serviram de guia soberano para manter a santidade e a comunhão com o Todo-Poderoso.`;

  const theologicalMeaning = `Ao ler atentamente ${verseRangeLabel}, percebe-se a ênfase na soberania, santidade e fidelidade divina. O texto evidencia que a Palavra de Deus não é meramente uma crônica do passado, mas uma instrução viva e eficaz que penetra até o íntimo do ser humano. O autor bíblico direciona o leitor a olhar além das circunstâncias temporais passageiras e firmar sua esperança no caráter imutável do Senhor.`;

  const practicalApplication = `Para aplicar ${verseRangeLabel} na sua vida prática:\n1. Medite neste versículo durante seus momentos de decisão hoje.\n2. Não permita que o medo ou as pressões do dia a dia silenciem a promessa de Deus contida nesta passagem.\n3. Pratique a confiança ativa: fale a verdade da Palavra sobre seus pensamentos e relacionamentos.`;

  const prayer = `Pai Celestial, Deus Todo-Poderoso e compassivo, Te agradeço por Tua Palavra revelada em ${verseRangeLabel}. Reconheço que a Tua verdade é lâmpada para os meus pés e luz para o meu caminho. Peço que o Espírito Santo grave este ensinamento profundamente em meu coração, gerando sabedoria, paz e obediência. Em nome de Jesus Cristo, Amém.`;

  const crossReferences = THEMATIC_CROSS_REFS[themeTopic] || [
    { ref: 'Salmos 119:105', text: 'A tua palavra é lâmpada que ilumina os meus passos e luz que clareia o meu caminho.' },
    { ref: '2 Timóteo 3:16-17', text: 'Toda a Escritura é divinamente inspirada e proveitosa para ensinar, redarguir e instruir em justiça.' },
    { ref: 'Hebreus 4:12', text: 'Pois a palavra de Deus é viva e eficaz, e mais afiada que qualquer espada de dois gumes.' }
  ];

  return {
    title: `${book.name}: Mensagem do Capítulo ${chapter}`,
    referenceLabel: verseRangeLabel,
    selectedText: joinedText,
    historicalContext,
    theologicalMeaning,
    originalKeywords,
    practicalApplication,
    prayer,
    crossReferences,
    reflectionQuestions: [
      `Qual mensagem central de ${verseRangeLabel} mais toca seu coração hoje?`,
      'Que atitude concreta você precisa tomar em resposta a esta palavra divina?',
      'Como a revelação deste texto pode trazer paz a uma área que tem causado preocupação na sua vida?'
    ]
  };
}
