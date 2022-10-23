import databaseConnection from "../connection.js";
import price from "../middleware/BitValue.js";
import email from "../middleware/email.js";

// console.log(price);

function ReverseString(str) {
  return str.split("-").reverse().join("-");
}

const min = () => {
  databaseConnection.connect(function (err) {
    if (err) throw err;
    databaseConnection.query(
      `SELECT min from cryptotracker.users`,
      function (err, result, fields) {
        if (err) throw err;
        console.log(result[0].min);
        return result[0].min;
      }
    );
  });
};
// export defaut min;
// const { minVal, mail } = min();
// let { minval, mail } = min();
// let values = min();
// const [result, val] = min();
// console.log(min());
if (price < min()) min();
if (price < min()) email(price);

export const getPricebyDate = (req, res) => {
  databaseConnection.query(
    `SELECT time,value FROM cryptotracker.bitcoin where date = '${ReverseString(
      req.query["date"]
    )}' AND id BETWEEN ${req.query["offset"]} AND ${req.query["limit"]} `,
    (error, result) => {
      if (error) res.status(400).send({ status: "failed", error: error });
      else res.send({ data: result, status: "success" });
    }
  );
};
