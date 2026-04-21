export default function AuditLogTable({ logs }) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-card dark:bg-slate-900">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800">
          <tr>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Action</th>
            <th className="p-3 text-left">Resource</th>
            <th className="p-3 text-left">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t border-slate-100 dark:border-slate-800">
              <td className="p-3">{log.user_name}</td>
              <td className="p-3">{log.action}</td>
              <td className="p-3">{log.resource_type}</td>
              <td className="p-3">{new Date(log.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
