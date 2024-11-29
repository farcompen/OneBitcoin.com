const { json } = require("express");

require("dotenv").config();
const apiKey = process.env.LIVECOIN_API_KEY;
module.exports.Prices = async () => {
  const result = await fetch(process.env.API_ENDPOINT).then((res) =>
    res.json()
  );
  return result;
};
module.exports.GlobalData = async () => {
  const result = await fetch(process.env.CONLORE_API_GLOBAL_ENDPOINT).then(
    (res) => res.json()
  );
  return result;
};

module.exports.TrendingList = async () => {
  const result = await fetch(process.env.TRENDING_API_URL).then((res) =>
    res.json()
  );
  return result;
};
module.exports.Exchange = async () => {
  const result = await fetch(process.env.EXHANGE_API_URL, {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
      "x-api-key": apiKey,
    }),
    body: JSON.stringify({
      currency: "USD",
      sort: "visitors",
      order: "descending",
      offset: 0,
      limit: 500,
      meta: true,
    }),
  }).then(res=>res.json());
  return result;
};
