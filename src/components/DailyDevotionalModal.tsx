import { X, Sparkles, BookOpen, Heart, MessageCircle } from 'lucide-react';
import type { BookMeta } from '../types';
import { shareDevotionalOnWhatsApp } from '../utils/whatsapp';

interface DailyDevotionalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReadInBible: (bookAbbrev: string, chapter: number) => void;
  books?: BookMeta[];
}

const DEVOTIONALS = [
  {
    bookAbbrev: 'sl',
    chapter: 23,
    verseNum: 1,
    reference: 'Salmo 23:1',
    text: 'O Senhor é o meu pastor; de nada terei falta.',
    devotionalTitle: 'Descanso na Suficiência de Deus',
    message:
      'Quando o rei Davi compôs este salmo, ele não estava negando as dificuldades terrenas, mas reconhecendo que a mão de Deus é mais que suficiente para suprir cada necessidade da nossa alma. O pastor não apenas alimenta; ele guia, protege e cura. Hoje, entregue o peso do controle das suas preocupações nas mãos dAquele que conhece cada detalhe do seu futuro.',
    prayer:
      'Senhor, meu Bom Pastor, Te entrego hoje minhas ansiedades e incertezas. Enche o meu coração com a Tua paz e concede-me olhos para contemplar as pastagens verdes do Teu amor. Amém.',
  },
  {
    bookAbbrev: 'sl',
    chapter: 91,
    verseNum: 1,
    reference: 'Salmo 91:1-2',
    text: 'Aquele que habita no abrigo do Altíssimo descansará à sombra do Todo-poderoso. Direi do Senhor: "Tu és o meu refúgio e a minha fortaleza, o meu Deus, em quem confio".',
    devotionalTitle: 'Onde Encontrar Verdadeira Proteção',
    message:
      'Habitar no esconderijo de Deus é escolher a presença dEle como nossa casa permanente. No meio de tantas notícias inquietantes, a promessa divina permanece firme: debaixo das Suas asas você encontrará consolo, autoridade e segurança inabalável.',
    prayer:
      'Pai celestial, Tu és meu abrigo inviolável. Afasta o temor da minha mente e guarda meus passos e os de quem amo neste novo dia. Em nome de Jesus, Amém.',
  },
  {
    bookAbbrev: 'fp',
    chapter: 4,
    verseNum: 6,
    reference: 'Filipenses 4:6-7',
    text: 'Não andem ansiosos por coisa alguma; antes, em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará os seus corações e as suas mentes em Cristo Jesus.',
    devotionalTitle: 'Trocando a Ansiedade pela Paz Sobrenatural',
    message:
      'A paz de Deus não é a ausência de tempestades, mas a presença constante de Jesus no barco. Paulo escreveu estas palavras enquanto estava acorrentado em uma prisão romana, revelando que a nossa alegria não depende de circunstâncias favoráveis, mas da nossa comunhão com o Pai.',
    prayer:
      'Querido Deus, substituo cada pensamento de preocupação pela oração sincera e ações de graças. Que a Tua paz celestial monte guarda sobre as minhas emoções hoje. Amém.',
  },
  {
    bookAbbrev: 'is',
    chapter: 40,
    verseNum: 31,
    reference: 'Isaías 40:31',
    text: 'Mas aqueles que esperam no Senhor renovam as suas forças. Voam alto como águias; correm e não ficam exaustos, andam e não se cansam.',
    devotionalTitle: 'As Asas da Esperança',
    message:
      'O cansaço físico e mental pode abater até os mais jovens e fortes. Porém, os que esperam ativamente no Senhor recebem um fôlego novo que não provém de esforço humano, mas do poder do Espírito Santo.',
    prayer:
      'Senhor Deus, renova hoje as minhas forças exaustas. Concede-me ânimo para perseverar com alegria no caminho da fé. Amém.',
  },
];

export const DailyDevotionalModal: React.FC<DailyDevotionalModalProps> = ({
  isOpen,
  onClose,
  onReadInBible,
}) => {
  if (!isOpen) return null;

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const devotional = DEVOTIONALS[dayOfYear % DEVOTIONALS.length];

  const handleShareWhatsApp = () => {
    shareDevotionalOnWhatsApp(
      devotional.devotionalTitle,
      devotional.reference,
      devotional.text,
      devotional.message,
      devotional.prayer
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '540px' }}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--accent-gold)" />
            <h2 className="modal-title">Versículo e Reflexão do Dia</h2>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Verse Card */}
          <div
            style={{
              padding: '18px 20px',
              backgroundColor: 'var(--bg-secondary)',
              borderLeft: '4px solid var(--accent-gold)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--accent-gold)',
                fontWeight: 700,
                marginBottom: '6px',
              }}
            >
              {devotional.reference}
            </div>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.08rem',
                lineHeight: '1.7',
                color: 'var(--text-primary)',
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              "{devotional.text}"
            </p>
          </div>

          {/* Devotional message */}
          <div>
            <h3
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}
            >
              {devotional.devotionalTitle}
            </h3>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.94rem',
                lineHeight: '1.7',
                margin: 0,
              }}
            >
              {devotional.message}
            </p>
          </div>

          {/* Prayer */}
          <div
            style={{
              padding: '14px 16px',
              backgroundColor: 'var(--accent-gold-light)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--accent-gold)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--accent-gold)',
                fontWeight: 700,
                fontSize: '0.82rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '6px',
              }}
            >
              <Heart size={14} />
              <span>Oração do Dia</span>
            </div>
            <p
              style={{
                color: 'var(--text-primary)',
                fontStyle: 'italic',
                fontSize: '0.92rem',
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              {devotional.prayer}
            </p>
          </div>

          {/* Action Buttons: Read Chapter + Share on WhatsApp */}
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <button
              onClick={handleShareWhatsApp}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#25D366',
                color: '#ffffff',
                border: 'none',
                padding: '12px 20px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.92rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)',
              }}
            >
              <MessageCircle size={18} />
              <span>Compartilhar Devocional no WhatsApp</span>
            </button>

            <button
              onClick={() => {
                onReadInBible(devotional.bookAbbrev, devotional.chapter);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '12px 20px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <BookOpen size={17} color="var(--accent-gold)" />
              <span>Ler o Capítulo Completo no App</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
