import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useState } from 'react';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import { authApi } from '../api/services';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const next = {};
    if (!form.email.includes('@')) next.email = 'Enter a valid email address';
    if (form.password.length < 8) next.password = 'Password must be at least 8 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { data } = await authApi.login(form);
      login(data);
      toast.success('Logged in successfully');
      navigate('/');
    } catch {
      toast.error('Unable to login. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 dark:bg-slate-950">
      <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-8 shadow-card dark:bg-slate-900">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <InputField label="Email" type="email" value={form.email} error={errors.email} onChange={(e) => setForm({ ...form, email: e.target.value.trim() })} />
        <InputField label="Password" type="password" value={form.password} error={errors.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button className="w-full" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</Button>
        <p className="text-sm text-slate-500">No account? <Link className="text-brand-600" to="/register">Create one</Link></p>
      </motion.form>
    </div>
  );
}
