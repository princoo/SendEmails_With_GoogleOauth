const { Sequelize,DataTypes } = require('sequelize');
const dotenv= require('dotenv')
dotenv.config()
    const sequelize = new Sequelize(process.env.DATABASE_URL,{
        logging: false,
      });
       sequelize.authenticate()
      .then(()=>{console.log('Connection has been established successfully.')})
      .catch((error)=>{console.error('Unable to connect to the database:', error)})
module.exports = {sequelize}