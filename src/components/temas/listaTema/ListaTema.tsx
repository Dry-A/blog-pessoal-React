import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import { Box } from "@mui/material";
import "./ListaTema.css";
import Tema from "../../../models/Tema";
import { busca } from "../../../services/Service";
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import { TokenState } from './../../../store/tokens/TokensReducer';

function ListaTema() {
  const [temas, setTemas] = useState<Tema[]>([]);
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  let navigate = useNavigate();

  useEffect(() => {
    if (token == "") {
      toast.success("Você precisa estar logado!!",{
        position:"top-right",
        autoClose: 3500,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: false,
        theme:"colored",
        progress: undefined
      })
      navigate("/login");
    }
  }, [token]);

  async function getTema() {
    await busca("/temas", setTemas, {
      headers: {
        'Authorization': token,
      },
    });
  }

  useEffect(() => {
    getTema();
  }, [temas.length]);

  return (
    <>
      {temas.map((tema) => (
        <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className='listaTemaPagina'>
          
        <Box m={10}>
          <Card variant="outlined" >
            <CardContent className="card-tema">
              <Typography color="textSecondary" gutterBottom>
                Tema
              </Typography>
              <Typography variant="h5" component="h2">
                {tema.descricao}
              </Typography>
            </CardContent>
            <CardActions  className="card-tema">
              <Box display="flex" justifyContent="center" mb={1.5}>
                <Link to={`/formularioTema/${tema.id}`} className="text-decoration">
                  <Box mx={1}>
                    <Button
                      variant="contained"
                      className="btnAtualizar"
                      size="small"
                      
                    >
                      Atualizar
                    </Button>
                  </Box>
                </Link>
                <Link to={`/deletarTema/${tema.id}`}  className="text-decoration">
                  <Box mx={1}>
                    <Button variant="contained" size="small" >
                      Deletar
                    </Button>
                  </Box>
                </Link>
              </Box>
            </CardActions>
          </Card>
        </Box>
        </Grid>
      ))}
    </>
  );
}

export default ListaTema;
