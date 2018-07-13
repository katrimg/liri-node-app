
//read and set environment variables for the .env package
require("dotenv").config();

var keys = require('./keys.js')
var Twitter = require('twitter');

//Add the code required to import the `keys.js` file and store it in a variable.
var client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
});

var params = { screen_name: 'katritest', count: 20 };

//first command: node liri.js my-tweets

//if the argument is "my-tweets", then
if (process.argv[2] === "my-tweets") {

    //get statuses on user timeline & pass in the parameters
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

