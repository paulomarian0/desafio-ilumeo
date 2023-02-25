import { useEffect } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { LoginRequest } from "../../services/Login";
import './styles.css';

export function Login() {

 
  useEffect(() => {
    LoginRequest().then((res) => {
      console.log(res)
    })
  })

  return (
    <div className="login-container">
      <h1>Login</h1>
      <Input placeholder="email" />
      <Input placeholder="password" />
      <Button>Login</Button>
      <a>Create account</a>
    </div>
  )
}