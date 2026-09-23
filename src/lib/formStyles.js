import { cn } from './utils';

/**
 * Shared control class names for the contact form.
 * Kept outside of JSX components so fast-refresh stays intact.
 */
const controlBase =
  'w-full rounded-xl border bg-white px-4 py-3.5 text-[0.95rem] text-ink placeholder:text-muted/60 transition-all duration-200 outline-none hover:border-royal-300 focus:border-royal-600 focus:ring-4 focus:ring-royal-600/12 disabled:opacity-60';

export function inputClass(hasError) {
  return cn(
    controlBase,
    hasError ? 'border-red-400 focus:border-red-500 focus:ring-red-500/12' : 'border-ink/12'
  );
}

export function selectClass(hasError) {
  return cn(
    controlBase,
    'appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2712%27%20height%3D%278%27%3E%3Cpath%20d%3D%27M1%201l5%205%205-5%27%20stroke%3D%27%235b6485%27%20stroke-width%3D%272%27%20fill%3D%27none%27%20stroke-linecap%3D%27round%27%2F%3E%3C%2Fsvg%3E")] bg-[position:right_1.1rem_center] bg-no-repeat pr-11',
    hasError ? 'border-red-400 focus:border-red-500 focus:ring-red-500/12' : 'border-ink/12'
  );
}

export function textareaClass(hasError) {
  return cn(
    controlBase,
    'min-h-[9.5rem] resize-y',
    hasError ? 'border-red-400' : 'border-ink/12'
  );
}
