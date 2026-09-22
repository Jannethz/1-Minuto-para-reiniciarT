import React, { useState } from 'react';
import { ARTERIES_DATA } from '../data/slidesData';
import { ArteryInfo } from '../types';
import { useTheme } from '../context/ThemeContext';

interface AnatomyDiagramProps {
  selectedArteryId: string | null;
  onSelectArtery: (artery: ArteryInfo | null) => void;
  filterSystem: 'all' | 'interna' | 'externa';
  showBloodFlow: boolean;
  simulateBleeding: boolean;
  onToggleBleeding: () => void;
  zoomActive?: boolean;
}

export const AnatomyDiagram: React.FC<AnatomyDiagramProps> = ({
  selectedArteryId,
  onSelectArtery,
  filterSystem,
  showBloodFlow,
  simulateBleeding,
  onToggleBleeding,
  zoomActive = true,
}) => {
  const [hoveredArteryId, setHoveredArteryId] = useState<string | null>(null);
  const { isDark } = useTheme();

  // Theme-aware palette for anatomical rendering
  const palette = {
    canvasBg: isDark
      ? 'bg-gradient-to-br from-[#0B192C]/95 via-[#102A43]/85 to-[#071322] border-cyan-950/40'
      : 'bg-gradient-to-br from-slate-50 via-sky-50/40 to-slate-100 border-slate-200 shadow-inner',
    dotColor: isDark ? '#4CC9F0' : '#0284c7',
    skullFill: isDark ? '#102A43' : '#F1F5F9',
    skullStroke: isDark ? '#2A4365' : '#CBD5E1',
    sinusFill: isDark ? '#09182A' : '#E2E8F0',
    sinusStroke: isDark ? '#3182CE' : '#93C5FD',
    sinusText: isDark ? '#63B3ED' : '#1D4ED8',
    cribriformStroke: isDark ? '#63B3ED' : '#2563EB',
    cribriformText: isDark ? '#90CDF4' : '#1E40AF',
    palateStroke: isDark ? '#4A5568' : '#94A3B8',
    palateText: isDark ? '#A0AEC0' : '#475569',
    teethFill: isDark ? '#2D3748' : '#E2E8F0',
    ethmoidFill: isDark ? '#1A365D' : '#DBEAFE',
    ethmoidStroke: isDark ? '#2B6CB0' : '#60A5FA',
    ethmoidText: isDark ? '#90CDF4' : '#1E40AF',
    vomerFill: isDark ? '#2C5282' : '#E0E7FF',
    vomerStroke: isDark ? '#3182CE' : '#818CF8',
    vomerText: isDark ? '#BEE3F8' : '#3730A3',
    septumFill: isDark ? '#2B4C7E' : '#BAE6FD',
    septumStroke: isDark ? '#63B3ED' : '#0284C7',
    septumTitle: isDark ? '#EBF8FF' : '#0369A1',
    septumSub: isDark ? '#90CDF4' : '#0284C7',
    profileStroke: isDark ? '#90CDF4' : '#0284C7',
    profileText: isDark ? '#90CDF4' : '#0284C7',
    cardBg: isDark ? '#081829' : '#FFFFFF',
    cardTitle: isDark ? '#FFFFFF' : '#0F172A',
    lensGlowStart: isDark ? '#102A43' : '#F8FAFC',
    lensGlowMid: isDark ? '#1B3B6F' : '#E2E8F0',
    lensBadgeBg: isDark ? '#0B192C' : '#FFFFFF',
    lensBadgeText: isDark ? '#FFD166' : '#B45309',
    topLegendBg: isDark ? 'bg-[#0B192C]/90 border-slate-700/60' : 'bg-white/95 border-slate-300 shadow-md',
    topLegendInterna: isDark ? 'text-cyan-300' : 'text-sky-700',
    topLegendExterna: isDark ? 'text-rose-300' : 'text-rose-700',
    topLegendPlexus: isDark ? 'text-amber-300' : 'text-amber-800',
    bleedingInactiveBtn: isDark ? 'bg-slate-800/90 text-rose-300 hover:bg-rose-950/60 border-rose-500/40' : 'bg-white text-rose-700 hover:bg-rose-50 border-rose-300 shadow-sm',
  };

  const getArteryOpacity = (system: string, id: string) => {
    if (filterSystem !== 'all' && filterSystem !== system) {
      return 0.15;
    }
    if (hoveredArteryId || selectedArteryId) {
      const activeId = hoveredArteryId || selectedArteryId;
      return activeId === id ? 1 : 0.25;
    }
    return 0.9;
  };

  const getArteryWidth = (gauge: number, id: string) => {
    const isFocused = hoveredArteryId === id || selectedArteryId === id;
    return isFocused ? gauge * 1.6 : gauge;
  };

  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none overflow-hidden rounded-2xl p-2 sm:p-4 transition-colors duration-200 border ${palette.canvasBg}`}>
      {/* Background Grid Pattern & Medical Vignette */}
      <div 
        className={`absolute inset-0 pointer-events-none ${isDark ? 'opacity-15' : 'opacity-25'}`}
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${palette.dotColor} 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* SVG Canvas (16:9 optimized viewBox 0 0 1000 620) */}
      <svg
        viewBox="0 0 1000 620"
        className="w-full h-full max-h-[580px] drop-shadow-xl transition-all duration-300"
        style={{ filter: isDark ? 'drop-shadow(0 15px 35px rgba(0,0,0,0.5))' : 'drop-shadow(0 8px 25px rgba(0,0,0,0.08))' }}
      >
        <defs>
          {/* Radial Glows */}
          <radialGradient id="plexusGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD166" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#FF3366" stopOpacity="0.4" />
            <stop offset="100%" stopColor={isDark ? '#0B192C' : '#FFFFFF'} stopOpacity="0" />
          </radialGradient>

          <radialGradient id="zoomLensGlow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor={palette.lensGlowStart} stopOpacity="0.9" />
            <stop offset="95%" stopColor={palette.lensGlowMid} stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFD166" stopOpacity="1" />
          </radialGradient>

          {/* Blood Drop Gradient */}
          <linearGradient id="bloodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF3366" />
            <stop offset="100%" stopColor="#990022" />
          </linearGradient>

          {/* Glowing Filters */}
          <filter id="neonCyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="neonRed" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="goldAura" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ==================================================== */}
        {/* 1. SILUETA DEL CRÁNEO Y CAVIDAD NASAL (CORTE SAGITAL) */}
        {/* ==================================================== */}
        <g id="skull-sagittal-silhouette" className={`${isDark ? 'opacity-35' : 'opacity-70'} transition-opacity duration-500`}>
          {/* Neurocranium & Facial Silhouette Profile */}
          <path
            d="M 120 460 C 130 430, 160 380, 210 375 C 230 373, 250 380, 260 365 C 275 345, 260 310, 280 270 C 300 230, 345 155, 410 115 C 475 75, 595 65, 680 95 C 765 125, 825 180, 840 260 C 855 340, 845 400, 805 450 C 765 500, 710 520, 680 540 C 650 560, 630 600, 630 600 L 480 600 C 480 570, 460 550, 430 540 C 390 535, 340 535, 300 545 C 260 555, 230 525, 210 520 C 190 515, 150 510, 120 460 Z"
            fill={palette.skullFill}
            stroke={palette.skullStroke}
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />

          {/* Frontal Sinus */}
          <path
            d="M 330 200 C 335 170, 360 160, 375 175 C 385 190, 370 220, 350 225 Z"
            fill={palette.sinusFill}
            stroke={palette.sinusStroke}
            strokeWidth="1.5"
          />
          <text x="325" y="160" fill={palette.sinusText} fontSize="11" fontFamily="Outfit" opacity={isDark ? 0.8 : 1}>
            Seno Frontal
          </text>

          {/* Sphenoidal Sinus & Sella Turcica */}
          <path
            d="M 640 240 C 660 230, 690 235, 695 260 C 700 285, 675 305, 650 295 C 635 285, 630 260, 640 240 Z"
            fill={palette.sinusFill}
            stroke={palette.sinusStroke}
            strokeWidth="1.5"
          />
          <text x="660" y="225" fill={palette.sinusText} fontSize="11" fontFamily="Outfit" opacity={isDark ? 0.8 : 1}>
            Seno Esfenoidal
          </text>

          {/* Cribriform Plate (Lámina Cribosa del Etmoides) */}
          <path
            d="M 370 220 L 580 225"
            stroke={palette.cribriformStroke}
            strokeWidth="3"
            strokeDasharray="4 3"
          />
          <text x="440" y="212" fill={palette.cribriformText} fontSize="11" fontFamily="JetBrains Mono" opacity={isDark ? 0.85 : 1}>
            Lámina Cribosa (Etmoides)
          </text>

          {/* Hard Palate (Paladar Óseo Duro) */}
          <path
            d="M 270 480 Q 420 475 620 470"
            stroke={palette.palateStroke}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <text x="470" y="500" fill={palette.palateText} fontSize="12" fontFamily="Outfit">
            Paladar Duro (Apófisis Palatina Maxilar)
          </text>

          {/* Soft Palate & Uvula */}
          <path
            d="M 620 470 C 650 475, 680 495, 685 530 C 675 535, 665 520, 650 500 Z"
            fill={palette.teethFill}
            stroke={palette.palateStroke}
            strokeWidth="2"
          />
          <text x="690" y="515" fill={palette.palateText} fontSize="11" fontFamily="Outfit">
            Paladar Blando
          </text>

          {/* Maxillary Teeth & Alveolus outline */}
          <path
            d="M 260 485 C 255 500, 240 515, 230 520 C 220 525, 210 505, 220 490 Z"
            fill={palette.teethFill}
            stroke={palette.palateStroke}
            strokeWidth="1.5"
          />
          <text x="175" y="540" fill={palette.palateText} fontSize="11" fontFamily="Outfit">
            Incisivos Superiores
          </text>
        </g>

        {/* ==================================================== */}
        {/* 2. TABIQUE NASAL (CARTÍLAGO CUADRANGULAR + HUESOS)    */}
        {/* ==================================================== */}
        <g id="nasal-septum-components" className="transition-all duration-300">
          {/* Lámina Perpendicular del Etmoides (Hueso) */}
          <polygon
            points="380,225 580,230 560,330 430,300"
            fill={palette.ethmoidFill}
            fillOpacity={isDark ? 0.45 : 0.65}
            stroke={palette.ethmoidStroke}
            strokeWidth="1.5"
            className="hover:fill-opacity-70 transition-all cursor-help"
          >
            <title>Lámina Perpendicular del Hueso Etmoides</title>
          </polygon>
          <text x="440" y="270" fill={palette.ethmoidText} fontSize="11.5" fontFamily="Outfit" opacity={isDark ? 0.75 : 1} pointerEvents="none">
            Lámina Perpendicular (Etmoides)
          </text>

          {/* Vómer (Hueso Posteroinferior) */}
          <polygon
            points="430,300 560,330 610,468 390,473"
            fill={palette.vomerFill}
            fillOpacity={isDark ? 0.4 : 0.65}
            stroke={palette.vomerStroke}
            strokeWidth="1.5"
            className="hover:fill-opacity-70 transition-all cursor-help"
          >
            <title>Hueso Vómer</title>
          </polygon>
          <text x="490" y="385" fill={palette.vomerText} fontSize="12" fontFamily="Outfit" opacity={isDark ? 0.8 : 1} pointerEvents="none">
            Vómer
          </text>

          {/* Cartílago Cuadrangular / Septal (Zona Anteroinferior) */}
          <polygon
            points="290,320 380,225 430,300 390,473 275,475 250,420 270,360"
            fill={palette.septumFill}
            fillOpacity={isDark ? 0.55 : 0.75}
            stroke={palette.septumStroke}
            strokeWidth="2"
            className="hover:fill-opacity-80 transition-all cursor-help"
          >
            <title>Cartílago Cuadrangular (Cartílago del Tabique Nasal)</title>
          </polygon>
          <text x="295" y="380" fill={palette.septumTitle} fontSize="13" fontWeight="600" fontFamily="Outfit" opacity={isDark ? 0.9 : 1} pointerEvents="none">
            Cartílago Septal
          </text>
          <text x="295" y="398" fill={palette.septumSub} fontSize="10.5" fontFamily="Outfit" opacity={isDark ? 0.7 : 0.9} pointerEvents="none">
            (Cartílago Cuadrangular)
          </text>

          {/* Perfil Externo de la Nariz y Labio Superior */}
          <path
            d="M 280 270 C 275 320, 240 370, 220 385 C 205 395, 205 405, 225 415 C 245 425, 255 440, 250 460 C 248 468, 235 470, 235 480"
            stroke={palette.profileStroke}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <text x="135" y="390" fill={palette.profileText} fontSize="12" fontWeight="600" fontFamily="Outfit">
            Vértice Nasal (Punta)
          </text>
          <line x1="210" y1="390" x2="190" y2="390" stroke={palette.profileStroke} strokeWidth="1" strokeDasharray="2 2" />
        </g>

        {/* ==================================================== */}
        {/* 3. LUPA O ZOOM: ÁREA DE LITTLE / PLEXO DE KIESSELBACH */}
        {/* ==================================================== */}
        {zoomActive && (
          <g id="magnifying-loupe" className="transition-transform duration-500">
            {/* Cone of Magnification projection lines from nasal area */}
            <path
              d="M 285 415 L 340 415"
              stroke="#FFD166"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.4"
            />

            {/* Glowing Backdrop for Zoom Window */}
            <circle
              cx="340"
              cy="415"
              r="75"
              fill="url(#zoomLensGlow)"
              className="filter drop-shadow-xl"
            />

            {/* Microvascular capillary meshwork inside the Zoom Circle */}
            <g id="capillary-mesh" opacity="0.85">
              {/* Anastomotic network loops */}
              <circle cx="340" cy="415" r="28" fill="url(#plexusGlow)" filter="url(#goldAura)" />
              <path
                d="M 320 405 Q 330 415 340 415 Q 355 415 365 400"
                stroke="#FFD166"
                strokeWidth="1.8"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M 330 430 Q 340 415 350 425 Q 360 430 365 415"
                stroke="#FFD166"
                strokeWidth="1.8"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M 335 395 Q 340 410 345 425 Q 350 435 340 440"
                stroke="#FF3366"
                strokeWidth="1.4"
                fill="none"
                opacity="0.7"
              />
              <path
                d="M 315 420 Q 330 425 340 415 Q 350 405 360 410"
                stroke="#00F0FF"
                strokeWidth="1.4"
                fill="none"
                opacity="0.7"
              />
            </g>

            {/* Pulsing Outer Neon Golden Ring */}
            <circle
              cx="340"
              cy="415"
              r="75"
              fill="none"
              stroke="#FFD166"
              strokeWidth="3.5"
              filter="url(#goldAura)"
              className="animate-pulse"
            />
            <circle
              cx="340"
              cy="415"
              r="78"
              fill="none"
              stroke="#FFD166"
              strokeWidth="1"
              strokeDasharray="5 4"
              opacity="0.6"
            />

            {/* Zoom Badge Title */}
            <rect
              x="270"
              y="322"
              width="140"
              height="24"
              rx="12"
              fill={palette.lensBadgeBg}
              stroke="#FFD166"
              strokeWidth="1.5"
              className="filter drop-shadow-md"
            />
            <text
              x="340"
              y="338"
              textAnchor="middle"
              fill={palette.lensBadgeText}
              fontSize="11"
              fontWeight="700"
              fontFamily="Outfit"
              letterSpacing="0.5"
            >
              ZOOM: ÁREA DE LITTLE
            </text>

            {/* Central Anastomotic Confluence Dot */}
            <circle
              cx="340"
              cy="415"
              r="7"
              fill="#FFD166"
              stroke="#FFFFFF"
              strokeWidth="2"
              filter="url(#goldAura)"
              className="cursor-pointer"
              onClick={onToggleBleeding}
            >
              <title>Plexo de Kiesselbach (Clic para simular/detener sangrado)</title>
            </circle>

            {/* Kiesselbach Label */}
            <text
              x="340"
              y="472"
              textAnchor="middle"
              fill={isDark ? '#FFE699' : '#B45309'}
              fontSize="12"
              fontWeight="700"
              fontFamily="Outfit"
            >
              Plexo de Kiesselbach
            </text>
            <text
              x="340"
              y="486"
              textAnchor="middle"
              fill={isDark ? '#E2E8F0' : '#475569'}
              fontSize="10"
              fontFamily="Outfit"
              opacity={isDark ? 0.8 : 1}
            >
              (Confluencia Anastomótica)
            </text>
          </g>
        )}

        {/* ==================================================== */}
        {/* 4. TRAZADO DE LAS 4 ARTERIAS PRINCIPALES             */}
        {/* ==================================================== */}

        {/* ---------------------------------------------------- */}
        {/* ARTERIA 1: ETMOIDAL ANTERIOR (Carótida Interna - Cian) */}
        {/* ---------------------------------------------------- */}
        <g
          id="artery-etmoidal-anterior"
          className="cursor-pointer transition-all duration-300"
          opacity={getArteryOpacity('interna', 'etmoidal-anterior')}
          onMouseEnter={() => setHoveredArteryId('etmoidal-anterior')}
          onMouseLeave={() => setHoveredArteryId(null)}
          onClick={() => onSelectArtery(ARTERIES_DATA[0])}
        >
          {/* Main Artery Pathway: From Cribriform roof downward to Plexus */}
          <path
            d="M 380 225 Q 365 290 350 350 Q 345 385 340 415"
            fill="none"
            stroke="#00F0FF"
            strokeWidth={getArteryWidth(ARTERIES_DATA[0].gauge, 'etmoidal-anterior')}
            strokeLinecap="round"
            filter="url(#neonCyan)"
          />

          {/* Secondary branching septal twig */}
          <path
            d="M 365 285 Q 330 310 315 340"
            fill="none"
            stroke="#00F0FF"
            strokeWidth="2"
            opacity="0.7"
          />

          {/* Animated Blood Flow Pulses */}
          {showBloodFlow && (
            <path
              d="M 380 225 Q 365 290 350 350 Q 345 385 340 415"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeDasharray="10 18"
              strokeLinecap="round"
              className="animate-[dash_1.5s_linear_infinite]"
              style={{
                strokeDashoffset: 100,
                animation: 'pulseFlow 1.8s linear infinite reverse',
              }}
            />
          )}

          {/* Foramen Entrance Marker */}
          <circle cx="380" cy="225" r="4.5" fill="#00F0FF" stroke="#0B192C" strokeWidth="1.5" />

          {/* Leader Line to Text Block (Arriba / Izquierda) */}
          <polyline
            points="360,260 270,180 140,180"
            fill="none"
            stroke="#00F0FF"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <circle cx="360" cy="260" r="3" fill="#00F0FF" />

          {/* Floating Tag in Canvas */}
          <g transform="translate(15, 125)">
            <rect
              width="235"
              height="58"
              rx="10"
              fill={palette.cardBg}
              stroke="#00F0FF"
              strokeWidth={selectedArteryId === 'etmoidal-anterior' ? '2.5' : '1.5'}
              className="filter drop-shadow-lg"
            />
            <circle cx="16" cy="18" r="5" fill="#00F0FF" filter="url(#neonCyan)" />
            <text x="28" y="22" fill={palette.cardTitle} fontSize="13" fontWeight="700" fontFamily="Outfit">
              A. Etmoidal Anterior
            </text>
            <text x="28" y="38" fill={isDark ? '#4CC9F0' : '#0284C7'} fontSize="11" fontWeight="600" fontFamily="Outfit">
              Rama de Carótida Interna (vía Oftálmica)
            </text>
            <text x="28" y="50" fill={isDark ? '#90CDF4' : '#0369A1'} fontSize="9.5" fontFamily="JetBrains Mono">
              [Posición: Arriba / Adelante]
            </text>
          </g>
        </g>

        {/* ---------------------------------------------------- */}
        {/* ARTERIA 2: ESFENOPALATINA (Carótida Externa - Carmesí) */}
        {/* ---------------------------------------------------- */}
        <g
          id="artery-esfenopalatina"
          className="cursor-pointer transition-all duration-300"
          opacity={getArteryOpacity('externa', 'esfenopalatina')}
          onMouseEnter={() => setHoveredArteryId('esfenopalatina')}
          onMouseLeave={() => setHoveredArteryId(null)}
          onClick={() => onSelectArtery(ARTERIES_DATA[1])}
        >
          {/* Main Artery Pathway: From Sphenopalatine foramen anteriorly across vomer */}
          <path
            d="M 640 280 Q 530 330 450 370 Q 380 400 340 415"
            fill="none"
            stroke="#FF3366"
            strokeWidth={getArteryWidth(ARTERIES_DATA[1].gauge, 'esfenopalatina')}
            strokeLinecap="round"
            filter="url(#neonRed)"
          />

          {/* Secondary branching ramus */}
          <path
            d="M 520 335 Q 480 300 420 320"
            fill="none"
            stroke="#FF3366"
            strokeWidth="2.2"
            opacity="0.75"
          />

          {/* Animated Blood Flow Pulses */}
          {showBloodFlow && (
            <path
              d="M 640 280 Q 530 330 450 370 Q 380 400 340 415"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeDasharray="12 20"
              strokeLinecap="round"
              style={{
                animation: 'pulseFlow 1.6s linear infinite reverse',
              }}
            />
          )}

          {/* Sphenopalatine Foramen marker */}
          <circle cx="640" cy="280" r="5" fill="#FF3366" stroke={isDark ? '#0B192C' : '#FFFFFF'} strokeWidth="1.5" />

          {/* Leader Line to Text Block (Atrás / Derecha) */}
          <polyline
            points="540,328 660,328 780,240"
            fill="none"
            stroke="#FF3366"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <circle cx="540" cy="328" r="3" fill="#FF3366" />

          {/* Floating Tag in Canvas */}
          <g transform="translate(730, 190)">
            <rect
              width="250"
              height="58"
              rx="10"
              fill={palette.cardBg}
              stroke="#FF3366"
              strokeWidth={selectedArteryId === 'esfenopalatina' ? '2.5' : '1.5'}
              className="filter drop-shadow-lg"
            />
            <circle cx="16" cy="18" r="5" fill="#FF3366" filter="url(#neonRed)" />
            <text x="28" y="22" fill={palette.cardTitle} fontSize="13" fontWeight="700" fontFamily="Outfit">
              A. Esfenopalatina
            </text>
            <text x="28" y="38" fill={isDark ? '#FF758F' : '#E11D48'} fontSize="11" fontWeight="600" fontFamily="Outfit">
              Rama de Carótida Externa (vía Maxilar)
            </text>
            <text x="28" y="50" fill={isDark ? '#FFA3B1' : '#BE123C'} fontSize="9.5" fontFamily="JetBrains Mono">
              [Posición: Atrás / Derecha]
            </text>
          </g>
        </g>

        {/* ---------------------------------------------------- */}
        {/* ARTERIA 3: PALATINA MAYOR (Carótida Externa - Carmesí)*/}
        {/* ---------------------------------------------------- */}
        <g
          id="artery-palatina-mayor"
          className="cursor-pointer transition-all duration-300"
          opacity={getArteryOpacity('externa', 'palatina-mayor')}
          onMouseEnter={() => setHoveredArteryId('palatina-mayor')}
          onMouseLeave={() => setHoveredArteryId(null)}
          onClick={() => onSelectArtery(ARTERIES_DATA[2])}
        >
          {/* Main Artery Pathway: Travels through palate & ascends via incisive canal */}
          <path
            d="M 600 472 L 380 473 Q 355 470 345 445 L 340 415"
            fill="none"
            stroke="#FF3366"
            strokeWidth={getArteryWidth(ARTERIES_DATA[2].gauge, 'palatina-mayor')}
            strokeLinecap="round"
            filter="url(#neonRed)"
          />

          {/* Incisive canal branch */}
          <circle cx="360" cy="473" r="3.5" fill="#FF3366" />

          {/* Animated Blood Flow Pulses */}
          {showBloodFlow && (
            <path
              d="M 600 472 L 380 473 Q 355 470 345 445 L 340 415"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeDasharray="10 18"
              strokeLinecap="round"
              style={{
                animation: 'pulseFlow 1.7s linear infinite reverse',
              }}
            />
          )}

          {/* Leader Line to Text Block (Abajo / Derecha) */}
          <polyline
            points="460,473 540,510 740,510"
            fill="none"
            stroke="#FF3366"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <circle cx="460" cy="473" r="3" fill="#FF3366" />

          {/* Floating Tag in Canvas */}
          <g transform="translate(730, 480)">
            <rect
              width="250"
              height="58"
              rx="10"
              fill={palette.cardBg}
              stroke="#FF3366"
              strokeWidth={selectedArteryId === 'palatina-mayor' ? '2.5' : '1.5'}
              className="filter drop-shadow-lg"
            />
            <circle cx="16" cy="18" r="5" fill="#FF3366" filter="url(#neonRed)" />
            <text x="28" y="22" fill={palette.cardTitle} fontSize="13" fontWeight="700" fontFamily="Outfit">
              A. Palatina Mayor
            </text>
            <text x="28" y="38" fill={isDark ? '#FF758F' : '#E11D48'} fontSize="11" fontWeight="600" fontFamily="Outfit">
              Rama de Carótida Externa (vía Incisivo)
            </text>
            <text x="28" y="50" fill={isDark ? '#FFA3B1' : '#BE123C'} fontSize="9.5" fontFamily="JetBrains Mono">
              [Posición: Abajo / Derecha]
            </text>
          </g>
        </g>

        {/* ---------------------------------------------------- */}
        {/* ARTERIA 4: LABIAL SUPERIOR (Carótida Externa - Carmesí)*/}
        {/* ---------------------------------------------------- */}
        <g
          id="artery-labial-superior"
          className="cursor-pointer transition-all duration-300"
          opacity={getArteryOpacity('externa', 'labial-superior')}
          onMouseEnter={() => setHoveredArteryId('labial-superior')}
          onMouseLeave={() => setHoveredArteryId(null)}
          onClick={() => onSelectArtery(ARTERIES_DATA[3])}
        >
          {/* Main Artery Pathway: From upper lip/columella ascending into Kiesselbach */}
          <path
            d="M 235 480 Q 250 460 280 445 Q 315 430 340 415"
            fill="none"
            stroke="#FF3366"
            strokeWidth={getArteryWidth(ARTERIES_DATA[3].gauge, 'labial-superior')}
            strokeLinecap="round"
            filter="url(#neonRed)"
          />

          {/* Animated Blood Flow Pulses */}
          {showBloodFlow && (
            <path
              d="M 235 480 Q 250 460 280 445 Q 315 430 340 415"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeDasharray="8 15"
              strokeLinecap="round"
              style={{
                animation: 'pulseFlow 1.4s linear infinite reverse',
              }}
            />
          )}

          {/* Leader Line to Text Block (Abajo / Adelante) */}
          <polyline
            points="270,450 200,490 60,490"
            fill="none"
            stroke="#FF3366"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <circle cx="270" cy="450" r="3" fill="#FF3366" />

          {/* Floating Tag in Canvas */}
          <g transform="translate(15, 480)">
            <rect
              width="250"
              height="58"
              rx="10"
              fill={palette.cardBg}
              stroke="#FF3366"
              strokeWidth={selectedArteryId === 'labial-superior' ? '2.5' : '1.5'}
              className="filter drop-shadow-lg"
            />
            <circle cx="16" cy="18" r="5" fill="#FF3366" filter="url(#neonRed)" />
            <text x="28" y="22" fill={palette.cardTitle} fontSize="13" fontWeight="700" fontFamily="Outfit">
              A. Labial Superior (rama septal)
            </text>
            <text x="28" y="38" fill={isDark ? '#FF758F' : '#E11D48'} fontSize="11" fontWeight="600" fontFamily="Outfit">
              Rama de Carótida Externa (vía Facial)
            </text>
            <text x="28" y="50" fill={isDark ? '#FFA3B1' : '#BE123C'} fontSize="9.5" fontFamily="JetBrains Mono">
              [Posición: Abajo / Adelante]
            </text>
          </g>
        </g>

        {/* ==================================================== */}
        {/* 5. SIMULADOR DE EPISTAXIS ACTIVA (HEMORRAGIA ANTERIOR) */}
        {/* ==================================================== */}
        {simulateBleeding && (
          <g id="epistaxis-simulation">
            {/* Active Bleed Gush Pulse */}
            <circle
              cx="340"
              cy="415"
              r="14"
              fill="#FF1744"
              opacity="0.8"
              className="animate-ping"
            />
            {/* Blood Droplet Trail down to nostril */}
            <path
              d="M 340 415 Q 315 440 280 455 Q 240 470 235 520"
              stroke="#E50914"
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
              className="drop-shadow-md"
            />
            {/* Blood Droplet */}
            <circle cx="235" cy="525" r="7" fill="url(#bloodGradient)" className="animate-bounce" />
            
            {/* Warning Callout */}
            <g transform="translate(130, 310)">
              <rect
                width="155"
                height="32"
                rx="6"
                fill="#DC2626"
                className="filter drop-shadow-md animate-pulse"
              />
              <text x="12" y="21" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="Outfit">
                ⚠️ HEMORRAGIA ACTIVA
              </text>
            </g>
          </g>
        )}
      </svg>

      {/* Interactive Controls Overlay in Top Bar of Canvas */}
      <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        {/* Quick Legend Tags */}
        <div className={`flex items-center gap-2 backdrop-blur-md px-3 py-1.5 rounded-full border shadow-md text-xs transition-colors duration-200 ${palette.topLegendBg}`}>
          <span className={`flex items-center gap-1.5 font-medium ${palette.topLegendInterna}`}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
            Carótida Interna (1)
          </span>
          <span className={isDark ? "text-slate-500" : "text-slate-300"}>|</span>
          <span className={`flex items-center gap-1.5 font-medium ${palette.topLegendExterna}`}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF3366] shadow-[0_0_8px_#FF3366]" />
            Carótida Externa (3)
          </span>
          <span className={isDark ? "text-slate-500" : "text-slate-300"}>|</span>
          <span className={`flex items-center gap-1.5 font-medium ${palette.topLegendPlexus}`}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFD166] shadow-[0_0_8px_#FFD166]" />
            Plexo de Kiesselbach
          </span>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleBleeding}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md ${
              simulateBleeding
                ? 'bg-rose-600 text-white shadow-rose-600/40 ring-2 ring-rose-400 animate-pulse'
                : palette.bleedingInactiveBtn
            }`}
            title="Simula un episodio de sangrado en el área de Little"
          >
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            {simulateBleeding ? 'Detener Sangrado' : 'Simular Epistaxis'}
          </button>
        </div>
      </div>
    </div>
  );
};
