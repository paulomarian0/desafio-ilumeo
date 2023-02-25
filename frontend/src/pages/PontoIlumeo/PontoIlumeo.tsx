import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function PontoIlumeo() {
  return (
    <div className='container'>
      <div>
        <div className='ponto-ilumeo'>
          <span>Ponto </span><strong>Ilumeo</strong>
        </div>
        <br />
        <Input placeholder='Código do usuário' />
      </div>
      <Button>Confirmar</Button>
    </div>
  )
}