import React, { useState, useEffect } from 'react';
import { SLIDES_META } from '../data/slidesData';
import { useTheme } from '../context/ThemeContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  Mic, 
  Volume2, 
  VolumeX, 
  LayoutGrid, 
  X
} from 'lucide-react';

interface ToolbarProps {
  currentSlide: number;
  onSelectSlide: (slideId: number) => void;
  onOpenNotes: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  currentSlide,
  onSelectSlide,
  onOpenNotes,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isThumbnailsOpen, setIsThumbnailsOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const { isDark } = useTheme();

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        if (currentSlide < SLIDES_META.length) {
          onSelectSlide(currentSlide + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentSlide > 1) {
          onSelectSlide(currentSlide - 1);
        }
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'n' || e.key === 'N') {
        onOpenNotes();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, onSelectSlide, onOpenNotes]);

  // Gentle subtle heartbeat sound generator using Web Audio API
  useEffect(() => {
    let interval: any = null;
    if (isAudioActive) {
      const ctx = audioContext || new (window.AudioContext || (window as any).webkitAudioContext)();
      if (!audioContext) setAudioContext(ctx);

      const playHeartbeat = () => {
        if (!ctx || ctx.state === 'suspended') {
          ctx.resume();
        }
        const now = ctx.currentTime;

        // Lub (First sound)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(75, now);
        osc1.frequency.exponentialRampToValueAtTime(40, now + 0.08);
        gain1.gain.setValueAtTime(0.2, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.09);

        // Dub (Second sound ~ 0.15s later)
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(90, now + 0.14);
        osc2.frequency.exponentialRampToValueAtTime(45, now + 0.22);
        gain2.gain.setValueAtTime(0.15, now + 0.14);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.14);
        osc2.stop(now + 0.23);
      };

      playHeartbeat();
      interval = setInterval(playHeartbeat, 1200);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAudioActive, audioContext]);

  return (
    <div className={`relative z-40 border-t px-4 py-2.5 flex items-center justify-between text-xs transition-colors duration-200 ${
      isDark ? 'bg-[#071322] border-slate-800/80 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
    }`}>
      {/* Left: Slide Index & Thumbnails Drawer Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsThumbnailsOpen(!isThumbnailsOpen)}
          className={`p-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
            isThumbnailsOpen
              ? isDark
                ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                : 'bg-sky-100 border-sky-400 text-sky-800 font-semibold'
              : isDark
              ? 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
              : 'bg-slate-100 border-slate-300 text-slate-600 hover:text-slate-900'
          }`}
          title="Ver índice de diapositivas"
        >
          <LayoutGrid className="w-4 h-4" />
          <span className="hidden sm:inline font-medium">Índice</span>
        </button>

        <span className={`font-mono text-xs font-semibold px-2 py-1 rounded border ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'
        }`}>
          Diapositiva <strong className="text-cyan-600 dark:text-cyan-400">{currentSlide}</strong> / {SLIDES_META.length}
        </span>

        <span className={`hidden md:inline text-xs truncate max-w-xs font-medium ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          {SLIDES_META[currentSlide - 1]?.title}
        </span>
      </div>

      {/* Center: Slide Arrows */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => currentSlide > 1 && onSelectSlide(currentSlide - 1)}
          disabled={currentSlide === 1}
          className={`p-1.5 sm:px-3 sm:py-1.5 rounded-xl font-medium flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm border ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
          }`}
          title="Diapositiva anterior (Flecha izquierda)"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline text-xs">Anterior</span>
        </button>

        {/* Quick Slide Dots */}
        <div className="flex items-center gap-1 px-1">
          {SLIDES_META.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectSlide(s.id)}
              className={`h-2 rounded-full transition-all ${
                s.id === currentSlide
                  ? 'w-6 bg-cyan-500 shadow-[0_0_8px_#00F0FF]'
                  : isDark
                  ? 'w-2 bg-slate-700 hover:bg-slate-500'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              title={s.title}
            />
          ))}
        </div>

        <button
          onClick={() => currentSlide < SLIDES_META.length && onSelectSlide(currentSlide + 1)}
          disabled={currentSlide === SLIDES_META.length}
          className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
          title="Siguiente diapositiva (Flecha derecha o Espacio)"
        >
          <span className="hidden sm:inline text-xs">Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Speaker notes, Pulse audio, Fullscreen */}
      <div className="flex items-center gap-1.5">
        {/* Heartbeat audio toggle */}
        <button
          onClick={() => setIsAudioActive(!isAudioActive)}
          className={`p-1.5 rounded-lg border transition-colors ${
            isAudioActive
              ? 'bg-rose-100 dark:bg-rose-950 border-rose-400 dark:border-rose-500 text-rose-700 dark:text-rose-300'
              : isDark
              ? 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
              : 'bg-slate-100 border-slate-300 text-slate-600 hover:text-slate-900'
          }`}
          title={isAudioActive ? 'Silenciar latido' : 'Sonido cardíaco ambiental'}
        >
          {isAudioActive ? <Volume2 className="w-4 h-4 text-rose-500 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Presenter Notes Button */}
        <button
          onClick={onOpenNotes}
          className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500/50'
              : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900 hover:border-cyan-500/50'
          }`}
          title="Abrir notas del orador y cronómetro (Tecla N)"
        >
          <Mic className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span className="hidden sm:inline text-xs">Guion</span>
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className={`p-1.5 rounded-lg border transition-colors ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500/50'
              : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900 hover:border-cyan-500/50'
          }`}
          title={isFullscreen ? 'Salir de pantalla completa (F o Esc)' : 'Pantalla completa de presentación (Tecla F)'}
        >
          {isFullscreen ? <Minimize className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> : <Maximize className="w-4 h-4" />}
        </button>
      </div>

      {/* THUMBNAILS DRAWER / OVERLAY */}
      {isThumbnailsOpen && (
        <div className={`absolute bottom-full left-0 right-0 p-4 backdrop-blur-xl border-t shadow-2xl animate-fadeIn ${
          isDark ? 'bg-[#081829]/95 border-slate-700' : 'bg-white/95 border-slate-300'
        }`}>
          <div className="flex items-center justify-between mb-3 max-w-7xl mx-auto">
            <h3 className={`text-sm font-bold font-['Outfit'] flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <LayoutGrid className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Índice de Diapositivas de la Presentación
            </h3>
            <button
              onClick={() => setIsThumbnailsOpen(false)}
              className={`p-1 rounded-lg transition-colors ${
                isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-7xl mx-auto">
            {SLIDES_META.map((slide) => {
              const isCurrent = slide.id === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => {
                    onSelectSlide(slide.id);
                    setIsThumbnailsOpen(false);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all group flex flex-col justify-between h-28 ${
                    isCurrent
                      ? isDark
                        ? 'bg-[#123050] border-cyan-400 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400'
                        : 'bg-sky-50 border-sky-400 shadow-md ring-1 ring-sky-300'
                      : isDark
                      ? 'bg-[#0B1A2C] border-slate-800 hover:border-slate-700 hover:bg-[#0E223A]'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
                      0{slide.id}
                    </span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                      isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {slide.badge}
                    </span>
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold line-clamp-2 font-['Outfit'] ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {slide.title}
                    </h4>
                    <p className={`text-[10px] line-clamp-1 mt-0.5 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {slide.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
