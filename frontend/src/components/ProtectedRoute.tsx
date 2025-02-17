import { FC, ReactNode, useCallback, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState } from "react";

type ProtectedRouteProps = { children: ReactNode };

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  const refreshToken = useCallback(async () => {
    const refresh = localStorage.getItem(REFRESH_TOKEN);
    await api
      .post("/api/token/refresh/", { refresh })
      .then((res) => {
        if (res.status === 200) localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(res.status === 200);
      })
      .catch((err) => {
        console.error(err);
        setIsAuthorized(false);
      });
  }, [setIsAuthorized]);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const { exp: tokenExpiration } = jwtDecode(token);
    const now = Date.now() / 1000;

    if (tokenExpiration && tokenExpiration > now) setIsAuthorized(true);
    else refreshToken();
  }, [refreshToken]);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
