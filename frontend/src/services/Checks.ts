import api from "./axios";

export async function GetChecks(code: string) {

  const payload = await api.get(`/checks?userCode=${code}`)
    .then((res) => {

      return res.data;
    })

  return payload;
}

export async function CheckIn(entryTime: string, userCode: string | any) {

  const data = {
    entryTime,
    userCode
  }

  const payload = await api.post('/checks',
    data
  )
    .then((res) => {

      return res.data;
    })

  return payload;
}

export async function CheckOut(id: number, departureTime: string) {

  const payload = await api.patch(`/checks/${id}`,
    {
      departureTime
    }
  )
    .then((res) => {

      return res.data;
    })

  return payload;
}