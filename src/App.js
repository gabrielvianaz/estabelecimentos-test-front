import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Cadastro from './Pages/Cadastro';
import Ativar from './Pages/Ativar';
import NovoEstabelecimento from './Pages/NovoEstabelecimento';
import EditarEstabelecimento from './Pages/EditarEstabelecimento';
import './Assets/Styles/reset.css';
import './Assets/Styles/App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/cadastro" element={<Cadastro />}></Route>
          <Route path="/ativar/:token" element={<Ativar />}></Route>
          <Route path="/novo" element={<NovoEstabelecimento />}></Route>
          <Route path="/editar/:id" element={<EditarEstabelecimento />}></Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
