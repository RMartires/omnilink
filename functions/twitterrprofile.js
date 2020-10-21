import axios from "axios";
import Twit from "twit";
var Twitter = require("twitter");

exports.handler = async (event, context, callback) => {
  var data = JSON.parse(event.body);
  var TCoustomerKey = data.TCoustomerKey;
  var TCoustomerSecret = data.TCoustomerSecret;
  var access_token_key = data.access_token;
  var access_token_secret = data.access_token_secret;

  console.log(JSON.parse(event.body));

  try {
    var client = new Twitter({
      consumer_key: TCoustomerKey,
      consumer_secret: TCoustomerSecret,
      access_token_key: access_token_key,
      access_token_secret: access_token_secret,
    });

    var params = { screen_name: "RohitMartires" };

    var res = await new Promise((res, rej) => {
      client.get("users/show", params, function (error, response) {
        if (!error) {
          // console.log(response);
          var username = response.name;
          var profile_image_url = response.profile_image_url;
          profile_image_url = profile_image_url.replace("_normal", "");
          res({
            username: username,
            profile_image_url: profile_image_url,
          });
        } else {
          rej(error);
        }
      });
    });

    console.log(res);

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    };

    return {
      statusCode: 200, // <-- Important!
      headers,
      body: JSON.stringify(res),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500, // <-- Important!
      headers,
      body: JSON.stringify(err),
    };
    // console.log(err.twitterReply.errors);
  }
};
