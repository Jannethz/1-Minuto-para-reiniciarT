import React, { useState, useEffect } from 'react';
import { X, Clock, Play, Pause, RotateCcw, Mic, Lightbulb, ChevronRight } from 'lucide-react';

interface PresenterModalProps {
  currentSlide: number;
  isOpen: boolean;
  onClose: () => void;
}

const SPEAKER_NOTES: { [key: number]: { title: string; bullets: string[]; durationMin: number } } = {
  1: {
    title: 'Diapositiva Magistral: Plexo de Kiesselbach',
    bullets: [
      'Iniciar captando la atención: "El 90-95% de las hemorragias nasales que veremos en urgencias y consulta externa ocurren en este punto milimétrico: el Área de Little o Plexo de Kiesselbach".',
      'Mostrar el gráfico comparativo en el Bloque Clínico Inferior: "Observen la gráfica interactiva circular y de barras: más del 90% (rojo) responde a la afluencia de la Carótida Externa en el plexo anterior, mientras que menos del 10% (azul claro) es posterior profunda".',
      'Destacar la dualidad arterial: "Es una encrucijada fascinante donde convergen dos grandes imperios vasculares: la Carótida Interna (arriba) y la Carótida Externa (atrás y abajo)".',
      'Señalar la A. Etmoidal Anterior (Cian): "Única rama de la Carótida Interna vía A. Oftálmica; desciende por la lámina cribosa".',
      'Señalar las 3 de la Carótida Externa (Rojas): "La Esfenopalatina (la más caudalosa, rama de la Maxilar), la Palatina Mayor (que asciende por el conducto incisivo) y la Labial Superior (rama septal de la Facial)".',
      'Rematar con la clínica: "La mucosa aquí es tan fina y el cartílago tan rígido que el vaso roto no puede retraerse. Por eso la compresión digital directa de las alas nasales salva vidas en segundos".'
    ],
    durationMin: 3,
  },
  2: {
    title: 'Árbol Hemodinámico: SCI vs SCE',
    bullets: [
      'Explicar el gradiente tensional: el sistema de la Carótida Interna maneja presiones intracraneales pulsátiles altas.',
      'La arteria esfenopalatina aporta casi el 85% de la perfusión nasal global.',
      'Mencionar la relevancia quirúrgica: si un sangrado anterior no cede y es masivo, el vaso dominante tributario a nivel de la pared lateral es la esfenopalatina, candidata a ligadura endoscópica.'
    ],
    durationMin: 2,
  },
  3: {
    title: 'Diagnóstico Diferencial: Epistaxis Anterior vs Posterior',
    bullets: [
      'Contrastar pacientes prototípicos: Niño con rinitis o hurgado nasal (Anterior, Kiesselbach) vs Anciano hipertenso con arteriosclerosis y sangre en orofaringe (Posterior, Woodruff).',
      'Subrayar la trampa clínica: Comprimir la nariz en una epistaxis posterior NO la detiene, solo desvía el flujo masivo a la vía aérea y al estómago, induciendo vómito hemático y broncoaspiración.',
      'Taponamiento anterior vs posterior con balón.'
    ],
    durationMin: 2,
  },
  4: {
    title: 'Algoritmo de Urgencias: Secuencia de 5 Fases',
    bullets: [
      'Fase 1: Enfatizar la posición de Trotter: cabeza hacia adelante, nunca hacia atrás.',
      'Fase 2: Vasoconstrictor + anestésico tópico por 5-10 min para permitir visibilidad.',
      'Fase 3: Cauterio con Nitrato de Plata concéntrico. ADVERTENCIA CAPITAL: Jamás cauterizar ambos lados del tabique a la misma altura por riesgo de perforación septal.',
      'Fase 4: Taponamiento anterior (Merocel o gasa vaselinada) por 48-72 h con antibiótico preventivo.'
    ],
    durationMin: 3,
  },
  5: {
    title: 'Evaluación & Debate con la Audiencia',
    bullets: [
      'Invitar al público a participar en voz alta o levantar la mano para responder.',
      'Reforzar los 4 conceptos clave evaluados en el examen.',
      'Reconocer aciertos y aclarar dudas frecuentes.'
    ],
    durationMin: 2,
  },
  6: {
    title: 'Guía de Diseño en Canva',
    bullets: [
      'Proporcionar los códigos HEX y términos de búsqueda para quien desee crear infografías o pósteres científicos para congresos.',
      'Compartir la opción de exportar e imprimir en PDF.'
    ],
    durationMin: 1,
  },
};

export const PresenterModal: React.FC<PresenterModalProps> = ({ currentSlide, isOpen, onClose }) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timer: any = null;
    if (isRunning && isOpen) {
      timer = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isOpen]);

  if (!isOpen) return null;

  const notes = SPEAKER_NOTES[currentSlide] || SPEAKER_NOTES[1];

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#102A43] to-[#0A1A2E] rounded-2xl border border-cyan-500/50 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
              <Mic className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                Modo Presentador & Guion del Orador
              </h2>
              <p className="text-xs text-slate-400">
                Diapositiva {currentSlide} de 6: {notes.title}
              </p>
            </div>
          </div>

          {/* Chronometer */}
          <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-sm font-bold text-cyan-300">
              {formatTime(secondsElapsed)}
            </span>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="p-1 hover:text-cyan-300 text-slate-400"
              title={isRunning ? 'Pausar cronómetro' : 'Reanudar cronómetro'}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setSecondsElapsed(0)}
              className="p-1 hover:text-rose-300 text-slate-400"
              title="Reiniciar cronómetro"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bullets Content */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          <div className="flex items-center justify-between text-xs text-amber-300 font-semibold mb-1">
            <span className="flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" /> Puntos sugeridos para tu discurso:
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Tiempo estimado: ~{notes.durationMin} min
            </span>
          </div>

          <div className="space-y-2.5">
            {notes.bullets.map((bullet, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#091829] border border-slate-800 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5 leading-relaxed"
              >
                <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Usa las flechas del teclado (← / →) para cambiar de diapositiva.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-colors"
          >
            Cerrar Guion
          </button>
        </div>
      </div>
    </div>
  );
};
