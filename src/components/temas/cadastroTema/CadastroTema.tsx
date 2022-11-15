import React, { useState, useEffect, ChangeEvent } from "react";
import { Container, Grid, Typography, TextField, Button } from "@material-ui/core";
import Tema from "../../../models/Tema";
import { buscaId, post, put } from "../../../services/Service";
import { useNavigate, useParams } from "react-router-dom";
import { TokenState } from './../../../store/tokens/TokensReducer';
import { useSelector } from 'react-redux';
import './CadastroTema.css';
import { toast } from 'react-toastify';

function CadastroTema() {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: "",
  });

  useEffect(() => {
    if (token == "") {
      toast.error("Você precisa estar logado!!", {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined
      });
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  async function findById(id: string) {
    buscaId(`/tema/${id}`, setTema, {
      headers: {
        'Authorization': token,
      },
    });
  }

  function updatedTema(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log("tema " + JSON.stringify(tema))

    if (id !== undefined) {
      // console.log(tema)
      // se não tem id, ele tenta atualizar , senão mostra o erro..Senão ele faz o post do tema, e se n der certo, aí ele dá o erro 
      try {
        await put("/temas", tema, setTema, {
          headers: {
            Authorization: token,
          },
        });
        toast.success("Tema atualizado com sucesso!!", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined
        });
      } catch (error) {
        toast.error("Falha ao atualizar tema!!", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined
        });
      }
    } else {
      try {
        await post("/temas", tema, setTema, {
          headers: {
            Authorization: token,
          },
        });
        toast.success("Tema cadastrado com sucesso!!", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined
        });
      } catch (error) {
        toast.error("Falha ao cadastrar tema!!", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined
        });
      }
    }
    back();
  }

  function back() {
    navigate("/temas");
  }

  return (

    <Grid container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className='cadastroTemaPagina'>
      <Container maxWidth="sm" className="topo">

        <form onSubmit={onSubmit}>
          <Typography
            variant="h3"
            color="textSecondary"
            component="h1"
            align="center"
            className="cad-tema"
          >
            Cadastrar tema
          </Typography>

          <TextField
            value={tema.descricao}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updatedTema(event)
            }
            id="descricao"
            label="Descrição"
            variant="outlined"
            name="descricao"
            margin="normal"
            fullWidth
          />
          <Button type="submit" color="primary" variant="contained" className="btnCad">
            Enviar
          </Button>
        </form>

      </Container>
    </Grid>
  );
}

export default CadastroTema;
