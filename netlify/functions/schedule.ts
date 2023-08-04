import type { Handler } from "@netlify/functions";
import { createTransport } from "nodemailer";
import cron from "node-cron";
var myemail = "coldplane567@gmail.com";
var mypassword = "wiqbilarhpyofwzm";
const mailer = createTransport(
  `smtp://${myemail}:${mypassword}@smtp.gmail.com:587`
);

function sendMail(email: string) {
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
  });

  return mail;
}
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const handler: Handler = async (event) => {
  const query = event.queryStringParameters;
  const email = query?.email;
  if (email === undefined) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Please enter your email address" }),
    };
  }
  if (query?.date === undefined) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Date not specified" }),
    };
  }
  const date = new Date(query?.date);

  if (event.httpMethod === "POST") {
    console.log("task scheduled");
    const job = cron.schedule(
      `40 17 ${date.getDate()} ${month[date.getMonth()]} *`,
      () => {
        console.log("job started");
        const mail = sendMail(email);
        mail
          .then(() => {
            console.log("mail sent");
          })
          .catch((reason) => console.log(reason));
      },
      { timezone: "Asia/Kolkata" }
    );
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "task scheduled successfully" }),
    };
  } else {
    return {
      body: JSON.stringify({ method: "must be post" }),
      statusCode: 404,
    };
  }
};
