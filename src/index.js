const fetch = require("isomorphic-fetch");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  const url =
    "https://api.github.com/search/repositories?q=user:takenet+language:csharp&sort=updated&order=asc";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const len = data.items.length;
      const ret = {};
      for (let i = 0; i < 5 && i < len; i++) {
        ret["name_" + i] = data.items[i]["name"];
        ret["description_" + i] = data.items[i]["description"];
      }
      console.log(ret);
      res.send(ret);
    });
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
