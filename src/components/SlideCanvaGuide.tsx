import React, { useState } from 'react';
import { CANVA_GUIDE_ITEMS } from '../data/slidesData';
import { Palette, Copy, Check, Search, Layers, Type, Sparkles, Download } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const SlideCanvaGuide: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedQuery, setCopiedQuery] = useState<string | null>(null);
  const { isDark } = useTheme();

  const copyToClipboard = (text: string, isHex: boolean) => {
    navigator.clipboard.writeText(text);
    if (isHex) {
      setCopiedHex(text);
      setTimeout(() => setCopiedHex(null), 2000);
    } else {
      setCopiedQuery(text);
      setTimeout(() => setCopiedQuery(null), 2000);
    }
  };

  return (
    <div className={`relative w-full h-full flex flex-col justify-between p-3 sm:p-5 lg:p-6 overflow-y-auto font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#0B192C] text-slate-100' : 'bg-white text-slate-900'
    }`}>
      {/* Background glow matching Slide 1 */}
      <div className={`absolute top-10 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-amber-500/10' : 'bg-amber-500/5'
      }`} />
      <div className={`absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/5'
      }`} />

      {/* Header matching Slide 1 */}
      <div className={`relative z-10 border-b pb-3 mb-3 transition-colors ${
        isDark ? 'border-slate-800/80' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
            isDark
              ? 'bg-amber-950/80 text-amber-300 border-amber-700/50'
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>
            <Palette className="w-3.5 h-3.5 text-amber-500" /> Canva Design System & Guía Oficial
          </span>
          <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
            isDark ? 'bg-[#102A43] text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}>
            Diapositiva 6 / 6
          </span>
        </div>
        <h1 className={`text-xl sm:text-2xl lg:text-3xl font-extrabold font-['Outfit'] tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Guía de Réplica en Canva & <span className="text-amber-500">Recursos Gráficos</span>
        </h1>
        <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Paleta cromática exacta de la Diapositiva 1, términos de búsqueda en inglés para vectores médicos y composición.
        </p>
      </div>

      {/* Grid of Sections */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 flex-1 items-stretch">
        {/* SECTION 1: Exact Hex Codes Palette */}
        <div className={`rounded-2xl border p-4 shadow-xl flex flex-col justify-between transition-colors ${
          isDark
            ? 'bg-[#102A43]/80 border-slate-700/80 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-md ring-1 ring-slate-200'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`p-1.5 rounded-lg border ${
                isDark ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                <Palette className="w-4 h-4 text-amber-500" />
              </span>
              <h2 className={`text-sm sm:text-base font-bold font-['Outfit'] ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                1. Paleta de Colores Oficial
              </h2>
            </div>
            <p className={`text-xs mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Haz clic en cualquier tarjeta para copiar el código HEX directamente a tu portapapeles.
            </p>

            <div className="space-y-2">
              {CANVA_GUIDE_ITEMS.colors.map((c) => {
                const isCopied = copiedHex === c.hex;
                return (
                  <button
                    key={c.hex}
                    onClick={() => copyToClipboard(c.hex, true)}
                    className={`w-full p-2 rounded-xl border flex items-center justify-between text-left transition-all group ${
                      isDark
                        ? 'bg-[#081829] hover:bg-[#0E253D] border-slate-800 hover:border-slate-700'
                        : 'bg-slate-50/80 hover:bg-slate-100 border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-5 h-5 rounded-lg shrink-0 border border-slate-400/40 shadow-sm group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div>
                        <div className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{c.name}</div>
                        <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{c.role}</div>
                      </div>
                    </div>

                    <div className={`flex items-center gap-1.5 font-mono text-xs font-semibold ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      <span>{c.hex}</span>
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className={`w-3.5 h-3.5 ${isDark ? 'text-slate-500 group-hover:text-slate-300' : 'text-slate-400 group-hover:text-slate-700'}`} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 2: Recommended Canva Search Terms */}
        <div className={`rounded-2xl border p-4 shadow-xl flex flex-col justify-between transition-colors ${
          isDark
            ? 'bg-[#102A43]/80 border-slate-700/80 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-md ring-1 ring-slate-200'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`p-1.5 rounded-lg border ${
                isDark ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' : 'bg-sky-50 text-sky-800 border-sky-200'
              }`}>
                <Search className="w-4 h-4 text-cyan-500" />
              </span>
              <h2 className={`text-sm sm:text-base font-bold font-['Outfit'] ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                2. Búsquedas Clave en Canva
              </h2>
            </div>
            <p className={`text-xs mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Pestaña <strong>Elementos</strong>. En inglés se obtienen vectores anatómicos de alta calidad:
            </p>

            <div className="space-y-2">
              {CANVA_GUIDE_ITEMS.searchKeywords.map((item) => {
                const isCopied = copiedQuery === item.en;
                return (
                  <button
                    key={item.en}
                    onClick={() => copyToClipboard(item.en, false)}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all group ${
                      isDark
                        ? 'bg-[#081829] hover:bg-[#0E253D] border-slate-800 hover:border-cyan-800/40'
                        : 'bg-slate-50/80 hover:bg-slate-100 border-slate-200 hover:border-sky-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold font-mono flex items-center gap-1.5 ${
                        isDark ? 'text-cyan-300' : 'text-sky-700'
                      }`}>
                        &quot;{item.en}&quot;
                      </span>
                      {isCopied ? (
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Copiado
                        </span>
                      ) : (
                        <Copy className={`w-3.5 h-3.5 ${isDark ? 'text-slate-500 group-hover:text-cyan-300' : 'text-slate-400 group-hover:text-sky-600'}`} />
                      )}
                    </div>
                    <div className={`text-[11px] font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item.es}</div>
                    <div className={`text-[10px] italic ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Uso: {item.use}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 3: Composition Checklist & Tips */}
        <div className={`rounded-2xl border p-4 shadow-xl flex flex-col justify-between transition-colors ${
          isDark
            ? 'bg-[#102A43]/80 border-slate-700/80 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-md ring-1 ring-slate-200'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`p-1.5 rounded-lg border ${
                isDark ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}>
                <Layers className="w-4 h-4 text-rose-500" />
              </span>
              <h2 className={`text-sm sm:text-base font-bold font-['Outfit'] ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                3. Pasos de Composición
              </h2>
            </div>
            <p className={`text-xs mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Secuencia recomendada para montar la diapositiva en 5 minutos:
            </p>

            <div className="space-y-2">
              {CANVA_GUIDE_ITEMS.stepByStep.map((s) => (
                <div key={s.step} className={`p-2 rounded-xl border text-xs ${
                  isDark ? 'bg-[#081829] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={`flex items-center gap-1.5 font-bold mb-0.5 ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    <span className={`w-4 h-4 rounded-full font-mono text-[10px] flex items-center justify-center ${
                      isDark ? 'bg-slate-800 text-amber-300' : 'bg-slate-200 text-amber-800'
                    }`}>
                      {s.step}
                    </span>
                    <span>{s.title}</span>
                  </div>
                  <p className={`text-[11px] leading-relaxed pl-5 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {s.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={`mt-3 p-2.5 rounded-xl border text-xs transition-colors ${
            isDark ? 'bg-slate-900/90 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <div className={`flex items-center gap-1.5 font-bold mb-0.5 ${
              isDark ? 'text-amber-300' : 'text-amber-800'
            }`}>
              <Type className="w-3.5 h-3.5" /> Tipografía Recomendada:
            </div>
            <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Títulos en <strong>Outfit</strong> o <strong>Montserrat</strong>. Texto de cuerpo en <strong>Plus Jakarta Sans</strong> o <strong>Inter</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Banner matching Slide 1 */}
      <div className={`relative z-10 mt-3 p-3 rounded-2xl border shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs transition-colors ${
        isDark
          ? 'bg-gradient-to-r from-[#102A43] via-[#143353] to-[#102A43] border-slate-700/60 text-slate-200'
          : 'bg-gradient-to-r from-slate-50 via-white to-slate-50 border-slate-200 text-slate-800 shadow-sm'
      }`}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            Esta presentación interactiva ya cuenta con todos los elementos nativos listos para proyectar en clases, auditorios o sesiones clínicas.
          </span>
        </div>
        <button
          onClick={() => window.print()}
          className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap shadow-sm transition-all hover:scale-[1.02] ${
            isDark
              ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
              : 'bg-sky-600 hover:bg-sky-500 text-white'
          }`}
        >
          <Download className="w-3.5 h-3.5" /> Imprimir / Guardar en PDF
        </button>
      </div>
    </div>
  );
};

