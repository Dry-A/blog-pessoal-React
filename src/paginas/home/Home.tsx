import React, { useEffect } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import "./Home.css";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import TabPostagem from "../../components/postagens/tabpostagem/TabPostagem";
import { useSelector } from "react-redux";
import { TokenState } from "./../../store/tokens/TokensReducer";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import ModalPostagem from "../../components/postagens/modalPostagem/Modalpostagem";


function Home() {

  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

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
 
  return (
    <>
      <Grid
        container
        
        className="box"
      >
        <Grid alignItems="center" justifyContent="space-around" item xs={6}>
          
          <Box display="flex" justifyContent="center">
            <Box marginRight={1}>
              <ModalPostagem />
            </Box>

            <Link to="./postagens" className="text-decoration">
            <Button variant="outlined" className="button">
              Ver Postagens
            </Button>
            </Link>            
          </Box>
        </Grid>

        
        <Grid xs={12} className="postagens">
          <TabPostagem />
        </Grid>
      </Grid>
     
    </>
  );
}

export default Home;
