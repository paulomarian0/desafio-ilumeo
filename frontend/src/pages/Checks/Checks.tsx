import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Button } from "../../components/Button";
import { CheckField } from "../../components/CheckField";
import { Day } from "../../components/Day";
import { Header } from "../../components/Header";
import { Hour } from "../../components/Hour";
import { Typography } from "../../components/Typography";
import { ICheckType } from "../../types/ChecksType";
import './styles.css';
import moment from "moment";

export function Checks() {

  const location = useLocation();
  const x = "h";
  const [check, setCheck] = useState<ICheckType[]>([]);

  useEffect(() => {
    setCheck(location.state.checks)
    console.log(check)
  })

  return (
    <div className="check-container">
      <Header>

        <Typography size={"11.6px"}>Relógio de ponto</Typography>
        <div>
          <Typography size={"11.6px"}>codigo</Typography>
          <h5>Usuario</h5>
        </div>

      </Header>

      <Typography size={"23.2px"}>0h 00m</Typography>
      <Typography size={"11.6px"}>Horas de hoje</Typography>

      <Button>Hora de entrada</Button>

      <Typography size={"10px"} >Dias anteriores</Typography>
      {check?.map((item: any) => (
        <CheckField>
          <Day>{moment(item.entryTime).format("DD/MM/YYYY")}</Day>
          <Hour>{moment(item.workedHours).add(3, 'hours').format(`hh:mm`)}</Hour>
        </CheckField>
      ))}

    </div>
  )
}