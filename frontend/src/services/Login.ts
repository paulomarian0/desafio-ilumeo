import { api } from "./axios";

export async function LoginRequest() {
  const payload = await api.get('/checks')
    .then((res) => {
      return res.data;
    })

  return payload;
}