import api  from "./axios";

export async function GetChecks(code: string){

  const payload = await api.get(`/checks?code=${code}`)
  .then((res) => {

    return res.data;
  })

  return payload;
}