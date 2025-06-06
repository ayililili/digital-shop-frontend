import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Member() {
  const { backendUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!backendUser) {
      navigate('/login', { replace: true });
    }
  }, [backendUser, navigate]);

  if (!backendUser) return null;

  return (
    <div>
      <h2>Member Page</h2>
      <p>Welcome, {backendUser.email}</p>
    </div>
  );
}

export default Member;
