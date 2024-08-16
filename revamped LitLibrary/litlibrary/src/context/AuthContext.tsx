"use client";
import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface AuthState {
  token: string | null;
  user: any;
  isAuthenticated: boolean | null;
  loading: boolean;
  error: string | null;
}

interface AuthAction {
  type: string;
  payload?: any;
}

interface AuthContextProps extends AuthState {
  register: (token: string) => void;
  login: (token: string) => void;
  logout: () => void;
  loadUser: (token: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const initialState: AuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  user: null,
  isAuthenticated: null,
  loading: true,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "LOGOUT":
    case "REGISTER_FAIL":
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const searchParams = useSearchParams();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadUser(token);
    } else {
      dispatch({ type: "AUTH_ERROR" });
    }
  }, []);

  useEffect(() => {

    const token = searchParams.get("token");
    if (token) {
      login(token);
    }
  }, []);

  const loadUser = async (token: string) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "USER_LOADED", payload: res.data });
    } catch (err) {
      localStorage.removeItem("token");
      dispatch({ type: "AUTH_ERROR" });
    }
  };

  const register = async (token: string) => {
    localStorage.setItem("token", token);
    dispatch({ type: "REGISTER_SUCCESS", payload: { token, user: null } });
    await loadUser(token);
  };

  const login = async (token: string) => {
    localStorage.setItem("token", token);
    dispatch({ type: "LOGIN_SUCCESS", payload: { token, user: null } });
    await loadUser(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
