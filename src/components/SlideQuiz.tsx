import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/slidesData';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, BookOpen, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const SlideQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const { isDark } = useTheme();

  const question = QUIZ_QUESTIONS[currentQuestionIndex];
  const isAnswered = selectedAnswers[question.id] !== undefined;
  const selectedOption = selectedAnswers[question.id];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [question.id]: index,
    });
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(selectedAnswers[QUIZ_QUESTIONS[currentQuestionIndex - 1].id] !== undefined);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
  };

  const score = Object.entries(selectedAnswers).filter(([qId, ans]) => {
    const q = QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
    return q && q.correctIndex === ans;
  }).length;

  return (
    <div className={`relative w-full h-full flex flex-col justify-between p-3 sm:p-5 lg:p-6 overflow-y-auto font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#0B192C] text-slate-100' : 'bg-white text-slate-900'
    }`}>
      {/* Background glow matching Slide 1 */}
      <div className={`absolute top-10 left-1/3 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/5'
      }`} />
      <div className={`absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-rose-500/10' : 'bg-rose-500/5'
      }`} />

      {/* Header matching Slide 1 */}
      <div className={`relative z-10 border-b pb-3 mb-3 transition-colors ${
        isDark ? 'border-slate-800/80' : 'border-slate-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                isDark
                  ? 'bg-amber-950/80 text-amber-300 border-amber-700/50'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" /> Autoevaluación & Flashcards
              </span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                isDark ? 'bg-[#102A43] text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}>
                Diapositiva 5 / 6
              </span>
            </div>
            <h1 className={`text-xl sm:text-2xl lg:text-3xl font-extrabold font-['Outfit'] tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Evaluación Interactiva de Retención
            </h1>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Pon a prueba tus conocimientos sobre irrigación septal, Kiesselbach y epistaxis.
            </p>
          </div>

          {/* Score Badge */}
          <div className={`border rounded-xl px-3 py-2 text-right transition-colors ${
            isDark ? 'bg-[#102A43] border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className={`text-[10px] uppercase font-bold tracking-wider block ${
              isDark ? 'text-cyan-300' : 'text-sky-700'
            }`}>
              Puntuación
            </span>
            <span className={`text-lg font-mono font-bold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {score} / {QUIZ_QUESTIONS.length}
            </span>
          </div>
        </div>
      </div>

      {/* Question Card matching Slide 1 */}
      <div className={`relative z-10 rounded-2xl border p-4 sm:p-6 shadow-xl flex-1 flex flex-col justify-between transition-colors ${
        isDark
          ? 'bg-gradient-to-b from-[#102A43] to-[#0A1B2D] border-slate-700/80 text-slate-100'
          : 'bg-gradient-to-b from-white to-slate-50 border-slate-200 text-slate-900 shadow-md ring-1 ring-slate-200'
      }`}>
        <div>
          {/* Progress bar */}
          <div className={`flex items-center justify-between text-xs mb-2 font-mono ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <span>Pregunta {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
          </div>
          <div className={`w-full h-1.5 rounded-full overflow-hidden mb-4 ${
            isDark ? 'bg-slate-800' : 'bg-slate-200'
          }`}>
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-400 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h2 className={`text-base sm:text-lg font-bold mb-4 leading-snug font-['Outfit'] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-2.5 mb-4">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === question.correctIndex;
              let btnClass = isDark
                ? 'bg-[#0E2338] border-slate-700/80 text-slate-200 hover:bg-[#153452] hover:border-slate-600'
                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300 shadow-xs';

              if (isAnswered) {
                if (isCorrect) {
                  btnClass = isDark
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                    : 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-1 ring-emerald-300';
                } else if (isSelected) {
                  btnClass = isDark
                    ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                    : 'bg-rose-50 border-rose-400 text-rose-900 ring-1 ring-rose-200';
                } else {
                  btnClass = isDark
                    ? 'bg-[#0B1A28]/50 border-slate-800 text-slate-500 opacity-60'
                    : 'bg-slate-100/60 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center ${
                      isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && isCorrect && (
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className={`w-5 h-5 shrink-0 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Explanation */}
          {showExplanation && (
            <div className={`p-3.5 rounded-xl border text-xs sm:text-sm transition-colors ${
              isDark
                ? 'bg-slate-900/80 border-cyan-500/40 text-cyan-200'
                : 'bg-sky-50/80 border-sky-200 text-sky-950'
            }`}>
              <div className={`font-bold mb-1 flex items-center gap-1.5 ${
                isDark ? 'text-cyan-300' : 'text-sky-800'
              }`}>
                <BookOpen className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} /> Justificación Anatomo-Clínica:
              </div>
              <p className="leading-relaxed mb-1">{question.explanation}</p>
              <span className={`text-[11px] font-mono block mt-1 ${
                isDark ? 'text-cyan-400/80' : 'text-sky-700/80'
              }`}>
                Fuente: {question.source}
              </span>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className={`flex items-center justify-between pt-3 border-t mt-4 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <button
            onClick={handleResetQuiz}
            className={`flex items-center gap-1 text-xs transition-colors ${
              isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reiniciar Quiz
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-3 py-1.5 rounded-lg border text-xs transition-colors disabled:opacity-40 ${
                isDark
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Anterior
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === QUIZ_QUESTIONS.length - 1}
              className={`px-4 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 shadow-md transition-all disabled:opacity-40 ${
                isDark
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                  : 'bg-sky-600 hover:bg-sky-500 text-white'
              }`}
            >
              Siguiente <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

