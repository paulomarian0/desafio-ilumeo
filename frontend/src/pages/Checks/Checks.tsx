import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { CheckField } from "../../components/CheckField";
import { Day } from "../../components/Day";
import { Hour } from "../../components/Hour";
import { ICheckType } from "../../types/ChecksType";

export function Checks() {

  const location = useLocation();
  const [check, setCheck] = useState<ICheckType[]>([]);

  useEffect(() => {
    setCheck(location.state.checks)
  })

  return (
    <div>
      {check?.map((item: any) => (
        <CheckField>
          <Day>{item.id}</Day>
          <Hour>{item.id}</Hour>
        </CheckField>
      ))}

    </div>
  )
}