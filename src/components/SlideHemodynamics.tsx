import React from 'react';
import { GitBranch, ShieldAlert, Zap, ArrowRight, HeartPulse } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const SlideHemodynamics: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className={`relative w-full h-full flex flex-col justify-between p-3 sm:p-5 lg:p-6 overflow-y-auto font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#0B192C] text-slate-100' : 'bg-white text-slate-900'
    }`}>
      {/* Background ambient lighting matching Slide 1 */}
      <div className={`absolute top-1/4 left-1/3 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/5'
      }`} />
      <div className={`absolute bottom-10 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-rose-500/10' : 'bg-rose-500/5'
      }`} />

      {/* Header matching Slide 1 */}
      <div className={`relative z-10 border-b pb-3 mb-3 transition-colors ${
        isDark ? 'border-slate-800/80' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
            isDark
              ? 'bg-cyan-950/80 text-cyan-300 border-cyan-700/50'
              : 'bg-sky-50 text-sky-800 border-sky-200'
          }`}>
            <GitBranch className="w-3.5 h-3.5 text-cyan-500" /> Fisiología Vascular & Hemodinámica
          </span>
          <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
            isDark ? 'bg-[#102A43] text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}>
            Diapositiva 2 / 6
          </span>
        </div>
        <h1 className={`text-xl sm:text-2xl lg:text-3xl font-extrabold font-['Outfit'] tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Arquitectura Dual:{' '}
          <span className={isDark ? 'text-cyan-400' : 'text-sky-600'}>Carótida Interna</span>{' '}
          <span className={`font-light text-base sm:text-xl ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>vs</span>{' '}
          <span className={isDark ? 'text-rose-400' : 'text-rose-600'}>Carótida Externa</span>
        </h1>
        <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          La mucosa septal anterior es el punto de encuentro embriológico y hemodinámico de dos circulaciones mayores.
        </p>
      </div>

      {/* Main Dual System Split Cards */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 flex-1 items-stretch">
        {/* CARÓTIDA INTERNA CARD */}
        <div className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-between shadow-xl transition-colors ${
          isDark
            ? 'bg-gradient-to-b from-[#0F2742] to-[#0A1A2E] border-cyan-500/40 text-slate-100'
            : 'bg-gradient-to-b from-sky-50/50 to-white border-sky-300 text-slate-900 shadow-md ring-1 ring-sky-200'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" />
                <h3 className={`text-base sm:text-lg font-bold font-['Outfit'] ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Sistema Carótida Interna (SCI)
                </h3>
              </div>
              <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                isDark
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
                  : 'bg-sky-100 text-sky-800 border-sky-300 font-semibold'
              }`}>
                1 Arteria Tributaria
              </span>
            </div>

            <p className={`text-xs mb-4 leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Origen intracraneal de alta presión. Su flujo transita por la fosa craneal anterior antes de atravesar el techo cribiforme etmoidal.
            </p>

            {/* Artery Item */}
            <div className={`rounded-xl p-3.5 border mb-3 transition-colors ${
              isDark ? 'bg-[#081829] border-cyan-900/60' : 'bg-white border-sky-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className={`font-bold text-sm ${isDark ? 'text-cyan-300' : 'text-sky-800'}`}>
                  Arteria Etmoidal Anterior
                </span>
                <span className={`text-[11px] font-mono ${isDark ? 'text-cyan-400/80' : 'text-sky-600'}`}>
                  Ø ~ 1.2 - 1.5 mm
                </span>
              </div>
              <div className={`text-xs space-y-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <div className="flex items-center gap-1.5">
                  <ArrowRight className={`w-3 h-3 shrink-0 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                  <span><strong>Trayecto:</strong> Carótida Interna → A. Oftálmica → Agujero Etmoidal Ant.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ArrowRight className={`w-3 h-3 shrink-0 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                  <span><strong>Territorio:</strong> Techo etmoidal y tercio anterosuperior del tabique.</span>
                </div>
              </div>
            </div>

            {/* Clinical Pearl */}
            <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
              isDark
                ? 'bg-cyan-950/40 border-cyan-800/40 text-cyan-200'
                : 'bg-sky-50 border-sky-200 text-sky-900'
            }`}>
              <Zap className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
              <div>
                <strong>Relevancia en Trauma:</strong> Fracturas del complejo nasoetmoidoorbitario o de base de cráneo anterior pueden seccionar esta arteria, requiriendo abordaje quirúrgico etmoidal.
              </div>
            </div>
          </div>

          <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono ${
            isDark ? 'border-cyan-900/40 text-cyan-400' : 'border-sky-200 text-sky-700'
          }`}>
            <span>Presión media en confluencia: ~65-75 mmHg</span>
            <span className="font-semibold">Flujo descendente</span>
          </div>
        </div>

        {/* CARÓTIDA EXTERNA CARD */}
        <div className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-between shadow-xl transition-colors ${
          isDark
            ? 'bg-gradient-to-b from-[#2B1424] to-[#140A12] border-rose-500/40 text-slate-100'
            : 'bg-gradient-to-b from-rose-50/50 to-white border-rose-300 text-slate-900 shadow-md ring-1 ring-rose-200'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF3366] shadow-[0_0_10px_#FF3366]" />
                <h3 className={`text-base sm:text-lg font-bold font-['Outfit'] ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Sistema Carótida Externa (SCE)
                </h3>
              </div>
              <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                isDark
                  ? 'bg-rose-950 text-rose-300 border-rose-700'
                  : 'bg-rose-100 text-rose-800 border-rose-300 font-semibold'
              }`}>
                3 Arterias Tributarias
              </span>
            </div>

            <p className={`text-xs mb-4 leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Sistema extracraneal de mayor volumen. Aporta el 85-90% de la irrigación de las cavidades nasales a través de ramas de la Maxilar y Facial.
            </p>

            {/* 3 Arteries List */}
            <div className="space-y-2 mb-3">
              <div className={`rounded-xl p-2.5 border transition-colors ${
                isDark ? 'bg-[#1A0B16] border-rose-900/60' : 'bg-white border-rose-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className={isDark ? 'text-rose-300' : 'text-rose-700'}>1. Arteria Esfenopalatina</span>
                  <span className={`text-[10px] font-mono ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>Rama terminal A. Maxilar</span>
                </div>
                <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Vaso de mayor calibre; emerge del foramen homónimo y cruza el tabique en abanico anterior.
                </p>
              </div>

              <div className={`rounded-xl p-2.5 border transition-colors ${
                isDark ? 'bg-[#1A0B16] border-rose-900/60' : 'bg-white border-rose-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className={isDark ? 'text-rose-300' : 'text-rose-700'}>2. Arteria Palatina Mayor</span>
                  <span className={`text-[10px] font-mono ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>Conducto Incisivo</span>
                </div>
                <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Proviene del paladar duro, asciende e irriga el piso del tabique cartilaginoso.
                </p>
              </div>

              <div className={`rounded-xl p-2.5 border transition-colors ${
                isDark ? 'bg-[#1A0B16] border-rose-900/60' : 'bg-white border-rose-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className={isDark ? 'text-rose-300' : 'text-rose-700'}>3. Arteria Labial Superior (rama septal)</span>
                  <span className={`text-[10px] font-mono ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>Rama de A. Facial</span>
                </div>
                <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Asciende desde la columela y el vestíbulo nasal; blanco de la compresión digital externa.
                </p>
              </div>
            </div>

            {/* Clinical Pearl */}
            <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
              isDark
                ? 'bg-rose-950/40 border-rose-800/40 text-rose-200'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              <ShieldAlert className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
              <div>
                <strong>Diana Quirúrgica:</strong> La ligadura de la arteria esfenopalatina (LEEP) vía endoscopia transnasal es el estándar de oro para sangrados intratables originados en este sistema.
              </div>
            </div>
          </div>

          <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono ${
            isDark ? 'border-rose-900/40 text-rose-400' : 'border-rose-200 text-rose-700'
          }`}>
            <span>Aporte volumétrico: ~85% del lecho nasal</span>
            <span className="font-semibold">Flujos convergentes</span>
          </div>
        </div>
      </div>

      {/* Confluence Callout at Bottom matching Slide 1 */}
      <div className={`relative z-10 mt-3 rounded-2xl border p-3 sm:p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 transition-colors ${
        isDark
          ? 'bg-gradient-to-r from-[#102A43]/95 via-[#133353]/90 to-[#102A43]/95 border-slate-700/60'
          : 'bg-gradient-to-r from-slate-50 via-white to-slate-50 border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl border shrink-0 ${
            isDark
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-amber-50 text-amber-800 border-amber-300'
          }`}>
            <HeartPulse className="w-5 h-5 text-amber-500 animate-pulse" />
          </div>
          <div>
            <h4 className={`text-xs sm:text-sm font-bold font-['Outfit'] ${
              isDark ? 'text-amber-200' : 'text-amber-900'
            }`}>
              ¿Por qué el Plexo de Kiesselbach sangra con tanta facilidad?
            </h4>
            <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              La confluencia de flujos opuestos en una mucosa delgada (&lt; 0.5 mm) sobre soporte cartilaginoso rígido impide la retracción elástica natural del vaso roto.
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full font-bold text-xs whitespace-nowrap border shrink-0 ${
          isDark
            ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_12px_rgba(255,209,102,0.4)]'
            : 'bg-amber-500 text-white border-amber-600 shadow-sm'
        }`}>
          Zona de Alto Estrés Mecánico
        </span>
      </div>
    </div>
  );
};

