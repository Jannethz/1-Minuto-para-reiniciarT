import React, { useState } from 'react';
import { PieChart, BarChart3, Info, CheckCircle2, AlertOctagon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface EpistaxisIncidenceChartProps {
  compact?: boolean;
}

export const EpistaxisIncidenceChart: React.FC<EpistaxisIncidenceChartProps> = ({ compact = false }) => {
  const [chartMode, setChartMode] = useState<'donut' | 'bars'>('donut');
  const [selectedType, setSelectedType] = useState<'anterior' | 'posterior' | null>(null);
  const { isDark } = useTheme();

  // Epidemiological clinical data
  const data = {
    anterior: {
      percentage: 92,
      label: 'Epistaxis Anterior',
      sublabel: 'Plexo de Kiesselbach (Área de Little)',
      system: 'Predominio Carótida Externa',
      systemDetail: '3 de 4 ramas nutricias (Esfenopalatina, Palatina Mayor, Labial Sup.)',
      color: '#FF3366', // Defined Red for External Carotid
      colorLight: 'rgba(255, 51, 102, 0.25)',
      colorBorder: 'rgba(255, 51, 102, 0.6)',
      textColor: isDark ? 'text-rose-400' : 'text-rose-600',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      clinicalImpact: 'Frecuente en niños y jóvenes. Benigna, accesible a compresión digital.',
      resolution: '90% cede con Maniobra de Trotter o cauterio químico.',
    },
    posterior: {
      percentage: 8,
      label: 'Epistaxis Posterior',
      sublabel: 'Plexo de Woodruff / Ramas profundas',
      system: 'Carótida Interna & Ramas Profundas',
      systemDetail: 'A. Etmoidal Post. (C. Interna) y ramas terminales profundas',
      color: '#00B8D9', // Vibrant cyan/blue
      colorLight: 'rgba(0, 184, 217, 0.25)',
      colorBorder: 'rgba(0, 184, 217, 0.6)',
      textColor: isDark ? 'text-cyan-400' : 'text-sky-600',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      clinicalImpact: 'Frecuente en adultos mayores e hipertensos. Sangrado profuso a faringe.',
      resolution: 'Riesgo de aspiración; requiere taponamiento posterior o cirugía.',
    },
  };

  // SVG Donut calculation: Circumference = 2 * PI * r (r = 42)
  const radius = 42;
  const circumference = 2 * Math.PI * radius; // ~263.89
  const anteriorStroke = (data.anterior.percentage / 100) * circumference;
  const posteriorStroke = (data.posterior.percentage / 100) * circumference;
  const strokeWidth = 14;

  const currentInfo = selectedType ? data[selectedType] : null;

  return (
    <div className={`rounded-xl border p-3 flex flex-col justify-between shadow-md relative overflow-hidden backdrop-blur-sm transition-colors duration-200 ${
      isDark ? 'bg-[#091B2F]/90 border-slate-700/80 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
    }`}>
      {/* Subtle ambient backglow */}
      <div
        className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl pointer-events-none transition-all duration-500"
        style={{
          background: selectedType === 'posterior' ? 'rgba(0, 184, 217, 0.15)' : 'rgba(255, 51, 102, 0.15)',
        }}
      />

      {/* Header with Title and Mode Switcher */}
      <div className={`flex items-center justify-between gap-2 mb-2 pb-1.5 border-b ${
        isDark ? 'border-slate-800' : 'border-slate-100'
      }`}>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className={`text-xs font-bold font-['Outfit'] tracking-wide uppercase ${
            isDark ? 'text-slate-200' : 'text-slate-900'
          }`}>
            Incidencia Clínica
          </span>
          <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border hidden sm:inline ${
            isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}>
            Anterior vs Posterior
          </span>
        </div>

        {/* Donut vs Bar chart toggle */}
        <div className={`flex items-center rounded-lg p-0.5 border text-[10px] ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setChartMode('donut')}
            className={`px-2 py-0.5 rounded flex items-center gap-1 transition-all ${
              chartMode === 'donut'
                ? isDark
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-white text-sky-800 border border-slate-200 shadow-xs font-semibold'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Vista de gráfico circular / donut"
          >
            <PieChart className="w-3 h-3" />
            <span>Circular</span>
          </button>
          <button
            onClick={() => setChartMode('bars')}
            className={`px-2 py-0.5 rounded flex items-center gap-1 transition-all ${
              chartMode === 'bars'
                ? isDark
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
                  : 'bg-white text-rose-800 border border-slate-200 shadow-xs font-semibold'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Vista de gráfico de barras comparativas"
          >
            <BarChart3 className="w-3 h-3" />
            <span>Barras</span>
          </button>
        </div>
      </div>

      {/* MAIN VISUALIZATION AREA */}
      {chartMode === 'donut' ? (
        /* CIRCULAR / DONUT VIEW */
        <div className="flex items-center gap-3 py-1">
          {/* SVG Donut */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 110 110" className="w-full h-full -rotate-90 transform">
              {/* Background track circle */}
              <circle
                cx="55"
                cy="55"
                r={radius}
                fill="none"
                stroke={isDark ? '#1B3552' : '#E2E8F0'}
                strokeWidth={strokeWidth}
                opacity={isDark ? 0.4 : 1}
              />

              {/* Segment 1: Anterior (>90%) - External Carotid RED */}
              <circle
                cx="55"
                cy="55"
                r={radius}
                fill="none"
                stroke={data.anterior.color}
                strokeWidth={selectedType === 'anterior' ? strokeWidth + 3 : strokeWidth}
                strokeDasharray={`${anteriorStroke} ${circumference}`}
                strokeDashoffset="0"
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-300 hover:opacity-100"
                style={{
                  opacity: selectedType === 'posterior' ? 0.35 : 1,
                  filter:
                    selectedType === 'anterior'
                      ? 'drop-shadow(0 0 8px rgba(255, 51, 102, 0.8))'
                      : 'drop-shadow(0 0 3px rgba(255, 51, 102, 0.3))',
                }}
                onMouseEnter={() => setSelectedType('anterior')}
                onClick={() => setSelectedType(selectedType === 'anterior' ? null : 'anterior')}
              />

              {/* Segment 2: Posterior (<10%) - Internal Carotid LIGHT BLUE */}
              <circle
                cx="55"
                cy="55"
                r={radius}
                fill="none"
                stroke={data.posterior.color}
                strokeWidth={selectedType === 'posterior' ? strokeWidth + 3 : strokeWidth}
                strokeDasharray={`${posteriorStroke} ${circumference}`}
                strokeDashoffset={-anteriorStroke}
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-300 hover:opacity-100"
                style={{
                  opacity: selectedType === 'anterior' ? 0.35 : 1,
                  filter:
                    selectedType === 'posterior'
                      ? 'drop-shadow(0 0 8px rgba(0, 184, 217, 0.8))'
                      : 'drop-shadow(0 0 3px rgba(0, 184, 217, 0.3))',
                }}
                onMouseEnter={() => setSelectedType('posterior')}
                onClick={() => setSelectedType(selectedType === 'posterior' ? null : 'posterior')}
              />
            </svg>

            {/* Donut Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className={`text-base sm:text-lg font-black font-['Outfit'] leading-none ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {selectedType === 'posterior' ? '<10%' : '>90%'}
              </span>
              <span
                className={`text-[9px] font-mono uppercase font-bold tracking-tight ${
                  selectedType === 'posterior'
                    ? isDark ? 'text-cyan-400' : 'text-sky-600'
                    : isDark ? 'text-rose-400' : 'text-rose-600'
                }`}
              >
                {selectedType === 'posterior' ? 'Posterior' : 'Anterior'}
              </span>
            </div>
          </div>

          {/* Interactive Legend & System Mapping */}
          <div className="flex-1 flex flex-col justify-center gap-1.5 text-xs">
            {/* Anterior Item */}
            <div
              onMouseEnter={() => setSelectedType('anterior')}
              onClick={() => setSelectedType(selectedType === 'anterior' ? null : 'anterior')}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                selectedType === 'anterior'
                  ? isDark
                    ? 'bg-rose-950/40 border-rose-500/80 shadow-sm'
                    : 'bg-rose-50 border-rose-400 shadow-xs ring-1 ring-rose-200'
                  : isDark
                  ? 'bg-slate-900/50 border-slate-800/80 hover:border-rose-500/40'
                  : 'bg-slate-50 border-slate-200 hover:border-rose-300'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-[0_0_8px_rgba(255,51,102,0.8)]"
                    style={{ backgroundColor: data.anterior.color }}
                  />
                  <span className={`font-bold text-[11px] font-['Outfit'] ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Epistaxis Anterior
                  </span>
                </div>
                <span className={`font-mono font-bold text-xs ${
                  isDark ? 'text-rose-400' : 'text-rose-600'
                }`}>
                  &gt;90%
                </span>
              </div>
              <div className={`flex items-center gap-1 text-[10px] ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <span className={`font-medium ${isDark ? 'text-rose-300/90' : 'text-rose-700'}`}>
                  Carótida Externa
                </span>
                <span className={`hidden sm:inline ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  (Plexo Kiesselbach)
                </span>
              </div>
            </div>

            {/* Posterior Item */}
            <div
              onMouseEnter={() => setSelectedType('posterior')}
              onClick={() => setSelectedType(selectedType === 'posterior' ? null : 'posterior')}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                selectedType === 'posterior'
                  ? isDark
                    ? 'bg-cyan-950/40 border-cyan-500/80 shadow-sm'
                    : 'bg-sky-50 border-sky-400 shadow-xs ring-1 ring-sky-200'
                  : isDark
                  ? 'bg-slate-900/50 border-slate-800/80 hover:border-cyan-500/40'
                  : 'bg-slate-50 border-slate-200 hover:border-sky-300'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-[0_0_8px_rgba(0,184,217,0.8)]"
                    style={{ backgroundColor: data.posterior.color }}
                  />
                  <span className={`font-bold text-[11px] font-['Outfit'] ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Epistaxis Posterior
                  </span>
                </div>
                <span className={`font-mono font-bold text-xs ${
                  isDark ? 'text-cyan-400' : 'text-sky-600'
                }`}>
                  &lt;10%
                </span>
              </div>
              <div className={`flex items-center gap-1 text-[10px] ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                <span className={`font-medium ${isDark ? 'text-cyan-300/90' : 'text-sky-700'}`}>
                  Carótida Interna
                </span>
                <span className={`hidden sm:inline ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  (Plexo Woodruff / Prof.)
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* BAR CHART VIEW */
        <div className="py-1 space-y-2">
          {/* Anterior Bar */}
          <div
            onMouseEnter={() => setSelectedType('anterior')}
            onClick={() => setSelectedType(selectedType === 'anterior' ? null : 'anterior')}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              selectedType === 'anterior'
                ? isDark
                  ? 'bg-rose-950/40 border-rose-500/80'
                  : 'bg-rose-50 border-rose-400 ring-1 ring-rose-200'
                : isDark
                ? 'bg-slate-900/40 border-slate-800'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-medium mb-1">
              <span className={`font-['Outfit'] flex items-center gap-1.5 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                <span className="w-2 h-2 rounded-full bg-[#FF3366] shadow-[0_0_6px_#FF3366]" />
                Epistaxis Anterior <span className={`text-[10px] font-mono ${isDark ? 'text-rose-300' : 'text-rose-700'}`}>(Carótida Externa)</span>
              </span>
              <span className={`font-mono font-bold text-xs ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                &gt;90% (92%)
              </span>
            </div>
            {/* Bar track and progress fill */}
            <div className={`w-full h-3 rounded-full overflow-hidden p-0.5 border ${
              isDark ? 'bg-slate-800 border-slate-700/50' : 'bg-slate-200 border-slate-300'
            }`}>
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-[#FF3366] transition-all duration-700 shadow-[0_0_10px_rgba(255,51,102,0.6)]"
                style={{ width: '92%' }}
              />
            </div>
            <div className={`flex justify-between items-center mt-1 text-[9px] ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <span>Plexo de Kiesselbach / Área de Little</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Manejo ambulatorio frecuente</span>
            </div>
          </div>

          {/* Posterior Bar */}
          <div
            onMouseEnter={() => setSelectedType('posterior')}
            onClick={() => setSelectedType(selectedType === 'posterior' ? null : 'posterior')}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              selectedType === 'posterior'
                ? isDark
                  ? 'bg-cyan-950/40 border-cyan-500/80'
                  : 'bg-sky-50 border-sky-400 ring-1 ring-sky-200'
                : isDark
                ? 'bg-slate-900/40 border-slate-800'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-medium mb-1">
              <span className={`font-['Outfit'] flex items-center gap-1.5 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                <span className="w-2 h-2 rounded-full bg-[#00B8D9] shadow-[0_0_6px_#00B8D9]" />
                Epistaxis Posterior <span className={`text-[10px] font-mono ${isDark ? 'text-cyan-300' : 'text-sky-700'}`}>(Carótida Interna / Prof.)</span>
              </span>
              <span className={`font-mono font-bold text-xs ${isDark ? 'text-cyan-400' : 'text-sky-600'}`}>
                &lt;10% (8%)
              </span>
            </div>
            {/* Bar track and progress fill */}
            <div className={`w-full h-3 rounded-full overflow-hidden p-0.5 border ${
              isDark ? 'bg-slate-800 border-slate-700/50' : 'bg-slate-200 border-slate-300'
            }`}>
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-[#00B8D9] transition-all duration-700 shadow-[0_0_10px_rgba(0,184,217,0.6)]"
                style={{ width: '12%' }}
              />
            </div>
            <div className={`flex justify-between items-center mt-1 text-[9px] ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <span>Plexo de Woodruff / A. Esfenopalatina post.</span>
              <span className="text-amber-600 dark:text-amber-400 font-medium">Requiere urgencia hospitalaria</span>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Quick Clinician Note / Callout */}
      <div className={`mt-1.5 pt-1.5 border-t flex items-center justify-between text-[10px] ${
        isDark ? 'border-slate-800/80' : 'border-slate-100'
      }`}>
        {currentInfo ? (
          <div className={`flex items-center gap-1.5 animate-fadeIn ${
            isDark ? 'text-slate-200' : 'text-slate-800'
          }`}>
            {selectedType === 'anterior' ? (
              <CheckCircle2 className="w-3 h-3 text-rose-500 shrink-0" />
            ) : (
              <AlertOctagon className="w-3 h-3 text-sky-500 shrink-0" />
            )}
            <span className="font-medium truncate">
              <strong className={currentInfo.textColor}>{currentInfo.label}:</strong> {currentInfo.clinicalImpact}
            </span>
          </div>
        ) : (
          <div className={`flex items-center justify-between w-full ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <span className="flex items-center gap-1 text-[10px]">
              <Info className="w-3 h-3 text-cyan-500 shrink-0" />
              Haz clic para ver correlación vascular y terapéutica
            </span>
            <span className="font-mono text-[9px] text-slate-400 hidden sm:inline">
              IC 95% (ORL 2024)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

