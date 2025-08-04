const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const cors = require('cors');

app.use(cors());

const readUsuarios = () => {
    try {
        const data = fs.readFileSync('./usuarios.json');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

const writeUsuarios = (usuarios) => {
    fs.writeFileSync('./usuarios.json', JSON.stringify(usuarios, null, 2));
}

app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('SERVIDOR NODE JS + Express rodando');
});

app.get('/usuarios', (req, res) => {
  const usuarios = readUsuarios();
  res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
    const usuarios = readUsuarios();
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).send('Usuário não encontrado');
    }
});

app.delete('/usuarios/:id', (req, res) => {
    const usuarios = readUsuarios();
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
        return res.status(404).send('Usuário não encontrado');
    }
    const usuariosAtualizados = usuarios.filter(u => u.id !== id);
    writeUsuarios(usuariosAtualizados);
    res.json({ message: `Usuário com id ${id} deletado com sucesso!` });
});

app.post('/usuarios', (req, res) => {
    const usuarios = readUsuarios();
    const novoUsuario = {
        id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
        nome: req.body.nome
    }

    usuarios.push(novoUsuario);
    writeUsuarios(usuarios);
    res.status(201).json(novoUsuario);
});








