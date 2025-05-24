import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  // console.log(location.pathname.startsWith('/inventory'));
  const authRoutes = ['/user', '/dashboard', '/orders', '/users', '/sale-history', '/inventory', '/profile', '/customers', '/change-password'];
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  const login = async (username, password) => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/user/login", {
        username,
        password,
      }, { withCredentials: true });

      // console.log(res.data);
      if(res.data.status === 'success') {
        setUser(res.data.data);
        console.log(res.data.data);
        return res.data;
      }

    }
    catch(err) {
      console.error(err)
      setIsLoading(false);
      return { status: 'failed', message: err.response?.data?.message || err.message }
    }
    finally {
      setIsLoading(false);
    }
  }

  const logout = async () => {

    try {
      const res = await axios.post('http://localhost:3000/api/v1/auth/user/logout', {}, {
        withCredentials: true
      });
    }
    catch(err) {
      console.log(err);
    }
    finally {
      setUser(null);
    }
  }

  useEffect(() => {
    const authNeeded = authRoutes.some(route => location.pathname.startsWith(route));
    // console.log(authNeeded)
    if(!authNeeded) {
      setIsLoading(false);
      return ;
    }

    console.log(isLoading);

    axios.get("http://localhost:3000/api/v1/auth/user/me", {
      withCredentials: true
    })
      .then(res => {
        setUser(res.data.user);
        // setIsLoading(false);

      })
      .catch(err => {
        console.error(err);
        setUser(null);
        // navigate('/login');
      })
      .finally(() => { 
        setIsLoading(false);
      });
  }, [])

  // useEffect(() => {
  //   if(user) {
  //     setIsLoading(false);
  //   }
    
  // }, [user])

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
