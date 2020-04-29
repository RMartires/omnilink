const axios = require("axios");
const cheerio = require("cheerio");
const jwt = require("jsonwebtoken");

if (process.env.NODE_ENV == "production") {
  base = new Airtable({ apiKey: process.env.REACT_APP_ATapikey }).base(
    process.env.REACT_APP_ATbase
  );
} else {
  base = new Airtable({ apiKey: window._env.REACT_APP_ATapikey }).base(
    window._env.REACT_APP_ATbase
  );
}

exports.handler = function (event, context, callback) {
  var username = event.path.split("insta_auth/");
  console.log(username);

  base("users")
    .select({
      filterByFormula: `{username} = '${username}'`,
      view: "Grid view",
    })
    .eachPage(
      (records, fetchNextPage) => {
        if (records.length === 1) {
          //console.log(records[0].get('username'));
          //console.log(records[0].get('profile_picture'));
          //console.log(records[0].get('linkslu'));
          const token = jwt.sign(
            {
              username: records[0].get("username"),
              profile_picture: records[0].get("profile_picture"),
              recordid: records[0].id,
            },
            "heyphil123"
          );

          res.json({
            token: token,
          });
        } else {
          axios({
            url: `https://www.instadp.com/fullsize/${username}`,
            method: "GET",
            mode: "cors",
          })
            .then((html) => {
              var $ = cheerio.load(html.data);
              var data = $(".picture").attr();
              //console.log(data);

              base("users").create(
                [
                  {
                    fields: {
                      username: username,
                      profile_picture: data.src,
                      links: [],
                    },
                  },
                ],
                function (err, records) {
                  if (err) {
                    console.error(err);
                    return;
                  } else {
                    const token = jwt.sign(
                      {
                        username: username,
                        profile_picture: data.src,
                        recordid: records[0].id,
                      },
                      "heyphil123"
                    );

                    res.json({
                      token: token,
                    });
                  }
                }
              );
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
};
