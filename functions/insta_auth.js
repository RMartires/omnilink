const axios = require("axios");
const jwt = require("jsonwebtoken");
const chromium = require("chrome-aws-lambda");

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

  //
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
              profile_picture: records[0].get("profile_picture")[0].url,
              recordid: records[0].id,
            },
            "heyphil123"
          );

          callback(null, {
            statusCode: 200,
            headers,
            body: JSON.stringify(token),
          });

          //
        } else {
          getprofilepicture(username).then((img) => {
            // console.log(img + " " + username);
            base("users").create(
              [
                {
                  fields: {
                    username: username,
                    profile_picture: [{ url: img }],
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
                      profile_picture: records[0].get("profile_picture")[0].url,
                      recordid: records[0].id,
                    },
                    "heyphil123"
                  );

                  callback(null, {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(token),
                  });

                  //
                }
              }
            );
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
  //
};

async function getprofilepicture(username) {
  console.log(await chromium.executablePath);

  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
  });

  var img = "https://www.instadp.com/";

  while (img === "https://www.instadp.com/") {
    const page = await browser.newPage();
    await page.goto(`https://www.instadp.com/fullsize/${username}`, [
      { waitUntil: "networkidle0" },
    ]);
    img = await page.$eval(".picture", (el) => el.src);

    console.log(username + "  " + img);
    page.close();
  }

  return context.succeed(img);
}
