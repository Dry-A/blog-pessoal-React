import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core";
import "./DeletarPostagem.css";
import { Box } from "@mui/material";
import Postagem from "../../../models/Postagem";
import { buscaId, deleteId } from "../../../services/Service";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {toast} from 'react-toastify';
import { TokenState } from "./../../../store/tokens/TokensReducer";

function DeletarPostagem() {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  const [postagem, setPostagem] = useState<Postagem>();

  useEffect(() => {
    if (token === "") {
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

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  async function findById(id: string) {
   await buscaId(`/postagens/${id}`, setPostagem, {
      headers: {
        'Authorization': token,
      },
    });
  }

  function sim() {
    navigate("/postagem");
    deleteId(`/postagens/${id}`, {
      headers: {
        'Authorization': token
      },
    });
    toast.success("Postagem apagada com sucesso!!",{
      position:"top-right",
      autoClose: 3500,
      hideProgressBar: false,
      pauseOnHover: false,
      draggable: false,
      theme:"colored",
      progress: undefined
    });
  }

  function nao() {
    navigate("/postagem");
  }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Postagem:
              </Typography>
              <Typography color="textSecondary">{postagem?.titulo}</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
              <Box mx={2}>
                <Button
                  onClick={sim}
                  variant="contained"
                  className="btnDelPost"
                  size="large"
                  color="primary"
                >
                  Sim
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={nao}
                  variant="contained"
                  size="large"
                  color="secondary"
                >
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarPostagem;
