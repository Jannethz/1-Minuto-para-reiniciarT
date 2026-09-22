import React, { useState } from 'react';
import { Stethoscope, CheckCircle, ShieldCheck, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const SlideEmergencyProtocol: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const { isDark } = useTheme();

  const steps = [
    {
      num: 1,
      title: 'Posición & Maniobra de Trotter',
      tag: 'Acción Inmediata (0-15 min)',
      badge: 'Regla de Oro',
      colorDark: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300',
      colorLight: 'border-sky-300 bg-sky-50 text-sky-800',
      description: 'Sentar al paciente con la cabeza ligeramente inclinada hacia ADELANTE (nunca hacia atrás, para prevenir la deglución y aspiración pulmonar de sangre).',
      instruction: 'Compresión bidigital firme y continua sobre el tercio inferior de la nariz (alas nasales contra el tabique cartilaginoso) durante 10 a 15 minutos sin soltar.',
      caution: 'No retirar los dedos intermitentemente para "ver si sigue sangrando", pues se interrumpe la formación del tapón de fibrina.',
    },
    {
      num: 2,
      title: 'Limpieza & Vasoconstrictor Tópico',
      tag: 'Si persiste sangrado',
      badge: 'Farmacológico',
      colorDark: 'border-amber-500/50 bg-amber-950/20 text-amber-300',
      colorLight: 'border-amber-300 bg-amber-50 text-amber-800',
      description: 'Evacuar coágulos mediante sonado suave o aspiración cuidadosa. Rinoscopia anterior con espéculo nasal y buena iluminación (frontal o fotóforo).',
      instruction: 'Colocar torunda de algodón impregnada con vasoconstrictor (Oximetazolina 0.05% o Fenilefrina) combinada con anestésico tópico (Lidocaína al 2% o 4%) durante 5-10 minutos.',
      caution: 'Verificar presión arterial antes de administrar simpaticomiméticos en pacientes con hipertensión severa.',
    },
    {
      num: 3,
      title: 'Cauterización Química Focal (AgNO₃)',
      tag: 'Foco activo identificado',
      badge: 'Técnica Quirúrgica',
      colorDark: 'border-rose-500/50 bg-rose-950/20 text-rose-300',
      colorLight: 'border-rose-300 bg-rose-50 text-rose-800',
      description: 'Una vez localizado el punto sangrante en el plexo de Kiesselbach tras retirar la torunda, secar la zona con gasa o hisopo de algodón.',
      instruction: 'Aplicar la varilla de Nitrato de Plata (75% o 95%) en círculos concéntricos desde la periferia hacia el centro del vaso durante 3 a 5 segundos hasta observar la escara blanquecina grisácea.',
      caution: '¡NUNCA cauterizar bilateralmente el tabique en el mismo nivel anatómico! Riesgo inminente de necrosis del cartílago cuadrangular y perforación septal permanente.',
    },
    {
      num: 4,
      title: 'Taponamiento Nasal Anterior',
      tag: 'Sangrado difuso o refractario',
      badge: 'Hemostasia Mecánica',
      colorDark: 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300',
      colorLight: 'border-sky-300 bg-sky-50 text-sky-800',
      description: 'Si la cauterización falla o el sangrado es difuso en sábana, proceder al taponamiento nasal anterior.',
      instruction: 'Emplear esponja de alcohol polivinílico hidrófila (Merocel®) impregnada en pomada antibiótica e hidratada con solución fisiológica, o tira de gasa orillada vaselinada en acordeón.',
      caution: 'Mantener el tapón de 48 a 72 horas. Cobertura antibiótica profiláctica oral recomendada (Amoxicilina-Clavulánico) para prevenir el síndrome de shock tóxico.',
    },
    {
      num: 5,
      title: 'Criterios de Derivación & Quirúrgico',
      tag: 'Fracaso terapéutico',
      badge: 'ORL Especializado',
      colorDark: 'border-rose-500/50 bg-rose-950/30 text-rose-300',
      colorLight: 'border-rose-300 bg-rose-50 text-rose-800',
      description: 'Persistencia de hemorragia activa a pesar de taponamiento anterior correcto y bilateral.',
      instruction: 'Derivación urgente a Otorrinolaringología para endoscopia rígida, electrocoagulación bipolar guiada o ligadura endoscópica de la arteria esfenopalatina (LEEP) bajo anestesia general.',
      caution: 'Control hematimétrico estricto, corregir coagulopatías y monitorizar signos vitales.',
    },
  ];

  const handleNext = () => {
    if (activeStep < steps.length) {
      const next = activeStep + 1;
      setActiveStep(next);
      if (!completedSteps.includes(next)) {
        setCompletedSteps([...completedSteps, next]);
      }
    }
  };

  const handleReset = () => {
    setActiveStep(1);
    setCompletedSteps([1]);
  };

  const current = steps[activeStep - 1];

  return (
    <div className={`relative w-full h-full flex flex-col justify-between p-3 sm:p-5 lg:p-6 overflow-y-auto font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#0B192C] text-slate-100' : 'bg-white text-slate-900'
    }`}>
      {/* Background ambient lighting matching Slide 1 */}
      <div className={`absolute top-10 right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/5'
      }`} />
      <div className={`absolute bottom-10 left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-rose-500/10' : 'bg-rose-500/5'
      }`} />

      {/* Header matching Slide 1 */}
      <div className={`relative z-10 border-b pb-3 mb-3 transition-colors ${
        isDark ? 'border-slate-800/80' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
            isDark
              ? 'bg-rose-950/80 text-rose-300 border-rose-700/50'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}>
            <Stethoscope className="w-3.5 h-3.5 text-rose-500" /> Protocolo Clínico Estandarizado
          </span>
          <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
            isDark ? 'bg-[#102A43] text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}>
            Diapositiva 4 / 6
          </span>
        </div>
        <h1 className={`text-xl sm:text-2xl lg:text-3xl font-extrabold font-['Outfit'] tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Algoritmo de Urgencias:{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-cyan-500 font-extrabold">
            Epistaxis Anterior
          </span>
        </h1>
        <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Secuencia de 5 fases escalonadas basadas en evidencia (Guías AAO-HNS / SEORL).
        </p>
      </div>

      {/* Interactive Step Navigator */}
      <div className="relative z-10 flex items-center justify-between gap-1.5 sm:gap-2 mb-3 overflow-x-auto pb-1">
        {steps.map((s) => {
          const isActive = activeStep === s.num;
          const isDone = completedSteps.includes(s.num);
          return (
            <button
              key={s.num}
              onClick={() => {
                setActiveStep(s.num);
                if (!completedSteps.includes(s.num)) {
                  setCompletedSteps([...completedSteps, s.num]);
                }
              }}
              className={`flex-1 min-w-[110px] p-2 rounded-xl text-left border transition-all ${
                isActive
                  ? isDark
                    ? 'bg-[#14324F] border-cyan-400 text-white shadow-lg shadow-cyan-950/50'
                    : 'bg-sky-50 border-sky-500 text-sky-950 shadow-md ring-1 ring-sky-300'
                  : isDone
                  ? isDark
                    ? 'bg-[#0E2338] border-slate-700 text-slate-300 hover:border-slate-600'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs'
                  : isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-500'
                  : 'bg-slate-100/70 border-slate-200 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[11px] font-bold ${
                  isActive
                    ? isDark
                      ? 'bg-cyan-400 text-slate-950'
                      : 'bg-sky-600 text-white'
                    : isDark
                    ? 'bg-slate-800 text-slate-400'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {s.num}
                </span>
                {isDone && <CheckCircle className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />}
              </div>
              <div className="text-xs font-bold truncate font-['Outfit']">
                {s.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Card matching Slide 1 */}
      <div className={`relative z-10 rounded-2xl border p-4 sm:p-6 shadow-xl flex-1 flex flex-col justify-between transition-colors ${
        isDark
          ? 'bg-gradient-to-b from-[#102A43] to-[#0A1D30] border-slate-700/80 text-slate-100'
          : 'bg-gradient-to-b from-white to-slate-50 border-slate-200 text-slate-900 shadow-md ring-1 ring-slate-200'
      }`}>
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className={`w-7 h-7 rounded-xl font-bold flex items-center justify-center font-mono text-sm shadow-sm ${
                isDark ? 'bg-cyan-400 text-slate-950' : 'bg-sky-600 text-white'
              }`}>
                0{current.num}
              </span>
              <h2 className={`text-base sm:text-xl font-extrabold font-['Outfit'] ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {current.title}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono px-2.5 py-1 rounded border ${
                isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}>
                {current.tag}
              </span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded border ${
                isDark ? current.colorDark : current.colorLight
              }`}>
                {current.badge}
              </span>
            </div>
          </div>

          <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {current.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {/* Practical instruction */}
            <div className={`p-3.5 rounded-xl border transition-colors ${
              isDark ? 'bg-[#091829] border-cyan-900/60' : 'bg-sky-50/70 border-sky-200 shadow-xs'
            }`}>
              <div className={`text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${
                isDark ? 'text-cyan-300' : 'text-sky-800'
              }`}>
                <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} /> Instrucción Procedimental:
              </div>
              <p className={`text-xs leading-relaxed font-sans ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                {current.instruction}
              </p>
            </div>

            {/* Caution warning */}
            <div className={`p-3.5 rounded-xl border transition-colors ${
              isDark ? 'bg-rose-950/20 border-rose-500/30' : 'bg-rose-50/80 border-rose-200 shadow-xs'
            }`}>
              <div className={`text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${
                isDark ? 'text-rose-300' : 'text-rose-800'
              }`}>
                <AlertCircle className={`w-4 h-4 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} /> Precaución Crítica:
              </div>
              <p className={`text-xs leading-relaxed font-sans ${isDark ? 'text-rose-200/90' : 'text-rose-900'}`}>
                {current.caution}
              </p>
            </div>
          </div>
        </div>

        {/* Step Navigation Controls */}
        <div className={`flex items-center justify-between pt-3 border-t ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <button
            onClick={handleReset}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors ${
              isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reiniciar desde Fase 1
          </button>

          <div className="flex items-center gap-2">
            {activeStep < steps.length ? (
              <button
                onClick={handleNext}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md hover:scale-[1.02] ${
                  isDark
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
                    : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/20'
                }`}
              >
                Siguiente Fase ({activeStep + 1} de 5) <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <span className={`text-xs font-bold flex items-center gap-1 px-3 py-1.5 rounded-lg border ${
                isDark
                  ? 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40'
                  : 'text-emerald-800 bg-emerald-50 border-emerald-300'
              }`}>
                <CheckCircle className="w-4 h-4 text-emerald-500" /> Protocolo Completo
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

