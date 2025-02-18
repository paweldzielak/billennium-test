import { FC, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { LoginMethod } from "../types";
import LoadingIndicator from "./LoadingIndicator";
import { FormButton, FormInput, StyledForm } from "./styles/Form.styled";

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
        console.log({ data });

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
      <StyledForm onSubmit={handleSubmit}>
        <h1 style={{ textTransform: "capitalize" }}>{method}</h1>
        <FormInput type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <FormInput
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {method === "login" && <a href="/register">Don't have an account? Register now!</a>}
        {loading && <LoadingIndicator />}
        <FormButton type="submit" disabled={loading}>
          {method}
        </FormButton>
      </StyledForm>
    </>
  );
};

export default LoginForm;
