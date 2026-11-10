import { useState, useEffect, useRef } from 'react';
import {
  X,
  Moon,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Clock,
  Volume2,
  VolumeX,
  Sparkles,
  Sliders,
  Music,
} from 'lucide-react';
import { ambientSound, type AmbientSoundType } from '../utils/ambientSound';

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

function getVoiceScore(voice: SpeechSynthesisVoice): number {
  let score = 0;
  const name = voice.name.toLowerCase();
  const lang = voice.lang.toLowerCase();

  if (lang.includes('br')) score += 15;
  if (name.includes('natural') || name.includes('neural')) score += 35;
  if (name.includes('google')) score += 25;
  if (name.includes('enhanced') || name.includes('premium')) score += 25;
  if (name.includes('luciana') || name.includes('felipe') || name.includes('francisca') || name.includes('leticia') || name.includes('joana')) score += 20;
  if (voice.default) score += 5;
  return score;
}

export const SleepAudioModal: React.FC<SleepAudioModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState<number>(30); // 15, 30, 45, 60
  const [remainingSeconds, setRemainingSeconds] = useState<number>(30 * 60);
  const [isDimmedMode, setIsDimmedMode] = useState(false);

  // Audio Customization
  const [ambientType, setAmbientType] = useState<AmbientSoundType>('celestial');
  const [ambientVolume, setAmbientVolume] = useState<number>(0.25);
  const [speechRate, setSpeechRate] = useState<number>(0.84);
  const [showAudioControls, setShowAudioControls] = useState<boolean>(false);

  // Available Voices
  const [ptVoices, setPtVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('auto');

  const timerIntervalRef = useRef<number | null>(null);
  const stopRequestedRef = useRef<boolean>(false);
  const currentSentenceTimeoutRef = useRef<number | null>(null);

  const currentTrack = SLEEP_PLAYLIST[currentIndex];

  // Load voices on mount
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const all = window.speechSynthesis.getVoices();
      const filtered = all.filter((v) => v.lang.toLowerCase().startsWith('pt'));
      // Sort best first
      filtered.sort((a, b) => getVoiceScore(b) - getVoiceScore(a));
      setPtVoices(filtered);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Stop speech & ambient when modal closes
  useEffect(() => {
    if (!isOpen) {
      stopAllAudio();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  }, [isOpen]);

  // Timer countdown
  useEffect(() => {
    if (isPlaying && timerMinutes > 0) {
      timerIntervalRef.current = window.setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            stopAllAudio();
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

  const stopAllAudio = () => {
    stopRequestedRef.current = true;
    if (currentSentenceTimeoutRef.current) {
      window.clearTimeout(currentSentenceTimeoutRef.current);
      currentSentenceTimeoutRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    ambientSound.stop();
    setIsPlaying(false);
  };

  const getActiveVoice = (): SpeechSynthesisVoice | null => {
    if (ptVoices.length === 0) return null;
    if (selectedVoiceURI !== 'auto') {
      const found = ptVoices.find((v) => v.voiceURI === selectedVoiceURI);
      if (found) return found;
    }
    return ptVoices[0] || null;
  };

  // Divide text into natural fluid sentences with breathing pauses
  const splitSentences = (text: string): string[] => {
    return text
      .split(/(?<=[.!?;:])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  };

  const speakTrack = (trackIndex: number) => {
    if (!('speechSynthesis' in window)) {
      alert('Seu dispositivo não suporta leitura de áudio.');
      return;
    }

    stopRequestedRef.current = false;
    window.speechSynthesis.cancel();
    if (currentSentenceTimeoutRef.current) {
      window.clearTimeout(currentSentenceTimeoutRef.current);
      currentSentenceTimeoutRef.current = null;
    }

    // Start background ambient music softly
    ambientSound.play(ambientType, ambientVolume);
    setIsPlaying(true);

    const track = SLEEP_PLAYLIST[trackIndex];
    const sentences = [
      `${track.ref}. ${track.title}.`,
      ...splitSentences(track.text)
    ];

    let sentenceIdx = 0;
    const selectedVoice = getActiveVoice();

    const speakNextSentence = () => {
      if (stopRequestedRef.current) return;

      if (sentenceIdx >= sentences.length) {
        // Track finished! Pause 1.4s then advance to next psalm
        currentSentenceTimeoutRef.current = window.setTimeout(() => {
          if (!stopRequestedRef.current) {
            const nextIdx = (trackIndex + 1) % SLEEP_PLAYLIST.length;
            setCurrentIndex(nextIdx);
            speakTrack(nextIdx);
          }
        }, 1400);
        return;
      }

      const text = sentences[sentenceIdx];
      sentenceIdx += 1;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedVoice?.lang || 'pt-BR';
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.rate = speechRate;
      utterance.pitch = 0.96; // Warm, peaceful pitch

      utterance.onend = () => {
        if (!stopRequestedRef.current) {
          // Micro-pause (380ms) for human natural breathing and reverence
          currentSentenceTimeoutRef.current = window.setTimeout(() => {
            speakNextSentence();
          }, 380);
        }
      };

      utterance.onerror = (e: SpeechSynthesisErrorEvent) => {
        // Browsers trigger 'interrupted' or 'canceled' when switching sentences or tracks.
        // Never stop ambient sound or playback state on these benign events.
        if (e.error === 'interrupted' || e.error === 'canceled') {
          return;
        }
        console.warn('Speech synthesis notice:', e.error);
        if (!stopRequestedRef.current) {
          // Attempt next sentence after brief micro-pause
          currentSentenceTimeoutRef.current = window.setTimeout(() => {
            speakNextSentence();
          }, 350);
        }
      };

      window.speechSynthesis.speak(utterance);
    };

    // Small delay before voice starts so ambient pad establishes a calm atmosphere
    currentSentenceTimeoutRef.current = window.setTimeout(() => {
      speakNextSentence();
    }, 450);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      stopAllAudio();
    } else {
      speakTrack(currentIndex);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % SLEEP_PLAYLIST.length;
    setCurrentIndex(nextIdx);
    if (isPlaying) speakTrack(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + SLEEP_PLAYLIST.length) % SLEEP_PLAYLIST.length;
    setCurrentIndex(prevIdx);
    if (isPlaying) speakTrack(prevIdx);
  };

  const handleSelectTimer = (minutes: number) => {
    setTimerMinutes(minutes);
    setRemainingSeconds(minutes * 60);
  };

  const handleAmbientChange = (type: AmbientSoundType) => {
    setAmbientType(type);
    if (isPlaying) {
      ambientSound.play(type, ambientVolume);
    }
  };

  const handleVolumeChange = (vol: number) => {
    setAmbientVolume(vol);
    if (isPlaying) {
      ambientSound.setVolume(vol);
    }
  };

  if (!isOpen) return null;

  const minutesDisplay = Math.floor(remainingSeconds / 60);
  const secondsDisplay = remainingSeconds % 60;
  const timeFormatted = `${String(minutesDisplay).padStart(2, '0')}:${String(secondsDisplay).padStart(2, '0')}`;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={isDimmedMode ? { backgroundColor: 'rgba(0, 0, 0, 0.97)' } : undefined}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              className="icon-button"
              onClick={() => setShowAudioControls(!showAudioControls)}
              title="Ajustar som ambiente e voz"
              style={{ color: showAudioControls ? 'var(--accent-gold)' : undefined }}
            >
              <Sliders size={18} />
            </button>
            <button className="icon-button" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ textAlign: 'center', padding: '20px 18px' }}>
          {/* Track emblem with ambient aura glow */}
          <div
            style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              backgroundColor: isPlaying ? 'rgba(234, 179, 8, 0.15)' : 'var(--accent-subtle)',
              border: '2px solid var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px auto',
              color: 'var(--accent-gold)',
              boxShadow: isPlaying ? '0 0 30px rgba(234, 179, 8, 0.35)' : 'none',
              transition: 'all 0.4s ease',
            }}
          >
            <Moon size={34} />
          </div>

          {/* Current track info */}
          <div
            style={{
              fontSize: '0.8rem',
              color: 'var(--accent-gold)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '3px',
            }}
          >
            {currentTrack.ref}
          </div>
          <h3
            style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: '0 0 10px 0',
            }}
          >
            {currentTrack.title}
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.94rem',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              maxHeight: '120px',
              overflowY: 'auto',
              padding: '0 10px',
              margin: '0 0 18px 0',
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
              marginBottom: '18px',
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
                width: '62px',
                height: '62px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-gold)',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: isPlaying
                  ? '0 0 20px rgba(234, 179, 8, 0.5)'
                  : 'var(--shadow-md)',
                transition: 'transform 0.15s ease, box-shadow 0.3s ease',
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

          {/* Ambient Sound & Voice Settings Panel */}
          {showAudioControls && (
            <div
              style={{
                textAlign: 'left',
                padding: '14px',
                backgroundColor: isDimmedMode ? '#0c0c10' : 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                marginBottom: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {/* Ambient Sound Selection */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '6px',
                  }}
                >
                  <Music size={14} color="var(--accent-gold)" />
                  <span>Música / Som Ambiente de Fundo:</span>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'celestial', label: '🕊️ Pad Celestial' },
                    { id: 'rain', label: '🌧️ Chuva Suave' },
                    { id: 'waters', label: '🌊 Águas Tranquilas' },
                    { id: 'none', label: '🔇 Silencioso' },
                  ].map((amb) => (
                    <button
                      key={amb.id}
                      onClick={() => handleAmbientChange(amb.id as AmbientSoundType)}
                      className={`filter-pill ${ambientType === amb.id ? 'active' : ''}`}
                      style={{ fontSize: '0.76rem', padding: '4px 10px' }}
                    >
                      {amb.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ambient Volume Slider */}
              {ambientType !== 'none' && (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {ambientVolume > 0 ? <Volume2 size={13} /> : <VolumeX size={13} />}
                      Volume da Música de Fundo:
                    </span>
                    <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>
                      {Math.round(ambientVolume * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.8"
                    step="0.05"
                    value={ambientVolume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    style={{
                      width: '100%',
                      accentColor: 'var(--accent-gold)',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              )}

              {/* Voice Speed */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '6px',
                  }}
                >
                  <Sparkles size={14} color="var(--accent-gold)" />
                  <span>Cadência da Voz:</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[
                    { rate: 0.76, label: 'Muito Serena (0.75x)' },
                    { rate: 0.84, label: 'Suave / Oração (0.85x)' },
                    { rate: 1.0, label: 'Normal (1.0x)' },
                  ].map((spd) => (
                    <button
                      key={spd.rate}
                      onClick={() => setSpeechRate(spd.rate)}
                      className={`filter-pill ${speechRate === spd.rate ? 'active' : ''}`}
                      style={{ fontSize: '0.76rem', padding: '4px 10px' }}
                    >
                      {spd.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Device Voice Selector (if multiple PT voices are present) */}
              {ptVoices.length > 1 && (
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      marginBottom: '4px',
                    }}
                  >
                    Voz do Dispositivo:
                  </label>
                  <select
                    value={selectedVoiceURI}
                    onChange={(e) => setSelectedVoiceURI(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '6px 10px',
                      backgroundColor: 'var(--bg-card)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                    }}
                  >
                    <option value="auto">✨ Melhor Voz Detectada (Recomendada)</option>
                    {ptVoices.map((v) => (
                      <option key={v.voiceURI} value={v.voiceURI}>
                        {v.name} ({v.lang})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Quick Audio Customization toggle prompt if hidden */}
          {!showAudioControls && (
            <button
              onClick={() => setShowAudioControls(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-gold)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                marginBottom: '14px',
              }}
            >
              <Music size={13} />
              <span>
                Fundo: {ambientType === 'celestial' ? '🕊️ Pad Celestial' : ambientType === 'rain' ? '🌧️ Chuva' : ambientType === 'waters' ? '🌊 Águas' : 'Silêncio'} • Ajustar som
              </span>
            </button>
          )}

          {/* Sleep Timer Section */}
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: isDimmedMode ? '#0c0c10' : 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              marginBottom: '14px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px',
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
                  style={{ fontSize: '0.78rem', padding: '4px 10px' }}
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
            {isDimmedMode ? '☀️ Restaurar iluminação' : '🌑 Escurecer tela totalmente para dormir'}
          </button>
        </div>
      </div>
    </div>
  );
};
