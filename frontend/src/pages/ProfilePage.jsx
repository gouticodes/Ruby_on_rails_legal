import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import InputField from '../components/common/InputField';
import { profileApi } from '../api/services';

export default function ProfilePage() {
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => {
    profileApi.get().then(({ data }) => setForm(data.user)).catch(() => toast.error('Failed to load profile'));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      await profileApi.update(form);
      toast.success('Profile updated');
    } catch {
      toast.error('Failed to save profile');
    }
  };

  return (
    <Card title="User Profile">
      <form className="max-w-xl space-y-4" onSubmit={save}>
        <InputField label="Name" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <InputField label="Email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Button type="submit">Save Changes</Button>
      </form>
    </Card>
  );
}
