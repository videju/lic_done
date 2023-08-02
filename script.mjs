import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createTransport } from 'nodemailer';
import express from 'express';
import { schedule } from 'node-cron';
import serverless from 'serverless-http';

const __dirname = dirname(fileURLToPath(import.meta.url))
// const form = document.getElementById('form');


var myemail = 'coldplane567@gmail.com'
var mypassword = 'wiqbilarhpyofwzm';
const mailer = createTransport(`smtp://${myemail}:${mypassword}@smtp.gmail.com:587`)

/**
 * 
 * @param {string} email 
 */
function sendMail(email) {
    const mail = mailer.sendMail({
        from: myemail,
        to: email,
        subject: "Testing Koding 101 Email",
        html: `<html>
        <head>
            <title>Codebeautify.org Text to HTML Converter</title>
        </head>
        <body>
            <p>dear lic users 
    It is hereby informed that your policy will expire soon 
    Renew It Now !!! 
                                            -rode(lic)</p>
        </body>
    </html>`,
    }
    )

    return mail
}
const app = express();
const month = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
app.post("/api/schedule", (req, res) => {
    const query = req.query;
    const email = query.email;
    const date = new Date(query.date);
    console.log("task scheduled")
    const job = schedule(`48 16 ${date.getDate()} ${month[ date.getMonth() ]} *`, () => {
        console.log("job started");
        const mail = sendMail(email)
        mail.then(() => { console.log("mail sent"); }).catch((reason) => console.log(reason))
    })
    job.start()
    res.json({ "message": "task scheduled" })
})
    ;
app.get("/", (req, res) => {
    res.sendFile("./index.html", { root: __dirname })
})

app.use("/img", express.static(__dirname + "/1.jpg"))
// app.listen(8080, () => console.log("listening on 8080"))
export default app
// export const handler = serverless(app)
