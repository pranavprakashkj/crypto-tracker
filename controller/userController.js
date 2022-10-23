import databaseConnection from "../connection.js";
import DotenvConfigOptions from "dotenv";
import { userValidator } from "../middleware/validator.js";

export const minMax = (req, response) => {
  const user = req.body;
  if (userValidator(user).errors.length > 0) {
    response
      .status(400)
      .send({ error: [userValidator(user).errors], status: "failed" });
  } else {
    databaseConnection.query(
      `INSERT INTO users (email,min,max) VALUES ('${user.email}','${user.min}','${user.max}')`,
      (err, res) => {
        if (err) response.status(400).send({ status: "failed", error: err });
        else {
          databaseConnection.query(
            `select * from users where email='${user.email}'`,
            (error, result) => {
              if (error)
                response.status(400).send({ status: "failed", error: error });
              else {
                response
                  .status(200)
                  .send({ status: "success", result: result });
              }
            }
          );
        }
      }
    );
  }
};
