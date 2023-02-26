import api  from "./axios";

export async function CreateAccountRequest(request: any) {

  const { email, password, name } = request;

  const payload = await api.post('/users', {
    name,
    email,
    password
  })
    .then((res) => {
      return res.data;
    })

  return payload;
}