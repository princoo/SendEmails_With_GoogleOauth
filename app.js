const express= require('express')
const {sequelize} =require('./config/db_connect')
const app = express()
const models= require('./models/MODL')
sequelize.sync()



app.listen(3000,()=> {console.log('server connected')})
sequelize
