export default function EmptyState({ title, subtitle }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}
