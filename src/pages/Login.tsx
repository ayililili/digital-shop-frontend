import { useAuth } from '../AuthContext';

function Login() {
  const { user, backendUser, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      await login();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <h2>Login</h2>
      {user && backendUser ? (
        <>
          <p>👋 Hello, {user.displayName}</p>
          <button onClick={handleLogout}>登出</button>
        </>
      ) : (
        <button onClick={handleLogin}>使用 Google 登入</button>
      )}
    </div>
  );
}

export default Login;
