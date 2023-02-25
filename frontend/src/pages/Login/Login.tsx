import { useEffect } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import './styles.css';
import { useForm } from "react-hook-form";
import { ILoginRequestType } from "../../types/ILoginRequestType";
import { LoginRequest } from "../../services/Login";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { PontoIlumeo } from "../PontoIlumeo/PontoIlumeo";

export function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  function onSubmit (data: ILoginRequestType | any) {

    LoginRequest(data)
    .then((res) => {
      console.log(res)
      localStorage.setItem('token',res.access_token)

      navigate("/pontoilumeo")

      window.location.reload();
    })
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="email" {...register("email", {})} />
        <Input type="password" placeholder="password" {...register("password", {})} />

        <Button type="submit" >Login</Button>
      </form>
      <a>Create account</a>
    </div>
  )
}