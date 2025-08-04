import React, { useEffect, useState } from 'react';
import UsuariosList from './components/UsuariosList';
import UsuariosForm from './components/UsuariosForm';

function App() {
  const [usuarios, setUsuarios] = useState([]);

  // Função para buscar usuários do backend
  const fetchUsuarios = async () => {
    const response = await fetch('http://localhost:3000/usuarios');
    const data = await response.json();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Função chamada após adicionar usuário
  const handleUsuarioAdicionado = () => {
    fetchUsuarios();
  };

  return (
    <div>
      <h1>GERNCIAMENTO DE USUÁRIOS - UniSENAI</h1>
      <UsuariosForm onUsuarioAdicionado={handleUsuarioAdicionado} />
      <UsuariosList usuarios={usuarios} />
    </div>
  );
}

export default App;
