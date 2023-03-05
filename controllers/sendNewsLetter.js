const db = require('../models/MODL')
const user = db.Users;
const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv');
const { sequelize } = require('../config/db_connect');
const { DataTypes } = require('sequelize');

dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendLetter = async (req,res) => {
    const text = req.body.text
    const d = new Date()
    let date = d.getTime()
    const UsersWhoReceived = sequelize.define(`NewsLetter_on_${date}`,{
        email:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false
        },
    })
    await UsersWhoReceived.sync();
    user.findAll()
      .then( async data => {
        for (let i = 0; i < data.length; i++) {
            const msg = {
                to: data[i].email,
                from: 'eddymugisha65@gmail.com',
                subject: 'New Weekly News Letter is Here. 🔥🔥',
                text: 'Read Our News Letter Now',
                html: `
                <div style="
                    padding: 10px;
                    background: green;
                    color: #cecece;
                    font-family: sans-serif;
                    font-size: 20px;
                    border: 20px solid rgb(126, 2, 2);
                " class="container">
                ${data[i].name}, Your Weekly News Letter is Here.on ${d.toLocaleDateString()} 
                Read it.</br></br>
                <pre style="background: #cecece; color: #000; padding: 10px;">${text}</pre>
                </div>
                `,
            }
            await sgMail.send(msg).then(() => {
                UsersWhoReceived.create({
                    email: data[i].email,
                    name: data[i].name
                }).catch(err => {
                    console.log(err)
                })
                
            }).catch((error) => {
                console.error(error)
            })    
        }
        console.log(data.length)
      }).then(() => { res.status(201).render('Pages/thanks') } )
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });

}

module.exports = sendLetter