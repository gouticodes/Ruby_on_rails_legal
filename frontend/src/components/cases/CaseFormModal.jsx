import { useEffect, useState } from 'react';
import Button from '../common/Button';
import InputField from '../common/InputField';

const defaultForm = { title: '', status: 'open', priority: 'medium', description: '' };

export default function CaseFormModal({ open, onClose, onSubmit, initialValues }) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    setForm(initialValues || defaultForm);
  }, [initialValues]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/50 p-4">
      <form
        className="w-full max-w-xl space-y-4 rounded-2xl bg-white p-6 dark:bg-slate-900"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
      >
        <h3 className="text-lg font-semibold">{initialValues ? 'Update Case' : 'Create Case'}</h3>
        <InputField label="Case Title" value={form.title} required onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <InputField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label>Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <label>Priority</label>
            <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
