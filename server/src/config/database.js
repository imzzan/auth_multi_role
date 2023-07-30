import {Sequelize} from 'sequelize';

const database = new Sequelize('auth_db2', 'root', 'Tidak ada 23', {
    host : 'localhost',
    dialect : "mysql"
});

export default database;