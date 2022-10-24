import nodemailer from "nodemailer";
import dotenvConfigOptions from "dotenv";
// import price from "../middleware/BitValue.js";
import databaseConnection from "./connection.js";
import { query } from "express";

dotenvConfigOptions.config();

export function mailId() {
  databaseConnection.connect(function (err) {
    if (err) throw err;
    databaseConnection.query(
      `SELECT email from cryptotracker.users`,
      function (err, result, fields) {
        if (err) throw err;
        console.log('"' + result[0].email + '"');
        let mailId = '"' + result[0].email + '"';
        return mailId;
      }
    );
  });
}

let toMail = mailId();

const min = (req, res, next) => {
  var query = "SELECT min from cryptotracker.users";
  databaseConnection.query(query, function (error, result) {
    if (error) throw error;
    else {
      // res.send({ data: result, status: "success" });
      console.log(result[0].min);
      return result;
    }
  });
};

// async function min(data) {
//   var query = "SELECT min from cryptotracker.users";
//   const result = await databaseConnection.promise().query(query);
//   return result[0];
// }

// function min(data, callback) {
//   var query = "SELECT min from cryptotracker.users";
//   databaseConnection.query(query, function (err, results) {
//     if (err) {
//       throw err;
//     }
//     console.log(results[0].min);
//     // return callback(results[0].min);
//   });
// }

let minVal = min();

const max = () => {
  databaseConnection.connect(function (err) {
    if (err) throw err;
    databaseConnection.query(
      `SELECT max from cryptotracker.users`,
      function (err, result) {
        if (err) throw err;
        // console.log(result[0].max);
        return result[0].max;
      }
    );
  });
};

let maxVal = max();

console.log(minVal, maxVal);

console.log(toMail, minVal);

export function sendEmail(value) {
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
      console.log("email sent successfully " + value);
    }
  });
}
let price = 5000;

if (price < minVal) sendEmail("below minimun Value");
if (price > maxVal) sendEmail("above maximum Value");
