import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import CasesTable from '../components/cases/CasesTable';
import CaseFormModal from '../components/cases/CaseFormModal';
import { casesApi } from '../api/services';

export default function CasesPage() {
  const [cases, setCases] = useState([]);
  const [filter, setFilter] = useState('all');
  const [openModal, setOpenModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  const fetchCases = async () => {
    const { data } = await casesApi.list();
    setCases(data.cases || []);
  };

  useEffect(() => {
    fetchCases().catch(() => toast.error('Failed to fetch cases'));
  }, []);

  const filteredCases = useMemo(
    () => (filter === 'all' ? cases : cases.filter((item) => item.status === filter)),
    [cases, filter],
  );

  const saveCase = async (payload) => {
    try {
      if (selectedCase) {
        await casesApi.update(selectedCase.id, payload);
        toast.success('Case updated');
      } else {
        await casesApi.create(payload);
        toast.success('Case created');
      }
      setOpenModal(false);
      setSelectedCase(null);
      fetchCases();
    } catch {
      toast.error('Unable to save case');
    }
  };

  const deleteCase = async (id) => {
    try {
      await casesApi.remove(id);
      toast.success('Case removed');
      fetchCases();
    } catch {
      toast.error('Unable to delete case');
    }
  };

  return (
    <Card
      title="Case Management"
      action={<Button onClick={() => setOpenModal(true)}>+ New Case</Button>}
    >
      <div className="mb-4 flex items-center gap-2">
        <label className="!mb-0">Filter by status:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      {filteredCases.length ? (
        <CasesTable
          cases={filteredCases}
          onEdit={(item) => {
            setSelectedCase(item);
            setOpenModal(true);
          }}
          onDelete={deleteCase}
        />
      ) : (
        <EmptyState title="No cases available" subtitle="Create your first case to start tracking legal operations." />
      )}
      <CaseFormModal
        open={openModal}
        initialValues={selectedCase}
        onClose={() => {
          setOpenModal(false);
          setSelectedCase(null);
        }}
        onSubmit={saveCase}
      />
    </Card>
  );
}
