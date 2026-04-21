import clsx from 'clsx';

export default function Button({ className, variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700',
    ghost: 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      className={clsx(
        'rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
