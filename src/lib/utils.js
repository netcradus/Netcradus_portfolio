/** Tiny class-name helper (clsx-lite) used across components. */
export function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}
