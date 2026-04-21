export default function Card({ title, children, action }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card dark:bg-slate-900">
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
