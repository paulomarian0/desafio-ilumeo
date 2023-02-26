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
import { ArrowCounterClockwise } from "phosphor-react";
import { notification } from "antd";

dayjs.extend(utc)

export function Checks() {

  const [check, setCheck] = useState<ICheckType[]>([]);
  const [isWorking, setIsWorking] = useState(false);
  const { userCode, setUserCode, setLastCheckId, lastCheckId, userName, setUserName, setNeedUpdateList, workedHoursToday, setWorkedHoursToday, checkInTime, setCheckInTime } = useContext(AuthContext);

  useEffect(() => {

    setUserCode(localStorage.getItem('userCode'));
    setUserName(localStorage.getItem('userName'));
    setWorkedHoursToday(localStorage.getItem('workedHours'));

    setTimeout(() => {
      getListOfChecks(userCode);
    }, 60000)

    if (isWorking === false) {
      localStorage.setItem('workedHours', "1970-01-01T03:00:00.000Z")
    }

    getTimeWorkedToday();

  },)

  function handleCheckIn() {
    const dateNow = dayjs(new Date).format("YYYY-MM-DDTHH:mm:ssZ")

    setCheckInTime(dateNow);

    CheckIn(dateNow, userCode)
      .then((res) => {
        setLastCheckId(res.id)
      })
      .catch((err) => {
        console.log(err)
      })

    setIsWorking(true);
    getListOfChecks(userCode);
    setNeedUpdateList(true);

    notification.success({ message: 'Check In successfully!' });

  }

  function handleCheckOut() {
    const dateNow = dayjs(new Date).format("YYYY-MM-DDTHH:mm:ssZ")

    CheckOut(lastCheckId, dateNow)
      .then((res) => {
        return res.data
      })

    getTimeWorkedToday();
    setIsWorking(false);
    setNeedUpdateList(true);
    getListOfChecks(userCode);

    notification.success({ message: 'Check Out successfully!' });
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
        <div style={{ marginBottom: '2rem' }}>
          <Typography>Trabalhando...</Typography>
          <br />
          <Typography>Último ponto batido a {dayjs(checkInTime).format("DD/MM/YYYY HH:mm:ss")}</Typography>
        </div>
      }
      <Header >
        <Typography size={"11.6px"}>Relógio de ponto</Typography>
        <div style={{ textAlign: 'end' }}>
          <Typography size={"11.6px"}>#{userCode}</Typography>
          <UserName>{userName}</UserName>
        </div>

      </Header>

      <Typography size={"23.2px"}>{(dayjs(workedHoursToday).format("HH:mm"))} h</Typography>
      <Typography size={"11.6px"}>Horas de hoje</Typography>

      {isWorking ?
        <Button onClick={handleCheckOut}>Hora de saída</Button>
        :
        <Button onClick={handleCheckIn}>Hora de entrada</Button>
      }

      <Typography size={"10px"}>Dias anteriores</Typography>
      <i style={{ color: 'white' }} onClick={() => getListOfChecks(userCode)}>
        <ArrowCounterClockwise size={32} />
      </i>

      {check?.map((item: any) => (
        <CheckField key={item.id}>
          <Day>{dayjs(item.entryTime).format("DD/MM/YYYY")}</Day>
          <Hour>{moment(item.workedHours).utc().format(`HH:mm:ss`)} h</Hour>
        </CheckField>
      ))}

    </div>
  )
}