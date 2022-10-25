import DotenvConfigOptions from "dotenv";
import coinGecko from "coingecko-api";
import databaseConnection from "../connection.js";
// import min from "./email.js";

const CoinGeckoClient = new coinGecko();
DotenvConfigOptions.config();

export async function insert() {
  let data = await CoinGeckoClient.simple.price({
    ids: ["bitcoin"],
    vs_currencies: ["usd"],
  });
  const price = data["data"]["bitcoin"]["usd"];
  console.log(price, "bit value");

  databaseConnection.query(`INSERT INTO bitcoin(value) VALUES('${price}')`);
  return price;
}
setInterval(insert, 30000);

var price = insert().price;

export default { price };
