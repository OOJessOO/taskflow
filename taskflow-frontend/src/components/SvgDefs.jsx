/**
 * Définitions SVG invisibles, montées une fois à la racine de l'app.
 * Fournit le clip-path irrégulier utilisé par StampBadge pour simuler
 * l'imperfection d'un vrai tampon encreur.
 */
export default function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <filter id="stamp-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
      </defs>
    </svg>
  );
}
