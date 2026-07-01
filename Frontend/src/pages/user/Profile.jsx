import { useState } from 'react';
import { getUserId, getUsername, setUserId } from '../../utils/auth';

function Profile() {
  const [id, setId] = useState(getUserId());
  const save = () => { setUserId(id); alert('User ID saved in browser.'); };
  return (
    <section className="container">
      <h1>Profile</h1>
      <div className="panel">
        <p><b>Username:</b> {getUsername()}</p>
        <p>Your backend login response does not return user ID, but booking API requires it.</p>
        <label>User ID</label>
        <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter user ID from registration/database" />
        <button onClick={save}>Save User ID</button>
      </div>
    </section>
  );
}
export default Profile;
