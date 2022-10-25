import nodemailer from "nodemailer";
import dotenvConfigOptions from "dotenv";
import { insert } from "./BitValue.js";
import databaseConnection from "../connection.js";

dotenvConfigOptions.config();

console.log("emil");

// function calling(value) {
//   setTimeout(minMaxMail, 5000);
//   console.log("emil");
// }

const minMaxMail = async (req, res, next) => {
  let priceValue = await insert();
  var query = "SELECT min,email,max from cryptotracker.users";
  databaseConnection.query(query, function (error, result) {
    if (error) throw error;
    else {
      console.log(result[0].min);
      let minimum = result[0].min;
      let mailId = '"' + result[0].email + '"';
      let maximum = result[0].max;
      // let priceValue = price;
      console.log(priceValue);
      if (priceValue < minimum)
        sendEmail({ value: "below " + minimum, toMail: mailId });
      if (priceValue > maximum)
        sendEmail({ value: "above " + maximum, toMail: mailId });
    }
  });
};

minMaxMail();

export function sendEmail({ toMail, value }) {
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPASS,
    },
  });

  const message = {
    from: "me@gmail.com",
    to: toMail,
    toMail,
    subject: "Threshold warning!",
    text: "Price went" + value,
  };

  transport.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("email sent successfully " + toMail, value);
    }
  });
}

export default minMaxMail;
