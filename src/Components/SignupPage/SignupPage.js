import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import { UseAuth } from "../../context/AuthProvaider/UseAuth";
import HeaderLogin from "../header/HeaderLogin";
import Button from "../sharedcomponents/Button";
import Input from "../sharedcomponents/Input";
import Loader from "../sharedcomponents/Loader";




export default function SignupPage() {
    const [error, setError] = useState(false);
    const [loadfing, setLoading] = useState(false);
    const navigate = useNavigate();
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
    
      const nome = watch("nome", "");
      const email = watch("email", "");
      const password = watch("senha", "");
      const confirmPassword = watch("confirma", "");
    
      const auth = UseAuth();
    
      function submit(e) {
        if (error) return;
    
        const body = {
          name:nome,
          email,
          password
        };
    
        console.log(body);
        console.log(error);
        setLoading(true);
    
        auth
          .signup(body)
          .then((r) => {
            console.log(r);
            swal("", "Cadastro efetuado! Faça Login.", "success");
            navigate("/");
            setLoading(false);
          })
          .catch(() => setLoading(false));
      }
    
      useEffect(() => {
        if (auth.user !== null) navigate("/links");
      }, [auth.user]);
    
    return(
        <div>
            <HeaderLogin/>
            <Loader loading={loadfing} />
            <WrapInput onSubmit={handleSubmit(submit)}>
            <Input placeholder="Nome"{...register("nome", {
            required: "Campo obrigatório",
          })}
          err={errors.erronome}></Input>
          <ErrorMessage errors={errors} name="nome" as="p" />
            <Input placeholder="E-mail" {...register("email", {
            required: "Campo de email obrigatório",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Favor inserir um email válido",
            },
          })}
          err={errors.email}></Input>
          <ErrorMessage errors={errors} name="email" as="p" />
            <Input placeholder="Senha" {...register("senha", {
            required: "Campo obrigatório",
          })}
          type="password"
          err={errors.errosenha}></Input>
            <Input placeholder="Confirmar senha" {...register("confirma", {
            required: "Campo obrigatório",
            validate: (abc = confirmPassword) => {
              if (watch("senha") != abc) {
                return "Senhas não coincidem";
              }
            },
          })} type="password"  err={errors.erroconfirma} ></Input>
           <ErrorMessage errors={errors} name="confirma" as="p" />
            <Button> Criar conta</Button>
            </WrapInput>
        </div>
    )
}




const WrapInput = styled.form`
    margin-top: 128px;
    display: flex;
    flex-direction: column;
    align-items: center;

>input{
    margin-bottom: 25px;
}
`