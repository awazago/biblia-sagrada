# 📖 Bíblia Sagrada — Estudo, Versículos & Explicações (PWA)

Aplicativo web progressivo (**PWA**) moderno, elegante e de alta legibilidade da **Bíblia Sagrada Completa em Português (NVI)**, otimizado especialmente para **iPhone (iOS)**, **Android** e **Computadores**.

Permite navegar facilmente por todos os 66 livros, com acesso direto aos **150 Salmos**, e conta com um **Mecanismo Teológico de Explicação**: selecione qualquer versículo ou trecho para abrir instantaneamente uma análise com contexto histórico, significado teológico, termos no idioma original (Hebraico/Grego), aplicação prática para os dias de hoje e oração inspirada.

---

## ✨ Principais Funcionalidades

1. **📱 Experiência de App Nativo no iPhone (PWA)**:
   - Configurado com `manifest.webmanifest`, ícones de alta resolução Apple Touch (180x180, 192x192, 512x512) e suporte a tela cheia no iOS (sem barra de URL).
   - Suporte a Safe Areas para o recorte do iPhone (Notch e Dynamic Island).
   - Funciona **offline** através de Service Worker com cache inteligente.
   - Guia visual integrado com instruções de instalação no iPhone via Safari.

2. **🕊️ Localização Fácil de Livros, Versículos e Salmos**:
   - **Atalho exclusivo para os Salmos**: Botão direto na barra inferior para navegar entre os 150 Salmos.
   - **Filtros rápidos**: Todos (66), Salmos (150), Antigo Testamento (39), Novo Testamento (27), Evangelhos e Cartas.
   - **Busca inteligente**: Pesquise por nome, referência direta (ex: `Sl 23`, `Jo 3:16`, `Rm 8:28`) ou temas (`paz`, `esperança`, `amor`, `cura`, `perdão`).

3. **💡 Explicação Profunda de Qualquer Trecho Selecionado**:
   - Ao tocar em um ou mais versículos, uma barra de ações surge permitindo clicar em **"Explicar Trecho"**.
   - O painel lateral/inferior de estudo apresenta:
     - 🏛️ **Contexto Histórico & Cultural**: Quem escreveu, época e destinatários.
     - 📖 **Significado Teológico & Exegese**: O sentido espiritual dos versículos.
     - ✨ **Palavras no Original**: Termos em hebraico ou grego com pronúncia e significado rico (*Yahweh Rohi*, *Hesed*, *Agape*, *Shalom*...).
     - 🌱 **Aplicação Prática**: Como aplicar a mensagem na rotina e nas decisões atuais.
     - 🕊️ **Oração Inspirada**: Prece pronta para meditação sincera.
     - 🔗 **Versículos Relacionados (Referências Cruzadas)**.
     - ✍️ **Minhas Anotações**: Campo para registrar reflexões e revelações salvas localmente no aparelho.

4. **🎨 4 Temas de Leitura Personalizados**:
   - ☀️ **Clássico Claro**: Tom papel bíblico suave e confortável.
   - 📜 **Pergaminho Sépia**: Dourado aconchegante para leitura prolongada.
   - 🌙 **Noite Escura**: Fundo grafite elegante com baixo cansaço visual.
   - 🖤 **Preto OLED**: Desenvolvido sob medida para telas OLED / Super Retina do iPhone (economia máxima de bateria e contraste puro).
   - Ajuste de tamanho de fonte (16px a 28px), famílias tipográficas e espaçamento de linha.

5. **🔊 Áudio-Leitura & Multimídia**:
   - Leitura por voz em português natural dos versículos selecionados ou do capítulo.
   - Marcador de texto em 4 cores (Amarelo, Verde, Azul, Rosa).
   - **Gerador de Cards para Redes Sociais**: Cria imagens de alta definição com os versículos e bordas douradas prontas para compartilhar no WhatsApp e Instagram Stories.
   - **Versículo do Dia**: Reflexão e oração diária logo ao abrir o aplicativo.

---

## 🚀 Como Publicar na Nuvem (Gratuito e em Menos de 3 Minutos)

O projeto gera arquivos estáticos puros na pasta `dist/` com zero necessidade de servidor de banco de dados.

