import { useState, useEffect, useRef } from 'react';
import { X, Moon, Play, Pause, SkipForward, SkipBack, Clock } from 'lucide-react';

interface SleepAudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SLEEP_PLAYLIST = [
  {
    ref: 'Salmo 23',
    title: 'O Bom Pastor e o Descanso da Alma',
    text: 'O Senhor é o meu pastor; de nada terei falta. Ele me faz repousar em pastagens verdejantes e me conduz a águas tranquilas; restaura-me o vigor. Guia-me pelas veredas da justiça por amor do seu nome. Mesmo que eu ande por um vale de densas trevas, não temerei perigo algum, pois tu estás comigo; a tua vara e o teu cajado me confortam. Preparas um banquete diante de mim na presença dos meus inimigos. Unges a minha cabeça com óleo, e o meu cálice transborda. Certamente a bondade e o amor leal me seguirão todos os dias da minha vida, e habitarei na casa do Senhor para sempre.'
  },
  {
    ref: 'Salmo 91',
    title: 'O Abrigo Seguro do Altíssimo',
    text: 'Aquele que habita no abrigo do Altíssimo descansará à sombra do Todo-poderoso. Direi do Senhor: Tu és o meu refúgio e a minha fortaleza, o meu Deus, em quem confio. Ele o livrará do laço do caçador e da peste mortal. Ele o cobrirá com as suas penas, e sob as suas asas você encontrará refúgio; a fidelidade dele será o seu escudo protetor. Você não temerá o pavor da noite nem a flecha que voa de dia. Mil poderão cair ao seu lado e dez mil à sua direita, mas nada o atingirá. Nenhum mal o atingirá, desgraça alguma chegará à sua tenda, porque ele dará ordem aos anjos a seu respeito, para que protejam você em todos os seus caminhos.'
  },
  {
    ref: 'Salmo 4',
    title: 'Em Paz Me Deito e Logo Pego no Sono',
    text: 'Responde-me quando clamo, ó Deus que me fazes justiça! Dá-me alívio na minha angústia; tem misericórdia de mim e ouve a minha oração. Saibam que o Senhor escolheu o piedoso; o Senhor ouvirá quando eu a ele clamar. Quando vocês se deitarem, reflitam no seu coração e aquietem-se. Em paz me deito e logo pego no sono, pois só tu, Senhor, me fazes viver em segurança.'
  },
  {
    ref: 'Salmo 121',
    title: 'O Guarda Fiel de Israel',
    text: 'Elevo os meus olhos para os montes: de onde me virá o socorro? O meu socorro vem do Senhor, que fez os céus e a terra. Ele não permitirá que os seus pés vacilem; não dormitará aquele que guarda você. Sim, não dormita nem dorme o guarda de Israel! O Senhor é o seu protetor; o Senhor é a sombra à sua direita. De dia o sol não o ferirá, nem a lua de noite. O Senhor o protegerá de todo o mal, protegerá a sua vida. O Senhor guardará a sua saída e a sua entrada, desde agora e para sempre.'
  },
  {
    ref: 'Filipenses 4:6-7',
    title: 'A Paz que Excede Todo Entendimento',
    text: 'Não andem ansiosos por coisa alguma; antes, em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará os seus corações e as suas mentes em Cristo Jesus. Finalmente, irmãos, tudo o que for verdadeiro, tudo o que for nobre, tudo o que for correto, tudo o que for puro, tudo o que for amável, nisso pensem.'
  },
  {
    ref: 'Mateus 11:28-30',
    title: 'O Alívio para os Cansados',
    text: 'Venham a mim, todos os que estão cansados e sobrecarregados, e eu darei descanso a vocês. Tomem sobre vocês o meu jugo e aprendam de mim, pois sou manso e humilde de coração, e vocês encontrarão descanso para as suas almas. Pois o meu jugo é suave e o meu fardo é leve.'
  }
];

