import { FC } from "react";
import LoginForm from "../components/LoginForm";

const Login: FC = () => {
  return <LoginForm route="/api/token/" method="login" />;
};

export default Login;