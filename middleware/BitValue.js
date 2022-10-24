import DotenvConfigOptions from "dotenv";
import coinGecko from "coingecko-api";
import databaseConnection from "../connection.js";

const CoinGeckoClient = new coinGecko();
DotenvConfigOptions.config();

async function insert() {
  let data = await CoinGeckoClient.simple.price({
    ids: ["bitcoin"],
    vs_currencies: ["usd"],
  });
  const price = data["data"]["bitcoin"]["usd"];
  console.log(price);
  databaseConnection.query(`INSERT INTO bitcoin(value) VALUES('${price}')`);
}
setInterval(insert, 30000);

var price = insert().price;
export default { price };
