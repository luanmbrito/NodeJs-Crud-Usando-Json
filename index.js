const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')
async function main(params)
{
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Heroi")
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-i, --id [value]',"Id do heroi")
        .option('-a, --atualizar [value]', "Atualizar um heroi pelo id")

        .option('-c, --cadastrar', "Cadastrar um heroi")
        .option('-l, --listar', "Listar um heroi")
        .option('-r, --remover', "Remove um heroi por id")
        .parse(process.argv)
    const heroi = new Heroi(Commander)
    
    try {
        if(Commander.cadastrar){   
            delete heroi.id         
            const resultado = await Database.cadastrar(heroi)
            if(!resultado)
            {
                console.error("Heroi não foi cadastrado")
                return;
            }
            console.log("Heroi cadastrado com sucesso")
        }
        if(Commander.listar)
        {
            const resultado = await Database.listar()
            console.log(resultado)
            return;
        }
        if(Commander.remover)
        {
            const resultado = await Database.remover(heroi.id)
            if(!resultado)
            {
                console.error("Não foi possivel remover o heroi")
                return;
            }
            console.log('Heroi removido com sucesso')
        }
        if(Commander.atualizar){
            const idParaAtualizar = parseInt(Commander.atualizar);
            //remoer todas as chaves que estiver com undefined | null
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
            if(!resultado)
            {
                console.error("Nao foi possivel atuailzar o heroi")
                return;
            }
            console.log("Heroi atualizado com sucesso!")

        }

    } catch (error) {
        console.error('Deu ruim', error)
    }
}

main()