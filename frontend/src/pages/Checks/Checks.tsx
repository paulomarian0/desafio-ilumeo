import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
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
import moment from 'moment';
import utc from 'dayjs/plugin/utc';
import { UserName } from "../../components/UserName";

dayjs.extend(utc)

export function Checks() {

  const [check, setCheck] = useState<ICheckType[]>([]);
  const [isWorking, setIsWorking] = useState(false);
  const { userCode, setUserCode, setLastCheckId, lastCheckId, userName, setUserName, setNeedUpdateList, workedHoursToday, setWorkedHoursToday, checkInTime, setCheckInTime } = useContext(AuthContext);

  useEffect(() => {

    setUserCode(localStorage.getItem('userCode'));
    setUserName(localStorage.getItem('userName'));
    setWorkedHoursToday(localStorage.getItem('workedHours'));

    getListOfChecks(userCode)

  }, )

  function handleCheckIn() {
    const dateNow = dayjs(new Date).format("YYYY-MM-DDTHH:mm:ssZ")

    setCheckInTime(dateNow);

    CheckIn(dateNow, userCode)
      .then((res) => {
        console.log(res)
        setLastCheckId(res.id)
      })
      .catch((err) => {
        console.log(err)
      })

    setIsWorking(true);
    getListOfChecks(userCode);
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
    getListOfChecks(userCode);
    setNeedUpdateList(true);

    getTimeWorkedToday()
  }

  async function getListOfChecks(userCode: string) {

    await GetChecks(userCode)
      .then((res) => {
        setCheck(res)
        return res.data;
      })
  }

  function getTimeWorkedToday() {

    const initial = dayjs(checkInTime)
    const final = dayjs(new Date)

    const duration = dayjs(final).diff(dayjs(initial), 'seconds')

    const time = new Date(1970, 0, 1); //the initial time is 01 Jan 1970

    time.setSeconds(duration);

    const workedHours = dayjs(time).toDate()

    localStorage.setItem('workedHours', workedHours.toJSON())
  }

  return (
    <div className="check-container">
      {isWorking &&
        <h3>Trabalhando... Último ponto batido a x minutos</h3>
      }
      <Header>
        <Typography size={"11.6px"}>Relógio de ponto</Typography>
        <div style={{ textAlign: 'end' }}>
          <Typography size={"11.6px"}>#{userCode}</Typography>
          <UserName>{userName}</UserName>
        </div>

      </Header>

      <Typography size={"23.2px"}>{dayjs(workedHoursToday).format("HH:mm:ss")} h</Typography>
      <Typography size={"11.6px"}>Horas de hoje</Typography>
      <button disabled={check.length > 0} onClick={() => getTimeWorkedToday()}>Refresh</button>

      {isWorking ?
        <Button disabled={check.length > 1} onClick={handleCheckOut}>Hora de saída</Button>
        :
        <Button disabled={check.length > 0} onClick={handleCheckIn}>Hora de entrada</Button>
      }

      <Typography size={"10px"}>Dias anteriores</Typography>
      {check?.map((item: any) => (
        <CheckField key={item.id}>
          <Day>{dayjs(item.entryTime).format("DD/MM/YYYY")}</Day>
          <Hour>{moment(item.workedHours).utc().format(`HH:mm:ss`)}</Hour>
        </CheckField>
      ))}

    </div>
  )
}