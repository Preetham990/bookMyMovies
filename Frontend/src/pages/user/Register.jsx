import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerNormalUser } from '../../api/authApi';
import { setUserId } from '../../utils/auth';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await registerNormalUser(form);
      setUserId(res.data?.id);
      alert(`Registered successfully. Your user ID is ${res.data?.id}. Please login.`);
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed.');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-card">
      <h1>Register</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={submit}>
        <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button disabled={loading}>{loading ? 'Registering...' : 'Create Account'}</button>
      </form>
      <p className="small">Already registered? <Link to="/login">Login</Link></p>
    </div>
  );
}
export default Register;
