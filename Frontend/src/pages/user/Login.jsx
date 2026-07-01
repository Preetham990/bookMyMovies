import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authApi';
import { saveLogin } from '../../utils/auth';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginUser(form);
      saveLogin(res.data);
      navigate('/movies');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed. Check username and password.');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-card">
      <h1>Login</h1>
      <p>Use your backend username and password.</p>
      {error && <div className="error">{error}</div>}
      <form onSubmit={submit}>
        <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      <p className="small">No account? <Link to="/register">Register</Link></p>
    </div>
  );
}
export default Login;
