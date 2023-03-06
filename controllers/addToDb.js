const db = require('../models/MODL')
const user = db.Users;
const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv')
dotenv.config()


sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const addUser = (req,res) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl; 
    var url = new URL(fullUrl);
    var name = url.searchParams.get("name");
    var email = url.searchParams.get("email");
    console.log(name);
    console.log(email)
    if (!email || !name) {
        res.status(400).send({
            message: "Please Provide required Fields."
        })
        return;
    }
    const userDetails = {
        email: email,
        name: name
    };
    user.create(userDetails).then(data => {
        const msg = {
            to: data.email,
            from: 'eddymugisha65@gmail.com',
            subject: 'Thank You For Subscribing to Our News Letter.',
            text: 'You Will Receive a Weekly News Letter of Our Company',
            html: `
            <div style="
                padding: 10px;
                background: #141414;
                color: #cecece;
                font-family: sans-serif;
                font-size: 20px;
                border: 20px solid rgb(126, 2, 2);
            " class="container">
            ${data.name}, 🎉Thank You For. Subscribing.🎉You Will Be Receiving Our Weekly News Letter
            </div>
            `,
        }
        sgMail.send(msg).then(() => {
            res.status(201).render('Pages/thanks')
        }).catch((error) => {
            console.error(error)
        })
    }).catch(err => {
        if (err.errors[0].message == "email must be unique" ) {
            res.redirect('/success')
        }
        else {
            res.status(500).json({
                message: err.errors[0].message || "Some Error Happened"
            })
        }
    })
}

module.exports = addUser