//objeto para carregar a extensão mysql
const mysql = require('mysql2');

//criando string de conexao com o banco de dados
const connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'root',
    password: 'testDATA#30',
    database: 'Loja'
});

connection.connect((err) =>{
    if(err) return console.log(err);
    console.log('conectou!');
    createTable(connection);
    addRows(connection);
})

//funcao para criar e popular tabela
function createTable(conn){
    const sql = 'CREATE TABLE IF NOT EXISTS Clientes(ID int NOT NULL AUTO_INCREMENT, Nome varchar(150) NOT NULL, CPF char(11) NOT NULL, PRIMARY KEY (ID));';

    conn.query(sql, (error, results, fields) =>{
        if(error) return console.log(error);
        console.log('criou a tabela!');
    })
}

//bulk insert(inserção de varias llinhas de uma vez)
function addRows(conn){
    const sql = "INSERT INTO Clientes(Nome, CPF) VALUES ?";
    const values = [
        ['teste1', '12345678901'],
        ['teste1', '09876543210'],
        ['teste3', '12312312399']
    ];
    conn.query(sql, [values], (error, results, fields) =>{
        if(error) return console.log(error);
        console.log('adicionou registros!');
        conn.end();//fecha a conexao
    });
}

