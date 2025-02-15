import { FC } from "react";
import Form from "../components/Form";


const Register: FC = () => {
  return <Form route="/api/user/register/" method="register" />;
}

export default Register;