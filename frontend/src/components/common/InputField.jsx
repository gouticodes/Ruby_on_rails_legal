export default function InputField({ label, error, ...props }) {
  return (
    <div>
      <label>{label}</label>
      <input {...props} />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
