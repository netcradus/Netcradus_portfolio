/**
 * Accessible form field wrapper with label + error/hint message.
 * The control itself is passed as `children` so inputs stay flexible.
 */
export function Field({ id, label, error, hint, required, children, className = '' }) {
  const cls = ['flex flex-col gap-2', className].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      <label
        htmlFor={id}
        className="flex items-center gap-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-muted"
      >
        {label}
        {required && (
          <span className="text-violet-600" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-muted">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
