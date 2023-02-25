import api  from "./axios";

export async function GetChecks(data: any){

  const {code} = data

  const payload = await api.get(`/users?code=${code}`)
  .then((res) => {

    return res.data;
  })

  return payload;
}