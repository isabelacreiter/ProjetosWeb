const express = require('express')
const fs = require('fs')
const cors = require('cors')
const app = express()
const PORT = 3000

const readUsuarios = () => {
    const dados = fs.readFileSync('./usuarios.json')
    return JSON.parse(dados)
}

const writeUsuarios = (dados) => {
    fs.writeFileSync('./usuarios.json', JSON.stringify(dados, null, 2))
}

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log("Servidor rodando na porta 3000")
})

app.get('/', (req, res) => {
   res.send("Servidor NODE JS + Express está rodando") 
})

app.get('/usuarios', (req, res) => {
    const usuarios = readUsuarios()
    res.json(usuarios) 
 })

app.get('/usuarios/:id', (req, res) => {
    const usuarios = readUsuarios()
    const id = parseInt(req.params.id)
    const usuario = usuarios.find(u => u.id === id)
    if (usuario) {
        res.json(usuario)
    } else {
        res.status(404).json({mensagem: 'Usuário não encontrado'})
    }
})

app.post('/usuarios', (req, res) => {
    const usuarios = readUsuarios()
    const novo_usuario = {
        id: usuarios.length > 0 ? usuarios[usuarios.length -1].id + 1 : 1,
        nome: req.body.nome
    }
    usuarios.push(novo_usuario)
    writeUsuarios(usuarios)
    res.status(201).json(novo_usuario)
})

app.delete('/usuarios/:id', (req, res) => {
    let usuarios = readUsuarios()
    const id = parseInt(req.params.id)
    usuarios = usuarios.filter(usuarios => usuarios.id !== id)
    writeUsuarios(usuarios)
})