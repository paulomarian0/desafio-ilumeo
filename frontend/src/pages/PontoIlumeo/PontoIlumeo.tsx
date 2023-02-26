import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GetChecks } from "../../services/Checks";
import { AuthContext } from "../../context/AuthContext";

export function PontoIlumeo() {

  const { register, handleSubmit } = useForm();
  const {setUserCode} = useContext(AuthContext);
  const navigate = useNavigate();
  function onSubmit(data: string | any) {

    const {code} = data;

    GetChecks(code)
    .then((res) => {
      console.log(res)
      setUserCode(code);
      navigate('/checks')
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

    </div>
  )
}