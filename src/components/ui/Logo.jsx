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
        className="h-7 w-auto sm:h-8 object-contain"
        draggable="false"
      />
    </span>
  );
}
