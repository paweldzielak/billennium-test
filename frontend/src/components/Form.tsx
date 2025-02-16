import { FC, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { LoginMethod } from "../types";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

type FormProps = {
  route: string;
  method: LoginMethod;
};

const Form: FC<FormProps> = ({ route, method }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit: FormEventHandler = async (event: React.FormEvent<Element>) => {
    setLoading(true);
    event.preventDefault();

    await api.post(route, { username, password }).then(({ data }) => {
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, data.access);
        localStorage.setItem(REFRESH_TOKEN, data.refresh);
        navigate("/");
      } else navigate("/login");
    });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit" disabled={loading}>
        {name}
      </button>
    </form>
  );
};

export default Form;
