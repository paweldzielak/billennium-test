import { FC, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { LoginMethod } from "../types";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Form.css";

type LoginFormProps = {
  route: string;
  method: LoginMethod;
};

const LoginForm: FC<LoginFormProps> = ({ route, method }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit: FormEventHandler = async (event: React.FormEvent<Element>) => {
    setLoading(true);
    event.preventDefault();

    await api
      .post(route, { username, password })
      .then(({ data }) => {
        if (method === "login") {
          localStorage.setItem(ACCESS_TOKEN, data.access);
          localStorage.setItem(REFRESH_TOKEN, data.refresh);
          navigate("/");
        } else navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Cannot login, try again later.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <form onSubmit={handleSubmit} className="form-container">
        <h1 className="capitalize">{method}</h1>
        <input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {method === "login" && <a href="/register">Don't have an account? Register now!</a>}
        {loading && <LoadingIndicator />}
        <button className="form-button capitalize" type="submit" disabled={loading}>
          {method}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
