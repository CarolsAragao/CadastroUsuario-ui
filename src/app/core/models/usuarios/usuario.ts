export class Usuario {
    id = ''
    nome = ''
    sobrenome = ''
    email = ''
    dataNascimento = new Date()
    escolaridadeId = ''
    escolaridade = new Escolaridade()
}

export class Escolaridade
{
    id = ''
    descricao = ''
}