export interface EmotionalPsalmItem {
  number: number;
  title: string;
  keyVerse: string;
  themeDesc: string;
}

export interface EmotionalCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
  psalms: EmotionalPsalmItem[];
}

export const EMOTIONAL_CATEGORIES: EmotionalCategory[] = [
  {
    id: 'ansiedade',
    name: 'Ansiedade, Pânico & Insônia',
    emoji: '😰',
    description: 'Para acalmar a mente agitada, o medo do futuro e trazer sono reparador.',
    psalms: [
      {
        number: 23,
        title: 'O Bom Pastor',
        keyVerse: 'O Senhor é o meu pastor; de nada terei falta. Ele me faz repousar em pastagens verdejantes...',
        themeDesc: 'Descanso na providência e suficiência de Deus.'
      },
      {
        number: 46,
        title: 'Refúgio na Tempestade',
        keyVerse: 'Deus é o nosso refúgio e a nossa fortaleza, auxílio sempre presente na adversidade.',
        themeDesc: 'Aquietai-vos e sabei que Eu Sou Deus.'
      },
      {
        number: 94,
        title: 'Consolo no Íntimo',
        keyVerse: 'Quando a ansiedade já me dominava no íntimo, o teu consolo trouxe alívio à minha alma.',
        themeDesc: 'Alívio para pensamentos sufocantes.'
      },
      {
        number: 4,
        title: 'O Sono dos Justos',
        keyVerse: 'Em paz me deito e logo pego no sono, pois só tu, Senhor, me fazes viver em segurança.',
        themeDesc: 'Paz para vencer a insônia noturna.'
      }
    ]
  },
  {
    id: 'aflicao',
    name: 'Aflição, Dor & Luto',
    emoji: '🌧️',
    description: 'Quando o coração está em lágrimas, ferido pelas perdas ou sensação de abandono.',
    psalms: [
      {
        number: 34,
        title: 'Perto dos Quebrantados',
        keyVerse: 'O Senhor está perto dos que têm o coração quebrantado e salva os de espírito abatido.',
        themeDesc: 'A presença consoladora de Deus no sofrimento.'
      },
      {
        number: 40,
        title: 'Tirado do Poço de Lama',
        keyVerse: 'Colocou os meus pés sobre uma rocha e firmou os meus passos. Pôs um novo cântico na minha boca.',
        themeDesc: 'Paciência na espera pelo livramento.'
      },
      {
        number: 42,
        title: 'A Alma com Sede de Deus',
        keyVerse: 'Por que você está assim tão abatida, ó minha alma? Por que tão perturbada dentro de mim? Ponha a sua esperança em Deus!',
        themeDesc: 'Diálogo de fé consigo mesmo na tristeza.'
      },
      {
        number: 147,
        title: 'Cura das Feridas',
        keyVerse: 'Ele cura os que têm o coração quebrantado e cuida das suas feridas.',
        themeDesc: 'Restauração emocional profunda.'
      }
    ]
  },
  {
    id: 'protecao',
    name: 'Medo, Insegurança & Proteção',
    emoji: '🛡️',
    description: 'Para blindar sua casa, repelir perigos espirituais e firmar a autoridade da fé.',
    psalms: [
      {
        number: 91,
        title: 'O Abrigo do Altíssimo',
        keyVerse: 'Mil poderão cair ao seu lado e dez mil à sua direita, mas nada o atingirá. Aquele que habita no abrigo do Altíssimo descansará.',
        themeDesc: 'Imunidade espiritual e guarda angelical.'
      },
      {
        number: 121,
        title: 'O Guarda que Não Dorme',
        keyVerse: 'Elevo os olhos para os montes: de onde me virá o socorro? O meu socorro vem do Senhor, que fez os céus e a terra.',
        themeDesc: 'Proteção incessante na entrada e na saída.'
      },
      {
        number: 27,
        title: 'A Fortaleza da Minha Vida',
        keyVerse: 'O Senhor é a minha luz e a minha salvação; de quem terei medo? O Senhor é a fortaleza da minha vida.',
        themeDesc: 'Coragem inabalável diante de inimigos.'
      },
      {
        number: 3,
        title: 'Deus, Meu Escudo',
        keyVerse: 'Mas tu, Senhor, és para mim um escudo protetor, a minha glória e o que faz levantar a minha cabeça.',
        themeDesc: 'Sustento divino nas maiores perseguições.'
      }
    ]
  },
  {
    id: 'perdao',
    name: 'Culpa, Arrependimento & Perdão',
    emoji: '💔',
    description: 'Para lavar o passado, quebrar acusações da consciência e restaurar a comunhão.',
    psalms: [
      {
        number: 51,
        title: 'Cria em Mim um Coração Puro',
        keyVerse: 'Tem misericórdia de mim, ó Deus, por teu amor leal... Lava-me de toda a minha culpa e purifica-me do meu pecado.',
        themeDesc: 'Oração modelo de arrependimento sincero de Davi.'
      },
      {
        number: 32,
        title: 'A Felicidade da Culpa Apagada',
        keyVerse: 'Como é feliz aquele que tem suas transgressões perdoadas e seus pecados apagados!',
        themeDesc: 'O alívio indescritível da absolvição de Deus.'
      },
      {
        number: 130,
        title: 'Das Profundezas Clamo',
        keyVerse: 'Das profundezas clamo a ti, Senhor... Contigo, porém, está o perdão, para que sejas temido.',
        themeDesc: 'A graça que resgata do fundo do poço.'
      }
    ]
  },
  {
    id: 'direcao',
    name: 'Incerteza & Tomada de Decisão',
    emoji: '🧭',
    description: 'Quando você precisa de sabedoria nos negócios, família e discernimento espiritual.',
    psalms: [
      {
        number: 1,
        title: 'A Árvore Junto às Águas',
        keyVerse: 'Ele é como a árvore plantada junto a correntes de água, que dá fruto no tempo certo e cujas folhas não murcham.',
        themeDesc: 'A sabedoria do justo versus o caminho dos ímpios.'
      },
      {
        number: 25,
        title: 'Ensina-me as Tuas Veredas',
        keyVerse: 'Mostra-me os teus caminhos, Senhor; ensina-me as tuas veredas. Guia-me com a tua verdade.',
        themeDesc: 'Oração por discernimento humilde diante de Deus.'
      },
      {
        number: 119,
        title: 'Lâmpada para os Meus Pés',
        keyVerse: 'A tua palavra é lâmpada que ilumina os meus passos e luz que clareia o meu caminho.',
        themeDesc: 'A direção prática nas Sagradas Escrituras.'
      },
      {
        number: 37,
        title: 'Entrega o Teu Caminho',
        keyVerse: 'Entregue o seu caminho ao Senhor; confie nele, e ele agirá.',
        themeDesc: 'Descanso na soberana condução divina.'
      }
    ]
  },
  {
    id: 'gratidao',
    name: 'Gratidão, Louvor & Vitória',
    emoji: '🙌',
    description: 'Para bendizer ao Senhor pelas orações respondidas e celebrar as maravilhas divinas.',
    psalms: [
      {
        number: 100,
        title: 'Alegria de Toda a Terra',
        keyVerse: 'Entrem por suas portas com ações de graças e em seus átrios com louvor; dêem-lhe graças e bendigam o seu nome.',
        themeDesc: 'Celebração da fidelidade eterna do Senhor.'
      },
      {
        number: 103,
        title: 'Bendize, Ó Minha Alma',
        keyVerse: 'Bendiga o Senhor a minha alma! Não se esqueça de nenhuma de suas bênçãos! É ele que perdoa todos os seus pecados e cura todas as suas doenças.',
        themeDesc: 'Memória agradecida de todos os benefícios de Deus.'
      },
      {
        number: 150,
        title: 'O Grande Clímax do Louvor',
        keyVerse: 'Tudo o que tem fôlego louve o Senhor! Aleluia!',
        themeDesc: 'Louvor com júbilo, instrumentos e voz.'
      }
    ]
  }
];
