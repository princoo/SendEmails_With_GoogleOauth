
const {sequelize} = require ('../config/db_connect')
const { DataTypes } = require('sequelize');

//users model
const Users= sequelize.define('Users',{
        email:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false
        },
        name:{
            type:DataTypes.STRING,
            unique:false,
            allowNull:false
        },
})

// sentEmails model
const Emails= sequelize.define('Emails',{
    sent:{
        type:DataTypes.STRING,
        allowNull:false
    },
})

module.exports = {Emails,Users}