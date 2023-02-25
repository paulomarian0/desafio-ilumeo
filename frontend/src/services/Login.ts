import { ILoginRequestType } from "../types/ILoginRequestType";
import api  from "./axios";

export async function LoginRequest(loginRequest: ILoginRequestType) {

  const { email, password } = loginRequest;

  const payload = await api.post('/login', {
    email,
    password
  })
    .then((res) => {
      return res.data;
    })

  return payload;
}