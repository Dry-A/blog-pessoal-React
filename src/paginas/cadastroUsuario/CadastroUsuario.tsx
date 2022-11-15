import { Grid, Typography, Button, TextField } from "@material-ui/core";
import { Box } from "@mui/material";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CadastroUsuario.css";
import { cadastroUsuario } from "../../services/Service";
import User from "../../models/User";
import {toast} from 'react-toastify';


function CadastroUsuario() {
  let navigate = useNavigate();
  const [confirmarSenha, setConfirmarSenha] = useState<String>("");
  const [user, setUser] = useState<User>({
    id: 0,
    nome: "",
    foto: "",
    usuario: "",
    senha: "",
  });

  const [userResult, setUserResult] = useState<User>({
    id: 0,
    nome: "",
    foto: "",
    usuario: "",
    senha: "",
  });

  useEffect(() => {
    if (userResult.id != 0) {
      navigate("/login");
    }
  }, [navigate, userResult]);

  function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  // =  atribuição de valor
  // ==  checa o conteudo
  // ===  checa conteudo e tipagem

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (confirmarSenha === user.senha && user.senha.length >= 3) {
      try {
        await cadastroUsuario("/usuarios/cadastrar", user, setUserResult);
        toast.success("Usuário cadastrado com sucesso!!",{
          position:"top-right",
          autoClose: 3500,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: false,
          theme:"colored",
          progress: undefined
        });
      } catch (error) {
        toast.error("Falha ao cadastrar com sucesso!!",{
          position:"top-right",
          autoClose: 3500,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: false,
          theme:"colored",
          progress: undefined
        });
      }
    } else {
      toast.error("Os dados não conferem! Verifique novamente",{
        position:"top-right",
        autoClose: 3500,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: false,
        theme:"colored",
        progress: undefined
      });

      setUser({ ...user, senha: "" });
      setConfirmarSenha("");
    }
  }

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="cadastroPagina"
      >
      
        <Grid item xs={6} >

          <Box alignItems="center" paddingX={5}>
            <form onSubmit={onSubmit}>
              <Typography className="texto2">Cadastrar</Typography>
              <TextField
                value={user.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                label="Nome Completo"
                name="nome"
                fullWidth
                margin="normal"
              />
              <TextField
                value={user.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                label="Usuário (e-mail)"
                name="usuario"
                fullWidth
                margin="normal"
              />
              <TextField
                value={user.foto}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                label="Foto"
                name="foto"
                fullWidth
                margin="normal"
              />
              <TextField
                value={user.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                label="Senha"
                name="senha"
                type="password"
                fullWidth
                margin="normal"
              />
              <TextField
                value={confirmarSenha}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  confirmarSenhaHandle(e)
                }
                label="Confirmar senha"
                name="confirmarSenha"
                type="password"
                fullWidth
                margin="normal"
              />
              <Link to="/login" className="text-decoration">
                <Button
                  variant="contained"
                  color="secondary"
                  className="btnCancelar"
                >
                  Cancelar
                </Button>
              </Link>
              <Button
                variant="contained"
                type="submit"
                className="btnCadastrar"
              >
                Cadastrar
              </Button>
            </form>

          </Box>

          <Grid item xs={12} color='white'>
          Feito por Audrey Albuquerque
        </Grid>

        </Grid>
      </Grid>  
      </>
  );
}

export default CadastroUsuario;
