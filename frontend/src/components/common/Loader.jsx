export default function Loader({ text = 'Loading...' }) {
  return <div className="animate-pulse rounded-lg bg-slate-200 p-4 text-sm dark:bg-slate-800">{text}</div>;
}
