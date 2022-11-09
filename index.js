
const { parse } = require('@vue/compiler-dom');
const express = require('express');
const { connection } = require('mongoose');
const app = express();
const port = 3000;//porta padrao
const mysql  = require('mysql2');

app.use(express.json());//para receber POSTS  no formato JSON

app.get('/', (req,res) => res.json({message: 'Funcionando!'}));

//inicia o servidor
app.listen(port);
console.log('API funcionando!')

function execSQLQuery(sqlQry, res)
{
    const connection = mysql.createConnection({
        host:'localhost',
        port: 3306,
        user: 'root',
        password: 'testDATA#30',
        database: 'Loja'
    });

    connection.query(sqlQry, (error, results, fields)=>{
        if(error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!')

  

    });
}

//Exibição da lista geral de clientes
app.get('/clientes', (req, res)=>{
    execSQLQuery('SELECT * FROM clientes', res);
})


//filtrando clientes
app.get('/clientes/:id?' , (req, res)=>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID = ' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM clientes' + filter, res)

})


1
2
3
4
5





