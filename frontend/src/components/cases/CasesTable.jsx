import Button from '../common/Button';

export default function CasesTable({ cases, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
        <thead>
          <tr className="text-left text-xs uppercase text-slate-500">
            <th className="p-3">Title</th>
            <th className="p-3">Status</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Updated</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((row) => (
            <tr key={row.id} className="border-b border-slate-100 dark:border-slate-800">
              <td className="p-3 font-medium">{row.title}</td>
              <td className="p-3">{row.status}</td>
              <td className="p-3">{row.priority}</td>
              <td className="p-3">{new Date(row.updated_at).toLocaleDateString()}</td>
              <td className="flex gap-2 p-3">
                <Button variant="ghost" onClick={() => onEdit(row)}>Edit</Button>
                <Button variant="danger" onClick={() => onDelete(row.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
