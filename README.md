# Sending Emails and Authenticate using Google

Built with these technologies
<table>
    <tr>
        <td>
            <a href="https://nodejs.org/en/"><img src="data:image/png;base64,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" /></a>
        </td>
        <td>
            <a href="https://www.postgresql.org/"><img src="https://cdn.iconscout.com/icon/free/png-256/postgresql-11-1175122.png" /></a>
        </td>
        <td>
            <a href="https://sequelize.org/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQERYyEC3gHbDaAYJECrrWuNSGicfOB0_5W_v9n8gq568P4lmPpyaQ94G5AT0qgQXidHOc&usqp=CAU" /></a>
        </td>
    </tr>
</table> 

## Installation

#### Backend

1. Clone the project
2. Go to the project root directory
3. Run `npm install`
4. Create database
5. Create an `.env` file for the variables
6. Run `npm start` to start the project at http://localhost:process.env.PORT

# Description

These batch of codes are used to authenticate a User to login using the google emails and to be able to send the emails <br> and also it can help you to subscribe to the any certain website and unsubscribe at any time you need it 

## Documentation
Below are the endpoints exposed by the service <br>
/ <br>
/failed <br>
/success <br>

### Dependencies
npm <br>
sequelize <br>
@sendgrid/mail <br>
dotenv <br>
passport-google-oauth2 <br>
passport <br>
pg-hstore <br>
pg <br>
nodemon <br>
express-session <br>
express <br>
cookie-session <br>
body-parser <br>
ejs <br>

## Deployment
link : https://operations-production.up.railway.app/

