import logoUrl from '../../assets/logo1.png';

/**
 * Brand wordmark used in the navbar, mobile menu and preloader.
 */
export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src={logoUrl}
        alt="CyberHaxs"
        width={451}
        height={45}
        className="h-6 min-[360px]:h-7 sm:h-8 w-auto max-w-[140px] min-[360px]:max-w-none object-contain"
        draggable="false"
      />
    </span>
  );
}
