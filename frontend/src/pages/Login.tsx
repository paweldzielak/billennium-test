import { FC } from "react";
import Form from "../components/Form";


const Login: FC = () => {
  return <Form route="/api/token/" method="login" />;
}

export default Login;