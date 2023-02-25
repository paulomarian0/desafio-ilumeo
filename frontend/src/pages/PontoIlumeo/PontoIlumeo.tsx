import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useForm } from 'react-hook-form';
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { GetChecks } from "../../services/Checks";

export function PontoIlumeo() {

  const { register, handleSubmit } = useForm();
  const [listChecks, setListChecks] = useState();

  function onSubmit(code: string | any) {
    GetChecks(code)
    .then((res) => {
      console.log(res)
      setListChecks(res);
    })
  }

  return (
    <div className='container'>
      <div className='ponto-ilumeo'>
        <span>Ponto </span><strong>Ilumeo</strong>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="Digite o código do usuário" {...register("code", {})} />

        <Button type="submit">Confirmar</Button>
      </form>
      {listChecks &&
        <Navigate to="/checks" state={{checks: listChecks }} replace={true} />
      }
    </div>
  )
}