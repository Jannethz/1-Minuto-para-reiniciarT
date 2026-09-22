import React from 'react';
import { GitCompare, AlertOctagon, CheckCircle2, ShieldAlert, UserCheck, Flame } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const SlideAnteriorVsPosterior: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className={`relative w-full h-full flex flex-col justify-between p-3 sm:p-5 lg:p-6 overflow-y-auto font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#0B192C] text-slate-100' : 'bg-white text-slate-900'
    }`}>
      {/* Background ambient lighting matching Slide 1 */}
      <div className={`absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/5'
      }`} />
      <div className={`absolute bottom-10 right-10 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
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
            <GitCompare className="w-3.5 h-3.5 text-cyan-500" /> Diagnóstico Diferencial
          </span>
          <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
            isDark ? 'bg-[#102A43] text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}>
            Diapositiva 3 / 6
          </span>
        </div>
        <h1 className={`text-xl sm:text-2xl lg:text-3xl font-extrabold font-['Outfit'] tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Epistaxis <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>Anterior</span>{' '}
          <span className={`font-light text-base sm:text-xl ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>vs</span>{' '}
          <span className={isDark ? 'text-rose-400' : 'text-rose-600'}>Posterior</span>
        </h1>
        <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Correlación entre el Plexo de Kiesselbach (Área de Little) y el Plexo de Woodruff (Pared posterolateral).
        </p>
      </div>

      {/* Comparative Cards Matrix */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 flex-1 items-stretch">
        {/* EPISTAXIS ANTERIOR (KIESSELBACH) */}
        <div className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-between shadow-xl transition-colors ${
          isDark
            ? 'bg-gradient-to-b from-[#0B2538] to-[#081827] border-emerald-500/40 text-slate-100'
            : 'bg-gradient-to-b from-emerald-50/50 to-white border-emerald-300 text-slate-900 shadow-md ring-1 ring-emerald-200'
        }`}>
          <div>
            <div className={`flex items-center justify-between mb-3 border-b pb-2 ${
              isDark ? 'border-emerald-500/20' : 'border-emerald-200'
            }`}>
              <div>
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                  isDark ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  Frecuencia &gt; 90%
                </span>
                <h3 className={`text-base sm:text-lg font-bold font-['Outfit'] flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <CheckCircle2 className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} /> Epistaxis Anterior
                </h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                isDark
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300'
              }`}>
                Plexo de Kiesselbach
              </span>
            </div>

            <div className={`space-y-3 text-xs sm:text-sm ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <div className="flex items-start gap-2.5">
                <span className={`font-bold min-w-[95px] text-xs ${
                  isDark ? 'text-emerald-300' : 'text-emerald-800'
                }`}>Ubicación:</span>
                <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                  Tercio anteroinferior del tabique cartilaginoso (Área de Little). Visible a la rinoscopia simple sin endoscopio.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className={`font-bold min-w-[95px] text-xs ${
                  isDark ? 'text-emerald-300' : 'text-emerald-800'
                }`}>Población:</span>
                <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                  Niños, adolescentes y adultos jóvenes. Mayor incidencia en invierno o climas secos.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className={`font-bold min-w-[95px] text-xs ${
                  isDark ? 'text-emerald-300' : 'text-emerald-800'
                }`}>Etiología:</span>
                <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                  Traumatismo digital (hurgado nasal), aire seco, rinitis alérgica/infecciosa, microfisuras mucosas.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className={`font-bold min-w-[95px] text-xs ${
                  isDark ? 'text-emerald-300' : 'text-emerald-800'
                }`}>Clínica:</span>
                <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                  Salida unilateral por narina anterior; flujo de leve a moderado; cede habitualmente con compresión manual.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className={`font-bold min-w-[95px] text-xs ${
                  isDark ? 'text-emerald-300' : 'text-emerald-800'
                }`}>Manejo:</span>
                <span className={isDark ? 'text-emerald-200 font-medium' : 'text-emerald-900 font-medium'}>
                  Presión digital directa (Trotter) → Cauterización focal con AgNO₃ → Taponamiento anterior reabsorbible.
                </span>
              </div>
            </div>
          </div>

          <div className={`mt-4 p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
            isDark
              ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300'
              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}>
            <span className="flex items-center gap-1.5 font-semibold">
              <UserCheck className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} /> Manejo ambulatorio en el &gt;95%
            </span>
            <span className="font-mono text-[11px]">Baja morbimortalidad</span>
          </div>
        </div>

        {/* EPISTAXIS POSTERIOR (WOODRUFF) */}
        <div className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-between shadow-xl transition-colors ${
          isDark
            ? 'bg-gradient-to-b from-[#2B101C] to-[#16060D] border-rose-500/50 text-slate-100'
            : 'bg-gradient-to-b from-rose-50/50 to-white border-rose-300 text-slate-900 shadow-md ring-1 ring-rose-200'
        }`}>
          <div>
            <div className={`flex items-center justify-between mb-3 border-b pb-2 ${
              isDark ? 'border-rose-500/20' : 'border-rose-200'
            }`}>
              <div>
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                  isDark ? 'text-rose-400' : 'text-rose-700'
                }`}>
                  Frecuencia &lt; 10%
                </span>
                <h3 className={`text-base sm:text-lg font-bold font-['Outfit'] flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <AlertOctagon className={`w-5 h-5 ${isDark ? 'text-rose-400 animate-pulse' : 'text-rose-600'}`} /> Epistaxis Posterior
                </h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                isDark
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-rose-50 text-rose-800 border-rose-300'
              }`}>
                Plexo de Woodruff
              </span>
            </div>

            <div className={`space-y-3 text-xs sm:text-sm ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <div className="flex items-start gap-2.5">
                <span className={`font-bold min-w-[95px] text-xs ${
                  isDark ? 'text-rose-300' : 'text-rose-800'
                }`}>Ubicación:</span>
                <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                  Pared lateral posterior de la cavidad nasal, por debajo del extremo posterior del cornete medio/inferior.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className={`font-bold min-w-[95px] text-xs ${
                  isDark ? 'text-rose-300' : 'text-rose-800'
                }`}>Población:</span>
                <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                  Adultos mayores (&gt;50-60 años), antecedentes de hipertensión arterial severa y aterosclerosis.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className={`font-bold min-w-[95px] text-xs ${
                  isDark ? 'text-rose-300' : 'text-rose-800'
                }`}>Etiología:</span>
                <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                  Arteriopatía hipertensiva, coagulopatías, anticoagulación oral (ACO), neoplasias nasosinusales.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className={`font-bold min-w-[95px] text-xs ${
                  isDark ? 'text-rose-300' : 'text-rose-800'
                }`}>Clínica:</span>
                <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                  Salida masiva por orofaringe posterior (deglución y náuseas); no cede con pinzamiento anterior simple.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className={`font-bold min-w-[95px] text-xs ${
                  isDark ? 'text-rose-300' : 'text-rose-800'
                }`}>Manejo:</span>
                <span className={isDark ? 'text-rose-200 font-medium' : 'text-rose-900 font-medium'}>
                  Taponamiento posterior con sonda Foley/balón doble cámara → Ligadura endoscópica de A. Esfenopalatina (LEEP).
                </span>
              </div>
            </div>
          </div>

          <div className={`mt-4 p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
            isDark
              ? 'bg-rose-950/50 border-rose-800/50 text-rose-300'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            <span className="flex items-center gap-1.5 font-semibold">
              <ShieldAlert className={`w-4 h-4 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} /> Requiere hospitalización frecuente
            </span>
            <span className="font-mono text-[11px]">Riesgo de hipovolemia</span>
          </div>
        </div>
      </div>

      {/* Summary mnemonic banner matching Slide 1 */}
      <div className={`relative z-10 mt-3 rounded-2xl border p-3 sm:p-4 shadow-lg flex items-center justify-between transition-colors ${
        isDark
          ? 'bg-gradient-to-r from-[#102A43]/95 via-[#133353]/90 to-[#102A43]/95 border-slate-700/60 text-slate-200'
          : 'bg-gradient-to-r from-slate-50 via-white to-slate-50 border-slate-200 text-slate-800 shadow-sm'
      }`}>
        <div className="flex items-center gap-2.5 text-xs sm:text-sm">
          <div className={`p-1.5 rounded-xl border shrink-0 ${
            isDark
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-amber-50 text-amber-800 border-amber-300'
          }`}>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <strong className={isDark ? 'text-amber-200' : 'text-amber-900'}>Regla Nemotécnica de Urgencias:</strong> Si la sangre escurre por la orofaringe posterior a pesar de comprimir fuertemente las alas nasales hacia adelante, sospechar de inmediato <strong>epistaxis posterior</strong>.
          </div>
        </div>
      </div>
    </div>
  );
};

