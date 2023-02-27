import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { CreateAccountRequest } from '../../services/User';
import './styles.css';
import {notification} from 'antd';
import { Typography } from '../../components/Typography';

export function CreateAccount() {

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()

  function onSubmit(data: any) {

    CreateAccountRequest(data)
      .then((res) => {

        console.log(res.data)
        navigate("/login")

        notification.success({ message: 'Account Created successfully!' });
        return res.data;
      })
      .catch((err) => {
        notification.error({ message: err.message });
        return err;

      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography size={"40px"}>Create Account</Typography>
      <Input type="text" placeholder="name" {...register("name", {})} />
      <Input type="text" placeholder="email" {...register("email", {})} />
      <Input type="password" placeholder="password" {...register("password", {})} />

      <Button type="submit">Create Account</Button>
    </form>
  )
}