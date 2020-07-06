var Airtable = require("airtable");

const jwt = require("jsonwebtoken");

exports.handler = (event, context, callback) => {
  //
  var username = event.queryStringParameters.username;

  console.log(event.body);
  // var temp = event.body.split("&");
  // var ATapikey = temp[3].split("=")[1];
  // var ATbase = temp[4].split("=")[1];
  // var base = new Airtable({ apiKey: ATapikey }).base(ATbase);

  var ATapikey = event.queryStringParameters.key;
  var ATbase = event.queryStringParameters.base;
  var base = new Airtable({ apiKey: ATapikey }).base(ATbase);

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };

  // var email = temp[0].split("=")[1];
  // var userID = temp[1].split("=")[1];
  // var img = temp[2].split("=")[1];

  var email = event.queryStringParameters.email;
  var userID = event.queryStringParameters.userID;
  var img = event.queryStringParameters.img;
  var tempimg = img.split("**").join("&");

  //
  base("users").create(
    [
      {
        fields: {
          username: username,
          profile_picture: [{ url: tempimg }],
          links: [],
          Email: email,
          userID: userID,
          firsttime: 1,
          theme: "13",
        },
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      } else {
        //getprofilepicture(username, records[0].id).then((res) => {});
        const token = jwt.sign(
          {
            username: username,
            recordid: records[0].id,
            firsttime: true,
          },
          "heyphil123"
        );

        callback(null, {
          statusCode: 200,
          headers,
          body: JSON.stringify({ token: token }),
        });
      }
    }
  ); //end base.create
  //
};
