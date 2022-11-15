import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { Box } from "@mui/material";
import "./Footer.css";
import { useSelector } from 'react-redux';
import { TokenState } from './../../../store/tokens/TokensReducer';
import { GitHub, LinkedIn } from "@material-ui/icons";

function Footer() {

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  var footerComponent;

  if (token !== "") {
    footerComponent =
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid alignItems="center" item xs={12}>
          <Box className="box1">
            <Box
              paddingTop={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                className="textos"
              >
                {" "}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" className="redes">
              <a href="https://github.com/Dry-A" target="_blank">
                <GitHub style={{ fontSize: 60, color: 'white' }} />
              </a>
              <a
                href="https://www.linkedin.com/in/audrey-albuquerque/"
                target="_blank">
                <LinkedIn style={{ fontSize: 60, color: 'white' }} />
              </a>
            </Box>
          </Box>
            
        </Grid>
      </Grid>
  }

  return (
    <>
      {footerComponent}
    </>
  );
}

export default Footer;
