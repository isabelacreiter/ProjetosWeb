import axios from 'axios';
import { useEffect, useState } from 'react';

function UsuariosList({ atualizar }) {
    const [usuarios, setUsuarios] = useState([])
    const [editandoID, setEdidtandoID] = useState(null)
    const [nomeEditado, setNomeEditado] = useState("")

    const fetchUsuarios = async () => {
        const res = await axios.get('http://localhost:3000/usuarios');
        setUsuarios(res.data);
    }

    useEffect(() => {
        fetchUsuarios();
    }, [atualizar]);

    const deletaUsuario = async (id) => {
        console.log('id do usuário deletado:', id)
        await axios.delete(`http://localhost:3000/usuarios/${id}`)
        setUsuarios(usuarios.filter(usuario => usuario.id !== id))
    }

    const editaUsuario = (usuario) => {
        setEdidtandoID(usuario.id)
        setNomeEditado(usuario.nome)
        console.log('ID do usuario', usuario.id)
        console.log('Nome do usuario', usuario.nome)
    }

    const cancelaEdicao = () => {
        setEdidtandoID(null)
        setNomeEditado("")
    }

    const salvaEdicao = async (id) => {
        if (!nomeEditado) return;
        const res = await axios.put(`http://localhost:3000/usuarios/${id}`, { nome: nomeEditado })
        const usuarioAtulizado = res.data

        const novaLista = usuarios.map(usuario => 
            usuario.id === id ? usuarioAtulizado : usuario
        )
        setUsuarios(novaLista)
        setEdidtandoID(null)
        setNomeEditado()
    }

    return (
        <div>
            <h3>Usuários cadastrados:</h3>
            {usuarios.length > 0 ? (
                <ul>
                    {usuarios.map((usuario, index) => (
                        <li key={index}>
                            {editandoID === usuario.id ? (
                                <>
                                    <input type="text" value={nomeEditado}
                                        onChange={e => setNomeEditado(e.target.value)} />
                                    <button onClick={() => salvaEdicao(usuario)}>
                                        Salvar edição </button>
                                    <button onClick={() => cancelaEdicao()}>
                                        Cancelar Edição </button>
                                </>
                            ) : (
                                <>
                                    ID: {usuario.id} -
                                    Nome: {usuario.nome || `Usuário ${index + 1}`}
                                    <button onClick={() => editaUsuario(usuario)}> Editar </button>
                                    <button onClick={() => deletaUsuario(usuario.id)}> Excluir </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Não há dados</p>
            )
            }
        </div>
    );
}

export default UsuariosList