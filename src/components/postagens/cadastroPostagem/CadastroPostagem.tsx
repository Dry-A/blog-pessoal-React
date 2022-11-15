import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import "./CadastroPostagem.css";
import { useNavigate, useParams } from "react-router-dom";
import Tema from "../../../models/Tema";
import Postagem from "../../../models/Postagem";
import { busca, buscaId, post, put } from "../../../services/Service";
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import { TokenState } from './../../../store/tokens/TokensReducer';

function CadastroPostagem() {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [temas, setTemas] = useState<Tema[]>([]);
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == "") {
      toast.error("Você precisa estar logado!!",{
        position:"top-right",
        autoClose: 3500,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: false,
        theme:"colored",
        progress: undefined
      });
      navigate("/login");
    }
  }, [token]);

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: "",
  });

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: "",
    texto: "",
    tema: null,
  });

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  useEffect(() => {
    getTemas();
    if (id !== undefined) {
      findByIdPostagem(id);
    }
  }, [id]);

  async function getTemas() {
    await busca("/temas", setTemas, {
      headers: {
        'Authorization': token,
      },
    });
  }

  async function findByIdPostagem(id: string) {
    await buscaId(`postagens/${id}`, setPostagem, {
      headers: {
        'Authorization': token
      },
    });
  }

  function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
    });
  }

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (id !== undefined) {
      try {
        await put("/postagens", postagem, setPostagem, {
          headers: {
            'Authorization': token,
          },
        });
        toast.success("Postagem atualizada com sucesso!!",{
          position:"top-right",
          autoClose: 3500,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: false,
          theme:"colored",
          progress: undefined
        });
      } catch (error) {
        toast.error("Erro ao atualizar postagem!!",{
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
      try {
        await post("/postagens", postagem, setPostagem, {
          headers: {
            'Authorization': token,
          },
        });
        toast.success("Postagem cadastrada com sucesso!!",{
          position:"top-right",
          autoClose: 3500,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: false,
          theme:"colored",
          progress: undefined
        });
      } catch (error) {
        toast.error("Falha ao cadastrar postagem!!",{
          position:"top-right",
          autoClose: 3500,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: false,
          theme:"colored",
          progress: undefined
        });
      }
    }
    back();
  }

  function back() {
    navigate("/postagem");
  }

  return (
    <>
    <Container maxWidth="sm" className="topo">
      
        <form onSubmit={onSubmit}>

        <Typography
          variant="h3"
          color="textSecondary"
          component="h1"
          align="center"
        >
          Faça uma postagem
        </Typography>

        <TextField
          id="titulo"
          value={postagem.titulo}
          onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagem(event) }
          label="Titulo"
          variant="outlined"
          name="titulo"
          margin="normal"
          fullWidth
        />

        {/* multiline minrow deica o form com mais espaço para o campo de texto */}
        <TextField
          id="texto"
          value={postagem.texto}
          onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagem(event) }
          label="Texto"
          name="texto"
          variant="outlined"
          margin="normal"
          multiline
          minRows={4}
          fullWidth
        />
        <FormControl>
          <InputLabel id="temasSelect">Tema </InputLabel>
          <Select labelId='temasSelect' id='temas' 
            onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema, {
              headers: {
                Authorization: token
              }
            })}>
              
              {temas.map((temas) => (
                <MenuItem value={temas.id}>{temas.descricao}</MenuItem>
              ))}
              </Select>

          <FormHelperText>Escolha um tema para a postagem</FormHelperText>
          
          <Button
            className="btnCadastroPost"
            type="submit"
            variant="contained"
            color="primary"
            disabled={tema.id === 0}
          >
            Enviar
          </Button>
        </FormControl>
      </form>
       
      
    </Container>

    </>
  );
}
export default CadastroPostagem;
