import React, { useState } from 'react';
import { SlideMasterAnatomy } from './components/SlideMasterAnatomy';
import { SlideHemodynamics } from './components/SlideHemodynamics';
import { SlideAnteriorVsPosterior } from './components/SlideAnteriorVsPosterior';
import { SlideEmergencyProtocol } from './components/SlideEmergencyProtocol';
import { SlideQuiz } from './components/SlideQuiz';
import { SlideCanvaGuide } from './components/SlideCanvaGuide';
import { Toolbar } from './components/Toolbar';
import { PresenterModal } from './components/PresenterModal';
import { useTheme } from './context/ThemeContext';
import { Palette, Mic, HeartPulse, Layers, Sun, Moon } from 'lucide-react';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const { theme, isDark, toggleTheme } = useTheme();

  const renderSlide = () => {
    switch (currentSlide) {
      case 1:
        return <SlideMasterAnatomy />;
      case 2:
        return <SlideHemodynamics />;
      case 3:
        return <SlideAnteriorVsPosterior />;
      case 4:
        return <SlideEmergencyProtocol />;
      case 5:
        return <SlideQuiz />;
      case 6:
        return <SlideCanvaGuide />;
      default:
        return <SlideMasterAnatomy />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-rose-500 selection:text-white font-sans antialiased transition-colors duration-200 ${
      isDark ? 'bg-[#071322] text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      {/* TOP COMPACT APP HEADER */}
      <header className={`border-b px-4 py-2 flex items-center justify-between z-30 transition-colors duration-200 shadow-sm ${
        isDark ? 'bg-[#0B192C] border-slate-800/80' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-rose-500 to-amber-400 p-[1.5px] flex items-center justify-center shadow-md">
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center transition-colors ${
              isDark ? 'bg-[#0B192C]' : 'bg-white'
            }`}>
              <HeartPulse className="w-4 h-4 text-rose-500 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`text-xs sm:text-sm font-bold font-['Outfit'] tracking-wide ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Plexo de Kiesselbach <span className={`font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>| Área de Little</span>
              </h1>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border hidden sm:inline ${
                isDark ? 'bg-cyan-950 text-cyan-300 border-cyan-800' : 'bg-sky-50 text-sky-700 border-sky-200'
              }`}>
                Anatomía & Epistaxis
              </span>
            </div>
            <p className={`text-[11px] hidden md:block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Presentación médica interactiva & Guía anatómica clínica
            </p>
          </div>
        </div>

        {/* Quick Nav Shortcut & Theme Toggle Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* THEME SWITCHER BUTTON (Requested: Light Background) */}
          <button
            onClick={toggleTheme}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border shadow-sm ${
              isDark
                ? 'bg-slate-800 text-amber-300 hover:bg-slate-700 border-slate-700'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border-amber-300/80'
            }`}
            title={isDark ? 'Cambiar a Fondo Claro (Recomendado)' : 'Cambiar a Fondo Oscuro'}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px]">Fondo Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-700" />
                <span className="text-[11px]">Fondo Oscuro</span>
              </>
            )}
          </button>

          {/* Quick jump to Slide 1 (The Primary Slide) */}
          <button
            onClick={() => setCurrentSlide(1)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all border ${
              currentSlide === 1
                ? isDark
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-sky-100 text-sky-800 border-sky-300 shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 border-transparent'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Diapositiva Maestra</span>
          </button>

          {/* Quick jump to Canva Guide */}
          <button
            onClick={() => setCurrentSlide(6)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all border ${
              currentSlide === 6
                ? isDark
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-amber-100 text-amber-800 border-amber-300 shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-amber-300 border-transparent'
                : 'text-slate-600 hover:text-amber-700 border-transparent'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Guía Canva</span>
          </button>

          {/* Speaker notes trigger */}
          <button
            onClick={() => setIsNotesOpen(true)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all border ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
            title="Abrir guion del expositor y cronómetro"
          >
            <Mic className="w-3.5 h-3.5 text-cyan-500" />
            <span className="hidden sm:inline">Guion</span>
          </button>
        </div>
      </header>

      {/* MAIN 16:9 PRESENTATION STAGE */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-4 md:p-5 overflow-hidden">
        <div className={`w-full max-w-7xl aspect-[16/9] min-h-[540px] max-h-[92vh] rounded-2xl shadow-2xl border flex flex-col overflow-hidden relative transition-colors duration-200 ${
          isDark
            ? 'bg-[#0B192C] text-slate-100 border-slate-800'
            : 'bg-white text-slate-900 border-slate-200'
        }`}>
          {renderSlide()}
        </div>
      </main>

      {/* BOTTOM SLIDE CONTROLS & NAVIGATOR TOOLBAR */}
      <Toolbar
        currentSlide={currentSlide}
        onSelectSlide={(slideId) => setCurrentSlide(slideId)}
        onOpenNotes={() => setIsNotesOpen(true)}
      />

      {/* PRESENTER SPEAKER NOTES MODAL */}
      <PresenterModal
        currentSlide={currentSlide}
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
      />
    </div>
  );
}
