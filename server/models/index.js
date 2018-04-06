// 数据库读取
import mysql from 'mysql'
import config from'../conf/sql_config'

const pool  = mysql.createPool({
    host     : config.database.HOST,
    user     : config.database.USERNAME,
    password : config.database.PASSWORD,
    database : config.database.DATABASES
});

let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
};

let users = `create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    avator VARCHAR(100) NOT NULL,
    moment VARCHAR(100) NOT NULL,
    PRIMARY KEY ( id )
   );`

// 注册用户
let insertData = async function(value) {
    let _sql = "insert into users set name=?, pass=?, avator=?, moment=?;"
    return query( _sql, value )
}

// 通过名字查找用户
let findDataByName = async function (name) {
    let _sql = `select * from users where name="${name}";`
    return query(_sql);
}

// 通过名id查找用户
let findDataById = async function (id) {
    let _sql = `select * from users where id="${id}";`
    return query(_sql);
}

let getUserInfo = async (id) => {
    // let _sql = `select * from users where id="${id}";`;
    // console.log(_sql);
    return {
        username: '阿，希爸',
        age: 30
    }
};

let createTable = async function(sql) {
    return query(sql, []);
}

// 建表
createTable(users);

export default  {
    query,
    createTable,
    insertData,
    findDataByName,
    findDataById,
    getUserInfo
}