export const SleepAudioModal: React.FC<SleepAudioModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState<number>(30); // 15, 30, 45, 60
  const [remainingSeconds, setRemainingSeconds] = useState<number>(30 * 60);
  const [isDimmedMode, setIsDimmedMode] = useState(false);

  const timerIntervalRef = useRef<number | null>(null);

  const currentTrack = SLEEP_PLAYLIST[currentIndex];

  // Stop speech when modal closes
  useEffect(() => {
    if (!isOpen) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  }, [isOpen]);

  // Timer countdown
  useEffect(() => {
    if (isPlaying && timerMinutes > 0) {
      timerIntervalRef.current = window.setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            // Stop playing
            if ('speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
            setIsPlaying(false);
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isPlaying, timerMinutes]);

  const speakCurrent = (index: number) => {
    if (!('speechSynthesis' in window)) {
      alert('Seu dispositivo não suporta reprodução de áudio por voz.');
      return;
    }

    window.speechSynthesis.cancel();
    const track = SLEEP_PLAYLIST[index];
    const textToSpeak = `${track.ref}. ${track.title}. ${track.text}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.84; // Calm, soothing, reverent pace for sleep
    utterance.pitch = 0.95;

    utterance.onend = () => {
      // Auto-advance to next track
      if (index + 1 < SLEEP_PLAYLIST.length) {
        setCurrentIndex(index + 1);
        speakCurrent(index + 1);
      } else {
        // Loop back to start
        setCurrentIndex(0);
        speakCurrent(0);
      }
    };

    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      speakCurrent(currentIndex);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % SLEEP_PLAYLIST.length;
    setCurrentIndex(nextIdx);
    if (isPlaying) speakCurrent(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + SLEEP_PLAYLIST.length) % SLEEP_PLAYLIST.length;
    setCurrentIndex(prevIdx);
    if (isPlaying) speakCurrent(prevIdx);
  };

  const handleSelectTimer = (minutes: number) => {
    setTimerMinutes(minutes);
    setRemainingSeconds(minutes * 60);
  };

  if (!isOpen) return null;

  const minutesDisplay = Math.floor(remainingSeconds / 60);
  const secondsDisplay = remainingSeconds % 60;
  const timeFormatted = `${String(minutesDisplay).padStart(2, '0')}:${String(secondsDisplay).padStart(2, '0')}`;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={isDimmedMode ? { backgroundColor: 'rgba(0, 0, 0, 0.96)' } : undefined}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '520px',
          backgroundColor: isDimmedMode ? '#050507' : undefined,
          color: isDimmedMode ? '#a1a1aa' : undefined,
        }}
      >
        {/* Header */}
        <div className="modal-header" style={{ borderBottomColor: isDimmedMode ? '#18181b' : undefined }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Moon size={20} color="var(--accent-gold)" />
            <h2 className="modal-title">Áudio para Dormir em Paz</h2>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ textAlign: 'center', padding: '24px 20px' }}>
          {/* Track emblem */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-subtle)',
              border: '2px solid var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              color: 'var(--accent-gold)',
              boxShadow: isPlaying ? '0 0 25px rgba(234, 179, 8, 0.25)' : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <Moon size={36} />
          </div>

          {/* Current track info */}
          <div
            style={{
              fontSize: '0.8rem',
              color: 'var(--accent-gold)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '4px',
            }}
          >
            {currentTrack.ref}
          </div>
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: '0 0 12px 0',
            }}
          >
            {currentTrack.title}
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.96rem',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              maxHeight: '130px',
              overflowY: 'auto',
              padding: '0 10px',
              margin: '0 0 20px 0',
            }}
          >
            "{currentTrack.text}"
          </p>

          {/* Player Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '18px',
              marginBottom: '24px',
            }}
          >
            <button
              className="icon-button"
              onClick={handlePrev}
              title="Passagem anterior"
              style={{ width: '44px', height: '44px' }}
            >
              <SkipBack size={22} />
            </button>

            <button
              onClick={handlePlayPause}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-gold)',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
                transition: 'transform 0.15s ease',
              }}
              title={isPlaying ? 'Pausar áudio' : 'Ouvir Salmos'}
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '3px' }} />}
            </button>

            <button
              className="icon-button"
              onClick={handleNext}
              title="Próxima passagem"
              style={{ width: '44px', height: '44px' }}
            >
              <SkipForward size={22} />
            </button>
          </div>

          {/* Sleep Timer Section */}
          <div
            style={{
              padding: '14px',
              backgroundColor: isDimmedMode ? '#0c0c10' : 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                }}
              >
                <Clock size={15} />
                <span>Timer para desligar:</span>
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                {isPlaying ? timeFormatted : `${timerMinutes} min`}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
              {[15, 30, 45, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => handleSelectTimer(mins)}
                  className={`filter-pill ${timerMinutes === mins ? 'active' : ''}`}
                  style={{ fontSize: '0.78rem', padding: '5px 12px' }}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          {/* Dimmed Screen Toggle (Total Black Mode for Room Sleep) */}
          <button
            onClick={() => setIsDimmedMode(!isDimmedMode)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.82rem',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            {isDimmedMode ? '☀️ Restaurar luz da tela' : '🌑 Escurecer tela totalmente para dormir'}
          </button>
        </div>
      </div>
    </div>
  );
};
