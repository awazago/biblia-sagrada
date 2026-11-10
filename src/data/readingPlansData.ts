export interface ReadingPlanDay {
  day: number;
  title: string;
  bookAbbrev: string;
  bookName: string;
  chapter: number;
  passageLabel: string;
  reflectionFocus: string;
}

export interface ReadingPlan {
  id: string;
  title: string;
  subtitle: string;
  durationDays: number;
  badge: string;
  description: string;
  days: ReadingPlanDay[];
}

export const HOW_TO_READ_GUIDE = {
  title: 'Como Ler a Bíblia Corretamente (Método O.R.A.R.)',
  intro: 'A Bíblia não é um romance comum para ser lido com pressa. É uma biblioteca sagrada viva com 66 livros. O maior erro é começar em Gênesis e desistir nas leis de Levítico. Use o método O.R.A.R. para extrair vida e direção em cada leitura:',
  steps: [
    {
      letter: 'O',
      word: 'Observação',
      instruction: 'O que o texto diz textualmente? Quem escreveu, para quem foi dito e qual é o contexto do momento?'
    },
    {
      letter: 'R',
      word: 'Reflexão',
      instruction: 'O que essa passagem revela sobre o caráter imutável de Deus, Sua santidade, misericórdia e graça?'
    },
    {
      letter: 'A',
      word: 'Aplicação',
      instruction: 'Como este ensinamento confronta minhas atitudes, relacionamentos, trabalho e pensamentos hoje?'
    },
    {
      letter: 'R',
      word: 'Resposta em Oração',
      instruction: 'Converse com Deus transformando o versículo lido em uma oração sincera de louvor, confissão ou pedido.'
    }
  ],
  goldenTip: 'Dica de ouro: Comece pelos Evangelhos (especialmente João e Lucas) para conhecer Jesus Cristo, acompanhado dos Salmos para orar com a alma e Provérbios para sabedoria diária.'
};

