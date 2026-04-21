import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AuditLogTable from '../components/audit/AuditLogTable';
import Loader from '../components/common/Loader';
import { auditApi } from '../api/services';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState(null);

  useEffect(() => {
    auditApi.list().then(({ data }) => setLogs(data.logs || [])).catch(() => toast.error('Failed to load audit logs'));
  }, []);

  if (!logs) return <Loader text="Loading audit logs..." />;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Audit Logs</h1>
      <AuditLogTable logs={logs} />
    </div>
  );
}
