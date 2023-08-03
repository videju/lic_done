import { createTransport } from 'nodemailer';
import express from 'express';
import { schedule } from 'node-cron';
import serverless from 'serverless-http';
// import { fileURLToPath } from 'url';
// import { __dirname } from '../../dir.mjs';
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
    const job = schedule(` 40 16 ${date.getDate()} ${month[ date.getMonth() ]} *`, () => {
        console.log("job started");
        const mail = sendMail(email)
        mail.then(() => { console.log("mail sent"); }).catch((reason) => console.log(reason))
    },{timezone:"Asia/Kolkata"})

    res.json({ "message": "task scheduled" })
})
app.get("/api/test", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")
    res.send({ "r": "d" })
    
})
app.get("/", (req, res) => {
    res.setHeader('Content-Type', "text/html")
    res.end(`<!DOCTYPE html>
<html lang="en">
  <head>
    <style>/* CSS RESET */
      * {
        margin: 0;
        padding: 0;
      }
      html {
        box-sizing: border-box;
        font-size: 62.5%;
      }
      *, *::after, *::before {
        box-sizing: inherit;
      }
      /* CSS VARIBLES*/
      :root {
        --color-gradient-1: #37D5D6;
        --color-gradient-2: #36096D;
        --color-white-1: #fff;
        --color-label-text: #8a81e8;
      }
      /* MAIN CSS */
      body {
        font-family: 'Titillium Web', sans-serif;
        background-image: linear-gradient(to right bottom, var(--color-gradient-1), var(--color-gradient-2));
        height: 100vh;
      }
      @keyframes fadeInOpacity {
        0% {
          opacity: 0;
       }
        100% {
          opacity: 1;
       }
      }
      .fadein {
        opacity: 1;
        animation-name: fadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 0.5s;
      }
      .page-wrap {
        width: 90rem;
        height: 50rem;
        background-color: var(--color-white-1);
        margin: 30px auto;
        display: flex;
        border-radius: 15px;
        overflow: hidden;
        perspective: 1px;
        box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15), 0px 6px 25px rgba(0, 0, 0, 0.35);
        align-items: center;
      }
      .logo-section {
        flex: 0 0 42%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-right: 1px solid #eee;
      }
      .logo-section h1 {
        font-size: 32px;
        text-transform: uppercase;
        margin-left: 10px;
      }
      .logo-section .logo {
        height: 250px;
        margin-top: -25px;
        margin-left: 20px;
      }
      .login-section {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .login-section h1 {
        text-transform: uppercase;
        font-size: 21px;
        margin-bottom: 15px;
      }
      .login-section form {
        width: 70%;
      }
      .form-group {
        margin-bottom: 15px;
        display: flex;
        flex: 1;
        justify-content: center;
      }
      .form-group label {
        flex: 0 0 30%;
        font-size: 17px;
        margin-right: 10px;
        color: var(--color-label-text);
        margin-top: 5px;
        display: none;
      }
      .form-group .input-control {
        flex: 1;
        border: 1px solid #eaeaea;
        border-radius: 4px;
        padding: 13px 9px;
        align-self: center;
      }
      .form-group .input-control:focus {
        outline: none;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.35);
      }
      .form-group ::-webkit-input-placeholder {
        color: #ccc;
      }
      .btn-login {
        background-color: var(--color-gradient-1);
        color: var(--color-white-1);
        flex: 0 0 80%;
        border: none;
        padding: 16px;
        border-radius: 20px;
        margin-top: 15px;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s ease-in-out;
      }
      .btn-login:hover {
        background-color: #913cc3;
        box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25), 0px 6px 15px rgba(0, 0, 0, 0.15);
        transform: scale(1.2);
      }
      .pConent {
        font-size: 1.6rem;
        color: #777;
      }
      .pConent a {
        color: var(--color-gradient-1);
      }
      .hidden {
        display: none;
      }
      
      #schedule{
        padding: 1.75rem;
        background-color: rgb(41, 41, 165);
        color:#d4d5e3;
        outline: none;
        border: none;
        border-radius: 9px;
      }
      
      #schedule:hover{
        background-color: rgb(70, 70, 185);
      }
      
      .submitBox{
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
      
      }</style>
    
    <!-- <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="dist/bundle.js"></script>
    <script data-main="scripts/main" src="scripts/require.js"></script>
    <script src="main.js" ></script> -->
    <script  type="module" src="script.mjs"></script>
  </head>
  <body>
    <link
      href="https://fonts.googleapis.com/css?family=Titillium+Web:400,600,700"
      rel="stylesheet"
    />
    <div class="page-wrap">
      <div class="logo-section">
      
        <br />
        <h1>Lic Rode</h1>
      </div>
      <div class="login-section">
        <h1>Sign-In Flex Account</h1>
        <form id="form" class="signInForm">
          <!-- <div class="form-group">
         <label for="username">Username</label>
         <input type="text" id="username" class="input-control" placeholder="Username">
       </div> -->
          <div class="form-group">
            <label for="email">Gmail</label>
            <input
              type="text"
              id="email"
              class="input-control"
              placeholder="Type the email to which message must be send"
            />
          </div>
          <div class="form-group">
            <label for="username">renewaldate</label>
            <input
              type="date"
              id="renewaldate"
              class="input-control"
              placeholder="Password"
            />
          </div>

          <div class="submitBox">
            <button id="schedule" type="submit">Schedule Email</button>
          </div>
        </form>

        <!-- <p class="pConent signUpText">New to flexbox? <a href="#" id="SignUpbtn">Sign Up</a></p> -->
        <p class="pConent signInText hidden">
          Already Registered? <a href="#" id="SignInbtn">Sign In</a>
        </p>
      </div>
    </div>
    <!-- <script src="out.js"></script> -->
    <script>
      const email = document.getElementById("email");
      const date = document.getElementById("renewaldate");
      const form = document.getElementById("form");
    

      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        const query  =  fetch(
          "/api/schedule?email="+email.value+"&date="+date.value",
          {
            method: "POST",
          }
        ).then((value) => {const body = value.json()
          console.log(body)
           
        } );
      });
      const r = fetch("/api/test")
      r.then((name)=>{
        console.log(name.json())
      }) 
    </script>

    <!-- <script src="https://cdn.jsdelivr.net/npm/node-schedule@2.1.1/index.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/nodemailer@6.9.4/lib/nodemailer.min.js"></script> -->
  </body>
</html>
`)
})


export const handler = serverless(app)
// app.listen(8080, () => {
//     console.log("listening on 8080")
// })
    