export const READING_PLANS: ReadingPlan[] = [
  {
    id: 'iniciantes-30d',
    title: 'Iniciantes: Primeiros Passos',
    subtitle: 'Conhecendo a Pessoa de Jesus e a Sabedoria de Deus',
    durationDays: 30,
    badge: '🌱 Mais Recomendado',
    description: 'O melhor ponto de partida para quem nunca leu a Bíblia ou deseja recomeçar sem se sobrecarregar.',
    days: [
      { day: 1, title: 'No Princípio Era o Verbo', bookAbbrev: 'jo', bookName: 'João', chapter: 1, passageLabel: 'João 1', reflectionFocus: 'Jesus como a Luz que ilumina todo ser humano.' },
      { day: 2, title: 'O Primeiro Milagre', bookAbbrev: 'jo', bookName: 'João', chapter: 2, passageLabel: 'João 2', reflectionFocus: 'O poder transformador de Jesus nas Bodas de Caná.' },
      { day: 3, title: 'O Amor Incomparável de Deus', bookAbbrev: 'jo', bookName: 'João', chapter: 3, passageLabel: 'João 3', reflectionFocus: 'O novo nascimento e João 3:16.' },
      { day: 4, title: 'A Mulher Samaritana', bookAbbrev: 'jo', bookName: 'João', chapter: 4, passageLabel: 'João 4', reflectionFocus: 'A fonte de água viva que mata toda sede da alma.' },
      { day: 5, title: 'O Bom Pastor', bookAbbrev: 'sl', bookName: 'Salmos', chapter: 23, passageLabel: 'Salmo 23', reflectionFocus: 'A suficiência e o cuidado terno de Deus no vale escuro.' },
      { day: 6, title: 'O Pão da Vida', bookAbbrev: 'jo', bookName: 'João', chapter: 6, passageLabel: 'João 6', reflectionFocus: 'Apenas Cristo sacia a fome existencial humana.' },
      { day: 7, title: 'A Mulher Perdoada', bookAbbrev: 'jo', bookName: 'João', chapter: 8, passageLabel: 'João 8', reflectionFocus: 'A graça que não condena e ordena não pecar mais.' },
      { day: 8, title: 'A Cura do Cego de Nascença', bookAbbrev: 'jo', bookName: 'João', chapter: 9, passageLabel: 'João 9', reflectionFocus: 'Olhos espirituais abertos para a verdade.' },
      { day: 9, title: 'O Pastor e as Ovelhas', bookAbbrev: 'jo', bookName: 'João', chapter: 10, passageLabel: 'João 10', reflectionFocus: 'Ouvindo e reconhecendo a voz de Jesus.' },
      { day: 10, title: 'A Ressurreição de Lázaro', bookAbbrev: 'jo', bookName: 'João', chapter: 11, passageLabel: 'João 11', reflectionFocus: '\"Eu sou a ressurreição e a vida\".' },
      { day: 11, title: 'A Entrada Triunfal', bookAbbrev: 'jo', bookName: 'João', chapter: 12, passageLabel: 'João 12', reflectionFocus: 'O grão de trigo que morre para produzir fruto.' },
      { day: 12, title: 'Lava-pés: A Grandeza do Serviço', bookAbbrev: 'jo', bookName: 'João', chapter: 13, passageLabel: 'João 13', reflectionFocus: 'O amor manifesto em lavar os pés dos discípulos.' },
      { day: 13, title: 'O Caminho, a Verdade e a Vida', bookAbbrev: 'jo', bookName: 'João', chapter: 14, passageLabel: 'João 14', reflectionFocus: 'A promessa do Consolador e a paz de Cristo.' },
      { day: 14, title: 'A Videira Verdadeira', bookAbbrev: 'jo', bookName: 'João', chapter: 15, passageLabel: 'João 15', reflectionFocus: 'Permanecer ligado em Cristo para dar muito fruto.' },
      { day: 15, title: 'O Esconderijo Seguro', bookAbbrev: 'sl', bookName: 'Salmos', chapter: 91, passageLabel: 'Salmo 91', reflectionFocus: 'Habitar no abrigo do Altíssimo e descansar.' },
      { day: 16, title: 'A Obra do Espírito Santo', bookAbbrev: 'jo', bookName: 'João', chapter: 16, passageLabel: 'João 16', reflectionFocus: '\"No mundo tereis aflições, mas tende bom ânimo\".' },
      { day: 17, title: 'A Oração Sacerdotal', bookAbbrev: 'jo', bookName: 'João', chapter: 17, passageLabel: 'João 17', reflectionFocus: 'A oração de Jesus por você e pela união da Igreja.' },
      { day: 18, title: 'A Entrega Voluntária', bookAbbrev: 'jo', bookName: 'João', chapter: 18, passageLabel: 'João 18', reflectionFocus: 'Jesus diante de Pilatos com firme autoridade.' },
      { day: 19, title: 'Está Consumado!', bookAbbrev: 'jo', bookName: 'João', chapter: 19, passageLabel: 'João 19', reflectionFocus: 'O sacrifício supremo na cruz que quitou a dívida.' },
      { day: 20, title: 'O Túmulo Vazio', bookAbbrev: 'jo', bookName: 'João', chapter: 20, passageLabel: 'João 20', reflectionFocus: 'A ressurreição triunfal de Cristo e Maria Madalena.' },
      { day: 21, title: '\"Apascenta as Minhas Ovelhas\"', bookAbbrev: 'jo', bookName: 'João', chapter: 21, passageLabel: 'João 21', reflectionFocus: 'A restauração de Pedro à beira da praia.' },
      { day: 22, title: 'Princípios da Sabedoria', bookAbbrev: 'pv', bookName: 'Provérbios', chapter: 3, passageLabel: 'Provérbios 3', reflectionFocus: 'Confiar no Senhor de todo o coração sem depender do próprio entendimento.' },
      { day: 23, title: 'Guarda o Teu Coração', bookAbbrev: 'pv', bookName: 'Provérbios', chapter: 4, passageLabel: 'Provérbios 4', reflectionFocus: 'Sobre tudo o que se deve guardar, guarda a tua mente.' },
      { day: 24, title: 'As Bem-Aventuranças', bookAbbrev: 'mt', bookName: 'Mateus', chapter: 5, passageLabel: 'Mateus 5', reflectionFocus: 'O perfil dos cidadãos do Reino dos Céus.' },
      { day: 25, title: 'A Oração do Pai Nosso', bookAbbrev: 'mt', bookName: 'Mateus', chapter: 6, passageLabel: 'Mateus 6', reflectionFocus: 'A intimidade da oração e o alívio das ansiedades.' },
      { day: 26, title: 'A Casa Sobre a Rocha', bookAbbrev: 'mt', bookName: 'Mateus', chapter: 7, passageLabel: 'Mateus 7', reflectionFocus: 'Construir a vida na prática da Palavra de Jesus.' },
      { day: 27, title: 'O Meu Socorro', bookAbbrev: 'sl', bookName: 'Salmos', chapter: 121, passageLabel: 'Salmo 121', reflectionFocus: 'O Guarda fiel que não tosqueneja nem dorme.' },
      { day: 28, title: 'O Hino do Amor Ágape', bookAbbrev: '1co', bookName: '1 Coríntios', chapter: 13, passageLabel: '1 Coríntios 13', reflectionFocus: 'O amor paciente e bondoso que nunca falha.' },
      { day: 29, title: 'A Armadura de Deus', bookAbbrev: 'ef', bookName: 'Efésios', chapter: 6, passageLabel: 'Efésios 6', reflectionFocus: 'Fortalecer-se no Senhor e no poder da Sua força.' },
      { day: 30, title: 'A Paz que Excede Todo Entendimento', bookAbbrev: 'fp', bookName: 'Filipenses', chapter: 4, passageLabel: 'Filipenses 4', reflectionFocus: 'Tudo posso naquele que me fortalece.' }
    ]
  },
  {
    id: 'paz-interior-21d',
    title: 'Restaurando a Paz Interior',
    subtitle: 'Vencendo a Ansiedade, Aflição e Esgotamento Mental',
    durationDays: 21,
    badge: '🕊️ Emocional & Restaurador',
    description: 'Um refúgio diário para acalmar o coração aflito, recuperar o sono tranquilo e renovar a fé.',
    days: [
      { day: 1, title: 'O Pastor das Minhas Emoções', bookAbbrev: 'sl', bookName: 'Salmos', chapter: 23, passageLabel: 'Salmo 23', reflectionFocus: 'Deus restaura a alma cansada e guia para águas tranquilas.' },
      { day: 2, title: 'Aquietai-vos na Tempestade', bookAbbrev: 'sl', bookName: 'Salmos', chapter: 46, passageLabel: 'Salmo 46', reflectionFocus: 'Deus é refúgio bem presente mesmo se as montanhas tremerem.' },
      { day: 3, title: 'A Troca da Ansiedade pela Paz', bookAbbrev: 'fp', bookName: 'Filipenses', chapter: 4, passageLabel: 'Filipenses 4', reflectionFocus: 'Orar com gratidão para que a paz monte guarda no coração.' },
      { day: 4, title: 'Sob a Sombra do Onipotente', bookAbbrev: 'sl', bookName: 'Salmos', chapter: 91, passageLabel: 'Salmo 91', reflectionFocus: 'O escudo protetor que afasta o terror noturno.' },
      { day: 5, title: 'Olhai para as Aves do Céu', bookAbbrev: 'mt', bookName: 'Mateus', chapter: 6, passageLabel: 'Mateus 6:25-34', reflectionFocus: 'Buscai primeiro o Reino e todas as coisas serão acrescentadas.' },
      { day: 6, title: 'De Onde Vem o Meu Socorro?', bookAbbrev: 'sl', bookName: 'Salmos', chapter: 121, passageLabel: 'Salmo 121', reflectionFocus: 'O Criador do universo cuida da sua entrada e da sua saída.' },
      { day: 7, title: 'Perto do Coração Quebrantado', bookAbbrev: 'sl', bookName: 'Salmos', chapter: 34, passageLabel: 'Salmo 34', reflectionFocus: 'Muitas são as aflições do justo, mas de todas o Senhor o livra.' },
      { day: 8, title: 'Vinde a Mim os Cansados', bookAbbrev: 'mt', bookName: 'Mateus', chapter: 11, passageLabel: 'Mateus 11:28-30', reflectionFocus: 'O fardo suave e o descanso que Jesus oferece à alma.' },
      { day: 9, title: 'Tirado da Lama para a Rocha', bookAbbrev: 'sl', bookName: 'Salmos', chapter: 40, passageLabel: 'Salmo 40', reflectionFocus: 'Esperei com paciência no Senhor e Ele se inclinou para mim.' },
      { day: 10, title: 'Nenhuma Condenação Há', bookAbbrev: 'rm', bookName: 'Romanos', chapter: 8, passageLabel: 'Romanos 8:1-17', reflectionFocus: 'O Espírito de Deus testifica que você é filho amado.' },
      { day: 11, title: 'Mais que Vencedores', bookAbbrev: 'rm', bookName: 'Romanos', chapter: 8, passageLabel: 'Romanos 8:28-39', reflectionFocus: 'Nada poderá nos separar do amor de Deus que está em Cristo.' },
      { day: 12, title: 'A Tempestade Acalmada', bookAbbrev: 'mc', bookName: 'Marcos', chapter: 4, passageLabel: 'Marcos 4:35-41', reflectionFocus: '\"Silêncio! Acalme-se!\" — A voz de Jesus sobre o mar revolto.' },
      { day: 13, title: 'As Asas da Esperança', bookAbbrev: 'is', bookName: 'Isaías', chapter: 40, passageLabel: 'Isaías 40:27-31', reflectionFocus: 'Os que esperam no Senhor renovam as suas forças como águias.' },
      { day: 14, title: 'Planos de Paz e Futuro', bookAbbrev: 'jr', bookName: 'Jeremias', chapter: 29, passageLabel: 'Jeremias 29:11-14', reflectionFocus: 'Deus tem planos para o seu bem e para lhe dar um futuro de esperança.' },
      { day: 15, title: 'Lançando Toda a Ansiedade', bookAbbrev: '1pe', bookName: '1 Pedro', chapter: 5, passageLabel: '1 Pedro 5:6-11', reflectionFocus: 'Lancem sobre Ele todo o vosso cuidado, pois Ele cuida de vós.' },
      { day: 16, title: 'Tu Me Sondas e Me Conheces', bookAbbrev: 'sl', bookName: 'Salmos', chapter: 139, passageLabel: 'Salmo 139', reflectionFocus: 'Você foi tecido com amor e nunca está invisível aos olhos de Deus.' },
      { day: 17, title: 'Ainda que a Figueira Não Floresça', bookAbbrev: 'hc', bookName: 'Habacuque', chapter: 3, passageLabel: 'Habacuque 3:17-19', reflectionFocus: 'A alegria no Deus da salvação mesmo em tempos de crise.' },
      { day: 18, title: 'A Graça que me Basta', bookAbbrev: '2co', bookName: '2 Coríntios', chapter: 12, passageLabel: '2 Coríntios 12:8-10', reflectionFocus: 'O poder de Deus aperfeiçoado na nossa fraqueza.' },
      { day: 19, title: 'Cura para o Coração Ferido', bookAbbrev: 'sl', bookName: 'Salmos', chapter: 147, passageLabel: 'Salmo 147', reflectionFocus: 'Ele cura os quebrantados e estanca as suas feridas.' },
      { day: 20, title: 'A Paz que Jesus Deixa', bookAbbrev: 'jo', bookName: 'João', chapter: 14, passageLabel: 'João 14:23-27', reflectionFocus: '\"Deixo-lhes a paz; a minha paz lhes dou. Não se turbe o vosso coração\".' },
      { day: 21, title: 'Em Paz Me Deito e Logo Durmo', bookAbbrev: 'sl', bookName: 'Salmos', chapter: 4, passageLabel: 'Salmo 4', reflectionFocus: 'A segurança perpétua nos braços do Pai.' }
    ]
  },
  {
    id: 'historias-fe-40d',
    title: 'Grandes Histórias e Heróis da Fé',
    subtitle: 'Vivenciando as Maiores Lições de Coragem e Milagres',
    durationDays: 40,
    badge: '🏛️ Inspirador & Didático',
    description: 'Uma jornada dinâmica pelos momentos mais marcantes da Bíblia: da Criação aos Apóstolos.',
    days: [
      { day: 1, title: 'A Criação do Universo', bookAbbrev: 'gn', bookName: 'Gênesis', chapter: 1, passageLabel: 'Gênesis 1', reflectionFocus: 'A soberania de Deus que traz luz em meio ao caos.' },
      { day: 2, title: 'O Chamado de Abraão', bookAbbrev: 'gn', bookName: 'Gênesis', chapter: 12, passageLabel: 'Gênesis 12', reflectionFocus: 'A fé para sair do conforto e seguir a promessa.' },
      { day: 3, title: 'A Prova no Monte Moriá', bookAbbrev: 'gn', bookName: 'Gênesis', chapter: 22, passageLabel: 'Gênesis 22', reflectionFocus: 'Deus proverá: a fidelidade na entrega máxima.' },
      { day: 4, title: 'José: Do Poço ao Palácio', bookAbbrev: 'gn', bookName: 'Gênesis', chapter: 37, passageLabel: 'Gênesis 37', reflectionFocus: 'O sonho de Deus permanece vivo mesmo na traição.' },
      { day: 5, title: 'O Perdão Triunfante de José', bookAbbrev: 'gn', bookName: 'Gênesis', chapter: 50, passageLabel: 'Gênesis 50', reflectionFocus: '\"Vocês planejaram o mal, mas Deus o tornou em bem\".' },
      { day: 6, title: 'A Sarça Ardente', bookAbbrev: 'ex', bookName: 'Êxodo', chapter: 3, passageLabel: 'Êxodo 3', reflectionFocus: 'O encontro com o Deus \"EU SOU O QUE SOU\".' },
      { day: 7, title: 'A Abertura do Mar Vermelho', bookAbbrev: 'ex', bookName: 'Êxodo', chapter: 14, passageLabel: 'Êxodo 14', reflectionFocus: 'Fiquem firmes e vejam o livramento do Senhor!' },
      { day: 8, title: 'Os Dez Mandamentos', bookAbbrev: 'ex', bookName: 'Êxodo', chapter: 20, passageLabel: 'Êxodo 20', reflectionFocus: 'O alicerce moral e espiritual do povo da aliança.' },
      { day: 9, title: 'Sê Forte e Corajoso', bookAbbrev: 'js', bookName: 'Josué', chapter: 1, passageLabel: 'Josué 1', reflectionFocus: 'Meditar na Palavra dia e noite para prosperar.' },
      { day: 10, title: 'A Queda das Muralhas de Jericó', bookAbbrev: 'js', bookName: 'Josué', chapter: 6, passageLabel: 'Josué 6', reflectionFocus: 'A vitória conquistada pela obediência e louvor.' }
    ]
  }
];
