import { FC } from "react";
import LoginForm from "../components/LoginForm";

const Register: FC = () => {
  return <LoginForm route="/api/user/register/" method="register" />;
};

export default Register;