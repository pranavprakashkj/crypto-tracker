import databaseConnection from "../connection.js";
// import price from "../middleware/BitValue.js";
import min from "../middleware/email.js";

// console.log(price);

function ReverseString(str) {
  return str.split("-").reverse().join("-");
}

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
