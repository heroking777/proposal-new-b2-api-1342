import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

interface AuthState {
  token: string | null;
  user: any; // Adjust the type based on your user data structure
  isAuthenticated: boolean;
}

const useAuth = (): [AuthState, (token: string) => void, () => void] => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setAuthState({
        token: storedToken,
        user: jwtDecode(storedToken),
        isAuthenticated: true,
      });
    }
  }, []);

  const login = (token: string): void => {
    localStorage.setItem('jwtToken', token);
    setAuthState({
      token,
      user: jwtDecode(token),
      isAuthenticated: true,
    });
  };

  const logout = (): void => {
    localStorage.removeItem('jwtToken');
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  };

  return [authState, login, logout];
};

export default useAuth;