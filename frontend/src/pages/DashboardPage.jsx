import { useEffect, useState } from 'react';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import { dashboardApi } from '../api/services';

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    dashboardApi.stats().then((response) => setData(response.data)).catch(() => setData({ stats: [], recent_activity: [] }));
  }, []);

  if (!data) return <Loader text="Loading dashboard..." />;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.stats.map((item) => (
          <Card key={item.label}>
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-3xl font-bold">{item.value}</p>
          </Card>
        ))}
      </div>
      <Card title="Recent Activity">
        <ul className="space-y-3 text-sm">
          {data.recent_activity.map((activity) => (
            <li key={activity.id} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
              <p>{activity.message}</p>
              <p className="text-xs text-slate-500">{new Date(activity.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
