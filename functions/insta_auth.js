const axios = require("axios");
const cheerio = require("cheerio");
const jwt = require("jsonwebtoken");
const Airtable = require("airtable");
require("dotenv").config();
var base;

exports.handler = function (event, context, callback) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };

  var username = event.path.split("insta_auth/")[1];
  var api = event.queryStringParameters;
  base = new Airtable({ apiKey: api.apikey }).base(api.apibase);

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

          callback(null, {
            statusCode: 200,
            headers,
            body: JSON.stringify(token),
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

                    callback(null, {
                      statusCode: 200,
                      headers,
                      body: JSON.stringify(token),
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
