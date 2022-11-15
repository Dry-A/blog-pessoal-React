import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link as Breadlink } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TokenState } from './../../../store/tokens/TokensReducer';
import { addToken } from "../../../store/tokens/Actions";
import './Navbar.css';
import { useSelector } from "react-redux";
import {toast} from 'react-toastify';

function Navbar() {

  const dispatch = useDispatch();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  let navigate = useNavigate();

  function logout() {
    dispatch(addToken(''));
    toast.success('Usuário deslogado com sucesso',{
      position:"top-right",
      autoClose: 3500,
      hideProgressBar: false,
      pauseOnHover: false,
      draggable: false,
      theme:"colored",
      progress: undefined
    })
    navigate('/login')
  }

  var navbarComponent;

  if (token != "") {
    navbarComponent = 
    <div className="navBar">
      <Breadcrumbs aria-label="breadcrumb"  >

        <Link to="/home" className="text-decoration" color="black">
          <Breadlink color="primary" className="navBar">Home</Breadlink>
        </Link>

        <Link to="/postagem" className="text-decoration" color="black">
          <Breadlink color="primary"  className="navBar">Postagens</Breadlink>
        </Link>

        <Link to="/tema" className="text-decoration" color="black">
          <Breadlink color="primary"  className="navBar">Temas</Breadlink>
        </Link>

        <Link to="/formularioTema" className="text-decoration" color="black">
          <Breadlink color="primary"  className="navBar">Cadastrar tema</Breadlink>
        </Link>

        <Breadlink className="text-decoration"  onClick={logout}>
          Sair
        </Breadlink> 

      </Breadcrumbs>
    </div>
  }

  return (
    <>
    {navbarComponent}
    </>    
  );
}

export default Navbar;