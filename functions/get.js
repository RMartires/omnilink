var Airtable = require("airtable");
const jwt = require("jsonwebtoken");
exports.handler = (event, context, callback) => {
  //
  var username = event.queryStringParameters.username;
  var token;

  // var temp = event.body.split("&");
  // var ATapikey = temp[0].split("=")[1];
  // var ATbase = temp[1].split("=")[1];
  // var base = new Airtable({ apiKey: ATapikey }).base(ATbase);

  var ATapikey = event.queryStringParameters.key;
  var ATbase = event.queryStringParameters.base;
  var base = new Airtable({ apiKey: ATapikey }).base(ATbase);

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };

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
          token = jwt.sign(
            {
              username: records[0].get("username"),
              profile_picture: records[0].get("profile_picture")[0].url,
              recordid: records[0].id,
            },
            "heyphil123"
          );
          //else
        } else {
          token = "NAN";
        }
        callback(null, {
          statusCode: 200,
          headers,
          body: JSON.stringify({ token: token }),
        });
        //end
      },
      (err) => {
        if (err) {
          return;
        }
      }
    );
  //
};
