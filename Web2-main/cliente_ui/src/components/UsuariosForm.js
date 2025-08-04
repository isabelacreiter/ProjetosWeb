import React, { useState } from "react";
import axios from "axios";

export default function UsuariosForm({ onUsuarioAdicionado }) {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSalvar = async () => {
    if (!nome.trim()) return;
    try {
      await axios.post('http://localhost:3000/usuarios', { nome });
      setMensagem('Usuário salvo com sucesso!');
      setNome('');
      if (onUsuarioAdicionado) onUsuarioAdicionado();
    } catch (error) {
      setMensagem('Erro ao salvar usuário.');
      console.error('Erro ao salvar usuário:', error);
    }
  };

  return (
    <div>
      <label>Digite o nome de usuário</label>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <button onClick={handleSalvar} disabled={!nome.trim()}>Salvar</button>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}