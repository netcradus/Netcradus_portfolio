import logoUrl from '../../assets/cyberhaxs-logo.png';

/**
 * Brand wordmark used in the navbar, mobile menu and preloader.
 * Image asset on a black background — reads on dark surfaces and works
 * as a black badge inside the light scrolled navbar pill.
 * All other markup in the call sites remains unchanged.
 */
export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src={logoUrl}
        alt="CyberHaxs"
        width={1169}
        height={148}
        className="h-7 w-auto sm:h-8"
        draggable="false"
      />
    </span>
  );
}
