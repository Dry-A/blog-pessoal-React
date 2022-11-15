import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Postagem from "../../../models/Postagem";
import { busca } from "../../../services/Service";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import "./ListaPostagem.css";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TokenState } from "./../../../store/tokens/TokensReducer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ListaPostagem() {
  const [postagem, setPostagem] = useState<Postagem[]>([]);
  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == "") {
      toast.error("Você precisa estar logado!!", {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
      navigate("/login");
    }
  }, [token]);

  async function getPostagem() {
    await busca("/postagens", setPostagem, {
      headers: {
        'Authorization': token,
      },
    });
  }

  useEffect(() => {
    getPostagem();
  }, [postagem.length]);

  return (
    <>
    {/* <div id="loader">
    <div className="ls-particles ls-part-1"></div>
    <div className="ls-particles ls-part-2"></div>
    <div className="ls-particles ls-part-3"></div>
    <div className="ls-particles ls-part-4"></div>
    <div className="ls-particles ls-part-5"></div>
    <div className="lightsaber ls-left ls-green"></div>
    <div className="lightsaber ls-right ls-red"></div>
  </div> */}
      {postagem.map((postagem) => (
        <Box m={10}>
          <Card variant="outlined">
            <CardContent className="card-post">
              <Typography color="textSecondary" gutterBottom>
                Postagens
              </Typography>
              <Typography variant="h5" component="h2">
                {postagem.titulo}
              </Typography>              
              <Typography variant="body2" component="p">
                {postagem.texto}
              </Typography>
              <Typography variant="body2" component="p">
                {postagem.tema?.descricao}
              </Typography>                                       
            </CardContent>
            <CardActions className="card-post">
              <Box display="flex" justifyContent="center" mb={1.5}>
                <Link
                  to={`/formularioPostagem/${postagem.id}`}
                  className="text-decoration"
                >
                  <Box mx={2}>
                    <Button
                      variant="contained"
                      className="btnAtualizar"
                      size="small"
                      color="primary"
                    >
                      Atualizar
                    </Button>
                  </Box>
                </Link>
                <Link
                  to={`/deletarPostagem/${postagem.id}`}
                  className="text-decoration"
                >
                  <Box mx={1}>
                    <Button variant="contained" size="small" color="secondary">
                      Deletar
                    </Button>
                  </Box>
                </Link>
              </Box>
            </CardActions>
          </Card>
        </Box>
      ))}
    </>
  );
}

export default ListaPostagem;