### Opção 1: Vercel (Recomendado)
1. Crie uma conta gratuita em [vercel.com](https://vercel.com).
2. Conecte seu repositório GitHub onde você enviou este projeto.
3. A Vercel detectará automaticamente o Vite. Basta clicar em **Deploy**.
4. Ou usando o terminal:
   ```bash
   npx vercel
   ```
*(O arquivo `vercel.json` com todas as rotas configuradas já está incluído no projeto).*

---

### Opção 2: Netlify
1. Crie uma conta gratuita em [netlify.com](https://netlify.com).
2. Execute localmente:
   ```bash
   npm run build
   ```
3. No painel da Netlify, arraste a pasta `dist` gerada para o campo de deploy.
4. Seu app estará online imediatamente com certificado HTTPS e suporte a PWA!
*(O arquivo `netlify.toml` já está configurado).*

---

### Opção 3: Cloudflare Pages
1. Acesse o painel da Cloudflare e vá em **Workers & Pages > Pages**.
2. Conecte o repositório GitHub.
3. Nas configurações de build:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Clique em **Save and Deploy**.

---

## 📲 Como Instalar no iPhone (iOS Safari)

1. Abra o link da aplicação publicada no **Safari** do seu iPhone.
2. Toque no botão de **Compartilhar** (ícone com quadrado e seta para cima no rodapé).
3. Role o menu para cima e selecione **"Adicionar à Tela de Início"** (ícone `+`).
4. Toque em **"Adicionar"** no canto superior direito.
5. Pronto! O ícone da Bíblia Sagrada estará na sua tela inicial, abrindo como um app nativo em tela inteira e com leitura offline.

---

## 💻 Como Rodar Localmente para Desenvolvimento

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev

# 3. Gerar a versão de produção
npm run build
```

---

## 📁 Estrutura do Projeto

```
├── public/
│   ├── data/
│   │   ├── bible-index.json         # Metadados dos 66 livros bíblicos
│   │   ├── curated-commentaries.json # Comentários teológicos e estudos
│   │   └── books/*.json             # Capítulos e versículos de cada livro
│   ├── icons/                       # Ícones PWA e Apple Touch Icon (180x180, 512x512)
│   ├── manifest.webmanifest         # Configuração PWA para celulares
│   └── sw.js                        # Service Worker para funcionamento Offline
├── src/
│   ├── components/
│   │   ├── BibleReader.tsx          # Leitor de texto com seleção e áudio
│   │   ├── BookSelectorModal.tsx    # Seletor de livros e capítulos com filtro
│   │   ├── ExplanationDrawer.tsx    # Painel de estudo teológico e notas
│   │   ├── SearchModal.tsx          # Busca instantânea e atalhos rápidos
│   │   ├── SettingsModal.tsx        # Temas (Claro, Sépia, Noite, OLED) e fontes
│   │   ├── CardGeneratorModal.tsx   # Gerador de cards para Instagram / WhatsApp
│   │   ├── IosInstallGuideModal.tsx # Tutorial passo a passo para iPhone
│   │   ├── DailyDevotionalModal.tsx # Versículo e reflexão diária
│   │   ├── BookmarksModal.tsx       # Marcadores com cor e anotações
│   │   └── BottomNav.tsx            # Navegação inferior estilo iOS
│   ├── utils/
│   │   └── explainer.ts             # Motor de exegese e contextualização teológica
│   ├── types.ts                     # Definições TypeScript
│   ├── index.css                    # Design System e estilos
│   ├── App.tsx                      # Componente raiz da aplicação
│   └── main.tsx                     # Ponto de entrada
├── vercel.json                      # Configuração para deploy na Vercel
├── netlify.toml                     # Configuração para deploy no Netlify
└── package.json
```

---

## 🕊️ Diretório Emocional dos Salmos ("Salmos para sua Alma")
Acesse os 150 Salmos categorizados pelo que o coração está sentindo:
* 😰 **Ansiedade, Pânico & Insônia**: Salmo 23, Salmo 46, Salmo 94, Salmo 4.
* 🌧️ **Aflição, Dor & Luto**: Salmo 34, Salmo 40, Salmo 42, Salmo 147.
* 🛡️ **Medo, Insegurança & Proteção**: Salmo 91, Salmo 121, Salmo 27, Salmo 3.
* 💔 **Culpa, Arrependimento & Perdão**: Salmo 51, Salmo 32, Salmo 130.
* 🧭 **Incerteza & Tomada de Decisão**: Salmo 1, Salmo 25, Salmo 119, Salmo 37.
* 🙌 **Gratidão, Louvor & Vitória**: Salmo 100, Salmo 103, Salmo 150.

---

## 📅 Planos de Leitura & Guia Didático O.R.A.R.
Aprenda como ler a Bíblia corretamente com o método devocional:
1. **O - Observação**: O que o texto diz textualmente?
2. **R - Reflexão**: O que isso revela sobre Deus?
3. **A - Aplicação**: Como praticar isso na minha vida hoje?
4. **R - Resposta em Oração**: Fale com Deus transformando a Palavra em oração.

**Planos inclusos com progresso diário salvo:**
* 🌱 *Iniciantes: Primeiros Passos* (30 Dias)
* 🕊️ *Restaurando a Paz Interior* (21 Dias)
* 🏛️ *Grandes Histórias e Heróis da Fé* (40 Dias)
