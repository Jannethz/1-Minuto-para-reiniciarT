import React, { useState } from 'react';
import { AnatomyDiagram } from './AnatomyDiagram';
import { EpistaxisIncidenceChart } from './EpistaxisIncidenceChart';
import { ARTERIES_DATA, CLINICAL_POINTS_DATA } from '../data/slidesData';
import { ArteryInfo } from '../types';
import { useTheme } from '../context/ThemeContext';
import { MapPin, AlertTriangle, Stethoscope, Activity, Sparkles, Info, X, ChevronRight, Droplets, Eye } from 'lucide-react';

interface SlideMasterAnatomyProps {
  showControls?: boolean;
}

export const SlideMasterAnatomy: React.FC<SlideMasterAnatomyProps> = () => {
  const [selectedArtery, setSelectedArtery] = useState<ArteryInfo | null>(null);
  const [filterSystem, setFilterSystem] = useState<'all' | 'interna' | 'externa'>('all');
  const [showBloodFlow, setShowBloodFlow] = useState(true);
  const [simulateBleeding, setSimulateBleeding] = useState(false);
  const [activeClinicalDetail, setActiveClinicalDetail] = useState<string | null>(null);
  const { isDark } = useTheme();

  const getClinicalIcon = (name: string) => {
    switch (name) {
      case 'MapPin':
        return <MapPin className={`w-5 h-5 shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />;
      case 'AlertTriangle':
        return <AlertTriangle className={`w-5 h-5 shrink-0 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />;
      case 'Stethoscope':
        return <Stethoscope className={`w-5 h-5 shrink-0 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />;
      default:
        return <Info className={`w-5 h-5 shrink-0 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />;
    }
  };

  return (
    <div className={`relative w-full h-full flex flex-col justify-between p-3 sm:p-5 lg:p-6 overflow-y-auto font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#0B192C] text-slate-100' : 'bg-white text-slate-900'
    }`}>
      {/* Background ambient lighting */}
      <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/5'
      }`} />
      <div className={`absolute bottom-10 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-rose-500/10' : 'bg-rose-500/5'
      }`} />

      {/* TOP HEADER: Clean, high-impact medical display */}
      <div className={`relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-3 transition-colors ${
        isDark ? 'border-slate-800/80' : 'border-slate-200'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
              isDark
                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-700/50'
                : 'bg-sky-50 text-sky-800 border-sky-200'
            }`}>
              <Activity className="w-3.5 h-3.5 text-cyan-500" /> Anatomía Quirúrgica & ORL
            </span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
              isDark
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                : 'bg-amber-50 text-amber-800 border-amber-300'
            }`}>
              <Sparkles className="w-3 h-3 text-amber-500" /> Área de Little
            </span>
          </div>
          <h1 className={`text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight font-['Outfit'] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Irrigación del Tabique Nasal y{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-cyan-500 font-extrabold">
              Plexo de Kiesselbach
            </span>
          </h1>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Anastomosis arterial cuádruple: Confluencia de los sistemas Carótida Interna y Carótida Externa
          </p>
        </div>

        {/* Dynamic Filters & Toggles */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Carotid Filter Selector */}
          <div className={`flex items-center p-1 rounded-xl border text-xs shadow-sm transition-colors ${
            isDark ? 'bg-[#102A43]/90 border-slate-700/70' : 'bg-slate-100 border-slate-300'
          }`}>
            <button
              onClick={() => setFilterSystem('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                filterSystem === 'all'
                  ? isDark
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas (4)
            </button>
            <button
              onClick={() => setFilterSystem('interna')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                filterSystem === 'interna'
                  ? isDark
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                    : 'bg-sky-600 text-white font-semibold shadow-sm'
                  : isDark
                  ? 'text-cyan-400 hover:bg-cyan-950/40'
                  : 'text-sky-700 hover:bg-sky-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] dark:bg-[#00F0FF]" /> C. Interna (1)
            </button>
            <button
              onClick={() => setFilterSystem('externa')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                filterSystem === 'externa'
                  ? isDark
                    ? 'bg-rose-500 text-white font-semibold shadow-[0_0_12px_rgba(255,51,102,0.4)]'
                    : 'bg-rose-600 text-white font-semibold shadow-sm'
                  : isDark
                  ? 'text-rose-400 hover:bg-rose-950/40'
                  : 'text-rose-700 hover:bg-rose-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#FF3366]" /> C. Externa (3)
            </button>
          </div>

          {/* Blood Flow Animation Switch */}
          <button
            onClick={() => setShowBloodFlow(!showBloodFlow)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all shadow-sm ${
              showBloodFlow
                ? isDark
                  ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300'
                  : 'bg-sky-50 border-sky-300 text-sky-800'
                : isDark
                ? 'bg-slate-800/60 border-slate-700 text-slate-400'
                : 'bg-slate-100 border-slate-300 text-slate-600'
            }`}
            title="Activar/desactivar pulsos dinámicos de flujo vascular"
          >
            <Droplets className={`w-3.5 h-3.5 ${showBloodFlow ? (isDark ? 'text-cyan-400 animate-pulse' : 'text-sky-600 animate-pulse') : ''}`} />
            <span className="hidden sm:inline">Flujo</span>
          </button>
        </div>
      </div>

      {/* CENTER WORKSPACE: Visual Diagram + Artery Quick Cards */}
      <div className="relative z-10 flex-1 my-2 min-h-[310px] max-h-[520px] w-full">
        <AnatomyDiagram
          selectedArteryId={selectedArtery?.id || null}
          onSelectArtery={(artery) => setSelectedArtery(artery)}
          filterSystem={filterSystem}
          showBloodFlow={showBloodFlow}
          simulateBleeding={simulateBleeding}
          onToggleBleeding={() => setSimulateBleeding(!simulateBleeding)}
          zoomActive={true}
        />
      </div>

      {/* BOTTOM CLINICAL CORRELATION BLOCK */}
      <div className={`relative z-10 w-full mt-1 backdrop-blur-md rounded-2xl border p-3 sm:p-4 shadow-lg transition-colors duration-200 ${
        isDark
          ? 'bg-gradient-to-r from-[#102A43]/95 via-[#133353]/90 to-[#102A43]/95 border-slate-700/60'
          : 'bg-gradient-to-r from-slate-50 via-white to-slate-50 border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
            <h2 className={`text-sm sm:text-base font-bold tracking-wide font-['Outfit'] uppercase flex items-center gap-1.5 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Correlación Clínica:{' '}
              <span className={isDark ? 'text-rose-400' : 'text-rose-600'}>Epistaxis Anterior (&gt;90%)</span>
              <span className={`font-normal text-xs lowercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>vs</span>
              <span className={isDark ? 'text-cyan-400' : 'text-sky-600'}>Posterior (&lt;10%)</span>
            </h2>
            <span className={`text-[11px] px-2 py-0.5 rounded font-mono border ${
              isDark ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}>
              Frecuencia Anterior &gt;90%
            </span>
          </div>
          <p className={`text-xs hidden sm:block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Comparativa epidemiológica vascular (Carótida Externa vs Interna) & Guía de manejo
          </p>
        </div>

        {/* Clinical Grid: Comparison Chart + 3 Key Clinical Points Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3 items-stretch">
          {/* Visual Incidence Comparison Chart */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-stretch">
            <EpistaxisIncidenceChart />
          </div>

          {/* 3 Key Clinical Points Cards */}
          <div className="lg:col-span-7 xl:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
            {CLINICAL_POINTS_DATA.map((point) => {
              const isExpanded = activeClinicalDetail === point.id;
              return (
                <div
                  key={point.id}
                  onClick={() => setActiveClinicalDetail(isExpanded ? null : point.id)}
                  className={`group cursor-pointer rounded-xl p-2.5 sm:p-3 transition-all border flex flex-col justify-between ${
                    isExpanded
                      ? isDark
                        ? 'bg-[#183B63] border-cyan-400/80 shadow-lg shadow-cyan-950/50'
                        : 'bg-sky-50 border-sky-400 shadow-md ring-1 ring-sky-300'
                      : isDark
                      ? 'bg-[#0E2338]/80 hover:bg-[#142F4B] border-slate-700/60 hover:border-slate-600'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-1.5 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className={`p-1 rounded-lg border group-hover:scale-105 transition-transform ${
                          isDark ? 'bg-slate-900/60 border-slate-700/50' : 'bg-slate-100 border-slate-200'
                        }`}>
                          {getClinicalIcon(point.iconName)}
                        </div>
                        <span className={`text-xs font-bold font-['Outfit'] leading-snug ${
                          isDark ? 'text-slate-100' : 'text-slate-900'
                        }`}>
                          {point.title}
                        </span>
                      </div>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${point.badgeColor}`}>
                        {point.badge}
                      </span>
                    </div>
                    <p className={`text-[11px] sm:text-xs leading-relaxed font-medium ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {point.shortDesc}
                    </p>
                  </div>

                  {/* Expanded Anatomical Detail */}
                  {isExpanded && (
                    <div className={`mt-2 pt-2 border-t text-[11px] leading-normal animate-fadeIn ${
                      isDark ? 'border-slate-700/60 text-slate-200' : 'border-slate-200 text-slate-700'
                    }`}>
                      <p className={`mb-1 font-sans ${isDark ? 'text-cyan-200/90' : 'text-sky-900'}`}>
                        {point.fullDesc}
                      </p>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold mt-0.5 ${
                        isDark ? 'text-cyan-400' : 'text-sky-700'
                      }`}>
                        Criterio clínico estándar <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ARTERY DEEP-DIVE MODAL / DRAWER */}
      {selectedArtery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className={`relative w-full max-w-xl rounded-2xl border p-5 sm:p-6 shadow-2xl transition-colors ${
            isDark
              ? 'bg-gradient-to-b from-[#102A43] to-[#0B192C] border-cyan-500/50 text-slate-100'
              : 'bg-white border-slate-300 text-slate-900'
          }`}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedArtery(null)}
              className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors ${
                isDark
                  ? 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with System Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider border ${
                  selectedArtery.system === 'interna'
                    ? isDark
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-sky-100 text-sky-800 border-sky-300'
                    : isDark
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-rose-100 text-rose-800 border-rose-300'
                }`}
              >
                Sistema Carótida {selectedArtery.system === 'interna' ? 'Interna' : 'Externa'}
              </span>
              <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {selectedArtery.positionLabel}
              </span>
            </div>

            <h3 className={`text-xl sm:text-2xl font-extrabold mb-0.5 font-['Outfit'] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {selectedArtery.name}
            </h3>
            <p className={`text-xs italic mb-4 font-serif ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {selectedArtery.latinName}
            </p>

            {/* Vascular Origin Tree */}
            <div className={`rounded-xl p-3 border mb-4 ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={`text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                <Activity className="w-3.5 h-3.5 text-cyan-500" /> Jerarquía Vascular de Origen:
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {selectedArtery.originTree.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <span
                      className={`px-2 py-1 rounded-md font-mono text-[11px] border ${
                        idx === selectedArtery.originTree.length - 1
                          ? isDark
                            ? 'bg-rose-500/20 text-rose-200 border-rose-500/40 font-bold'
                            : 'bg-rose-100 text-rose-900 border-rose-300 font-bold'
                          : isDark
                          ? 'bg-slate-800 text-slate-300 border-slate-700'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      {step}
                    </span>
                    {idx < selectedArtery.originTree.length - 1 && (
                      <span className="text-slate-400 font-bold">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Description & Clinical Significance */}
            <div className={`space-y-3 text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                  isDark ? 'text-slate-200' : 'text-slate-900'
                }`}>
                  Trayecto Anatómico:
                </h4>
                <p className={`leading-relaxed p-2.5 rounded-lg border ${
                  isDark ? 'bg-slate-800/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  {selectedArtery.description}
                </p>
              </div>

              <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1 ${
                  isDark ? 'text-amber-300' : 'text-amber-800'
                }`}>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Relevancia Quirúrgica y en Epistaxis:
                </h4>
                <p className={`leading-relaxed p-2.5 rounded-lg border ${
                  isDark
                    ? 'bg-amber-950/20 border-amber-500/30 text-slate-300'
                    : 'bg-amber-50/80 border-amber-200 text-amber-950'
                }`}>
                  {selectedArtery.clinicalRelevance}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`mt-5 pt-3 border-t flex items-center justify-between ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <Eye className="w-3.5 h-3.5 text-cyan-500" /> Resaltado en el esquema anatómico
              </span>
              <button
                onClick={() => setSelectedArtery(null)}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors shadow-sm"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

