import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Button } from "../../components/Button";
import { CheckField } from "../../components/CheckField";
import { Day } from "../../components/Day";
import { Header } from "../../components/Header";
import { Hour } from "../../components/Hour";
import { Typography } from "../../components/Typography";
import { AuthContext } from "../../context/AuthContext";
import { CheckIn, CheckOut, GetChecks } from "../../services/Checks";
import { ICheckType } from "../../types/ChecksType";
import './styles.css';

export function Checks() {

  const [check, setCheck] = useState<ICheckType[]>([]);
  const [isWorking, setIsWorking] = useState(false);
  const { userCode, setUserCode, setLastCheckId, lastCheckId, userName, setUserName, setNeedUpdateList, needUpdateList } = useContext(AuthContext);

  useEffect(() => {
    setUserCode(localStorage.getItem('userCode'));
    setUserName(localStorage.getItem('userName'));
    
    getListOfChecks(userCode);

    setNeedUpdateList(false);
  }, [needUpdateList])

  function handleCheckIn() {
    const dateNow = dayjs(new Date).format("YYYY-MM-DDTHH:mm:ssZ")

    console.log("hora do checkin", dateNow)
    CheckIn(dateNow, userCode)
      .then((res) => {
        setLastCheckId(res.id)
      })
      .catch((err) => {
        console.log(err)
      })

    setIsWorking(true);

    setNeedUpdateList(true);
  }

  function handleCheckOut() {

    const dateNow = dayjs(new Date).format("YYYY-MM-DDTHH:mm:ssZ")
    console.log("hora do cejhckout", dateNow)

    CheckOut(lastCheckId, dateNow)
      .then((res) => {
        return res.data
      })

    setIsWorking(false);

    setNeedUpdateList(true);
  }

  async function getListOfChecks(userCode: string) {

    await GetChecks(userCode)
      .then((res) => {
        setCheck(res)
        return res.data;
      })
  }

  return (
    <div className="check-container">
      <Header>
        <h1>{lastCheckId}</h1>
        <Typography size={"11.6px"}>Relógio de ponto</Typography>
        <div>
          <Typography size={"11.6px"}>{userCode}</Typography>
          <Typography>{userName}</Typography>
        </div>

      </Header>

      <Typography size={"23.2px"}>0h 00m</Typography>
      <Typography size={"11.6px"}>Horas de hoje</Typography>

      {isWorking ?
        <Button onClick={handleCheckOut}>Hora de saída</Button>
        :
        <Button onClick={handleCheckIn}>Hora de entrada</Button>
      }

      <Typography size={"10px"}>Dias anteriores</Typography>
      {check?.map((item: any) => (
        <CheckField>
          <Day>{dayjs(item.entryTime).format("DD/MM/YYYY")}</Day>
          <Hour>{dayjs(item.workedHours).format(`hh:mm`)}</Hour>
        </CheckField>
      ))}

    </div>
  )
}