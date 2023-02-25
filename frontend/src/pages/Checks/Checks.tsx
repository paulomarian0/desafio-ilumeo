import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { IUserType } from "../../types/IUserType";

export function Checks() {

  const location = useLocation();
  const [check, setCheck] = useState<IUserType[]>([]);

  useEffect(() => {
    setCheck(location.state.checks)
    console.log(location.state.checks[0].checks[0])
  })
  
  return (
    <div>
  

    </div>
  )
}