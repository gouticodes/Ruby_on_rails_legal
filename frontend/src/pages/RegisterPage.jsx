import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import { authApi } from '../api/services';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.register(form);
      toast.success('Registration successful. Please login.');
      navigate('/login');
    } catch {
      toast.error('Unable to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 dark:bg-slate-950">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-8 shadow-card dark:bg-slate-900">
        <h1 className="text-2xl font-bold">Create account</h1>
        <InputField label="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <InputField label="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <InputField label="Password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button className="w-full" disabled={loading}>{loading ? 'Creating...' : 'Register'}</Button>
        <p className="text-sm text-slate-500">Already have an account? <Link className="text-brand-600" to="/login">Sign in</Link></p>
      </form>
    </div>
  );
}
