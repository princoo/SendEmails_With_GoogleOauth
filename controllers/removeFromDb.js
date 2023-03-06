const db = require('../models/MODL')
const user = db.Users;
const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv')
dotenv.config()


sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const removeUser = (req,res) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl; 
    var url = new URL(fullUrl);
    var email = url.searchParams.get("email");
    if (!email) {
        res.status(400).send({
            message: "Please Provide required Fields."
        })
        return;
    }
    user.destroy({
        where: {
            email: email
        }
    }).then(data => {
        const msg = {
            to: email,
            from: 'eddymugisha65@gmail.com',
            subject: 'Unsubscribing to Our News Letter.',
            text: 'You Will Not Be Receiving a Weekly News Letter of Our Company',
            html: `
            <div style="
                padding: 10px;
                background: #141414;
                color: #cecece;
                font-family: sans-serif;
                font-size: 20px;
                border: 20px solid rgb(126, 2, 2);
            " class="container">
            Dear ${email},
            <br>
            We're sorry to see you go! You have successfully unsubscribed from our mailing list. You will no longer receive any emails or notifications from us.
            <br>
            <br>
            If you changed your mind or unsubscribed accidentally, you can always resubscribe by visiting our website and signing up again.
            <br>
            <br>
            Thank you for being a part of our community, and we hope to see you again soon!

            Best regards.
            </div>
            `,
        }
        sgMail.send(msg).then(() => {
            res.status(201).render('Pages/unsubscribe')
        }).catch((error) => {
            console.error(error)
        })
    }).catch(err => {
        res.status(500).json({
            message: err || "Some Error Happened"
        })
    })
}

module.exports = removeUser