import { useContext, useEffect } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import './styles.css';
import { useForm } from "react-hook-form";
import { ILoginRequestType } from "../../types/ILoginRequestType";
import { LoginRequest } from "../../services/Login";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Typography } from "../../components/Typography";

export function Login() {
  const { register, handleSubmit } = useForm();
  const { setUserCode, setUserName } = useContext(AuthContext);
  const navigate = useNavigate();

  function onSubmit(data: ILoginRequestType | any) {

    LoginRequest(data)
      .then((res) => {
        console.log(res)
        localStorage.setItem('token', res.access_token)
        localStorage.setItem('userCode', res.code)
        localStorage.setItem('userName', res.name)
        navigate("/pontoilumeo")

        window.location.reload();
      })
  }

  return (
    <div className="login-container">
      <Typography size={"30px"}>Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="email" {...register("email", {})} />
        <Input type="password" placeholder="password" {...register("password", {})} />

        <Button type="submit" >Login</Button>
      </form>
      <Typography onClick={() => navigate("/register") }>Create account</Typography>
    </div>
  )
}