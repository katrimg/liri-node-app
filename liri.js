
//read and set environment variables for the .env package
require("dotenv").config();

//access your keys information like so
//var spotify = new Spotify(keys.spotify);

var Twitter = require('twitter');

var tweets = require("./key.js");
//Add the code required to import the `keys.js` file and store it in a variable.
var client = new Twitter({
    consumer_key: 'process.env.T_CK',
    consumer_secret: 'process.env.T_CS',
    access_token_key: 'process.env.T_AT',
    access_token_secret: 'process.env.T_TS'
});

var params = { screen_name: 'katritest', count: 20 };

//first command: node liri.js my-tweets
if (process.argv[2] === "my-tweets") {
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log("here are the tweets");
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text + tweets[i].created_at);
            }

        }
    });
}


//second command: node liri.js spotify-this-song
//third command: node liri.js movie-this
//fourth command: node liri.js do-what-it-says

