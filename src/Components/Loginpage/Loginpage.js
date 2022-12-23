import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import Swal from "sweetalert";
import { UseAuth } from "../../context/AuthProvaider/UseAuth";
import HeaderLogin from "../header/HeaderLogin";
import Button from "../sharedcomponents/Button";
import Input from "../sharedcomponents/Input";
import Loader from "../sharedcomponents/Loader";

export default function Loginpage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError | all",
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined,
  });

  const watchEmail = watch("email", "");
  const watchSenha = watch("senha", "");
  const auth = UseAuth();

  function onFinish(e) {
    setLoading(true);
    auth
      .authenticate(watchEmail, watchSenha)
      .then((res) => {
        setLoading(false);
        navigate("/");
        console.log(res);
      })
      .catch((err) => {
        swal("Ops", "Usuário ou senha inválidos!", "error");
        setLoading(false);
        console.log(err, "Erro");
      });
  }

  useEffect(() => {
    if (auth.user !== null) navigate("/links");
  }, [auth.user]);

  return (
    <div>
      <HeaderLogin />

      <Wrap onSubmit={handleSubmit(onFinish)}>
        <Loader loading={loading} />
        <Input
          placeholder="E-mail"
          {...register("email", {
            required: "Campo de email obrigatório",
            pattern: {
              value:
                /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Favor inserir um email válido",
            },
          })}
          err={errors.email}
        ></Input>
        <ErrorMessage errors={errors} name="email" as="p" />
        <Input
          placeholder="Senha"
          type="password"
          err={errors.senha}
          {...register("senha", {
            required: `Campo obrigatório`,
          })}
        ></Input>
        <ErrorMessage errors={errors} name="senha" as="p" />
        <Button> Entrar </Button>
      </Wrap>
    </div>
  );
}

const Wrap = styled.form`
  margin-top: 128px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > input {
    margin-bottom: 25px;
  }
`;
