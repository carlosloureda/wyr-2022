import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import Api from "@/api";
import Loader from "../components/ui/Loader/Loader";

const AuthContext = createContext();

const authReducer = (state, action) => {
  if (action.type === "LOGIN.PENDING") {
    return {
      ...state,
      loading: true,
    };
    // TODO: LOGIN.REJECTED
  } else if (action.type === "LOGIN.SUCCESS") {
    return {
      ...state,
      loading: false,
      error: false,
      currentUser: action.author,
    };
  } else if (action.type === "LOGOUT") {
    return {
      ...state,
      currentUser: undefined,
    };
  } else if (action.type === "CHECK_CURRENT_USER") {
    return {
      ...state,
      loadingInitial: false,
      currentUser: action.currentUser,
    };
  } else {
    throw new Error(`Unsupported action type: ${action.type}`);
  }
};

export const AuthProvider = ({ children }) => {
  const [{ currentUser, error, loading, loadingInitial }, dispatch] =
    useReducer(authReducer, {
      currentUser: null,
      error: "",
      loading: false,
      loadingInitial: true,
    });

  useEffect(() => {
    setTimeout(() => {
      const currentUser = window.localStorage.getItem("wyr.currentUser")
        ? JSON.parse(window.localStorage.getItem("wyr.currentUser"))
        : "";
      dispatch({ type: "CHECK_CURRENT_USER", currentUser });
    }, 1000);
  }, []);

  const login = useCallback(async (author) => {
    dispatch({ type: "LOGIN.PENDING", author });
    return Api.post("/login", {
      author,
    }).then((data) => {
      window.localStorage.setItem("wyr.currentUser", JSON.stringify(data));
      dispatch({ type: "LOGIN.SUCCESS", author: data });
    });
  }, []);

  const logout = useCallback(async () => {
    return Api.get("/logout").then((data) => {
      window.localStorage.removeItem("wyr.currentUser");
      dispatch({ type: "LOGOUT" });
    });
  }, []);

  const memoizedAuthState = useMemo(
    () => ({ currentUser, error, loading, loadingInitial, login, logout }),
    [currentUser, error, loading, loadingInitial, login, logout]
  );

  return (
    <AuthContext.Provider value={memoizedAuthState}>
      {!loadingInitial && children}
      {!!loadingInitial && (
        <Loader>
          <p>Retreiving user from session ...</p>
        </Loader>
      )}
    </AuthContext.Provider>
  );
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return authContext;
}
