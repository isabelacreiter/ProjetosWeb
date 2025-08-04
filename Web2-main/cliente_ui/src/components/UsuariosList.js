import React from 'react';

function UsuariosList({ usuarios }) {
  return (
    <div>
      <h1>Lista de Usuários</h1>
      {usuarios.length > 0 ? (
        <ul>
          {usuarios.map((usuario, index) => (
            <li key={usuario.id || index}>
              {usuario.nome || `Usuário ${index + 1}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}
    </div>
  );
}

export default UsuariosList;