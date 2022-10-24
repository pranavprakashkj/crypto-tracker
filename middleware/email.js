import nodemailer from "nodemailer";
import dotenvConfigOptions from "dotenv";
import price from "../middleware/BitValue.js";
import databaseConnection from "../connection.js";

dotenvConfigOptions.config();

// console.log(price);

// console.log(price);
// var MinMail = databaseConnection.query(
//   `SELECT email FROM cryptotracker.users WHERE ${price} < min`
// );
// var MaxMail = databaseConnection.query(
//   `SELECT email FROM cryptotracker.users WHERE ${price} > Max`
// );
// console.log(MinMail);
function emailId() {
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
let toMail;
toMail = emailId();
// console.log(toMail);

const min = () => {
  databaseConnection.connect(function (err) {
    if (err) throw err;
    databaseConnection.query(
      `SELECT min from cryptotracker.users`,
      function (err, result) {
        if (err) throw err;
        console.log(result);
        return result[0].min;
      }
    );
  });
};
// var minVal = min();
// export defaut min;
// const { minVal, mail } = min();
// let { minval, mail } = min();
// let values = min();
// const [result, val] = min();
// console.log(minVal);
if (price > 12000) console.log("below min");
// if (price < min()) email(price);

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
  text: "Price went below min value ",
};

transport.sendMail(message, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log("email sent successfully");
  }
});

// export default {transport.sendMail};
export default emailId();
