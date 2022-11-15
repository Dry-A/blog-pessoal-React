import React, { useState } from "react";
import { AppBar, Tab, Tabs, Typography } from "@material-ui/core";
import { TabContext, TabPanel } from "@material-ui/lab";
import ListaPostagem from "../listaPostagem/ListaPostagem";
import "./TabPostagem.css";
import { Box } from "@mui/material";

function TabPostagem() {
  // setValue muda automaticamente o valor. se mudar de 1 para 2, não precisa fazer na mão
  const [value, setValue] = useState("1");
  function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
    setValue(newValue);
  }

  return (
    <>
      <TabContext value={value}>
        <AppBar position="static">
          <Tabs centered indicatorColor="secondary" className="tabPostagem" onChange={handleChange}>
            <Tab label="Todas as postagens" value="1" />
            <Tab label="Sobre" value="2" />
          </Tabs>
        </AppBar>
        <TabPanel value="1">
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <ListaPostagem />
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Typography
            variant="h5"
            gutterBottom
            color="textPrimary"
            component="h4"
            align="center"
            className="titulo"
          >
            Sobre mim
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            color="textPrimary"
            align="justify"
          >
            <h2 className="tabPostagem1">
              <a href="https://www.linkedin.com/in/audrey-albuquerque/" target= ' blank' className="tabPostagem" >Audrey Helfstein</a> </h2>
              <p className="tabPostagem">
                Desenvolvedora Fullstack Java
              </p>
              <p className="tabPostagem">
              Sou persistente e proativa. 
🛩 Tenho formação em Marketing pela Mackenzie,  
              </p> 
              <p className="tabPostagem">
              🚀desenvolvedora Java Full-Stack Junior pela Generation Brasil, <br></br> 
✈graduanda do curso Superior em Sistemas para Internet e <br></br>
 🛫aluna do curso de Java pela Fiap.
              </p>
              <p className="tabPostagem">
                Faço voluntariado dando aulas de reforço de matemática para crianças de 7 a 10 anos.
              </p>
              <p className="tabPostagem">
                Adoraria contribuir para seu projeto. 
              </p>   
      
          </Typography>
        </TabPanel>
      </TabContext>
    </>
  );
}
export default TabPostagem;
