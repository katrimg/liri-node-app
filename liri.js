
//read and set environment variables for the .env package
require("dotenv").config();

var keys = require('./keys.js');
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
            console.log("Tweets by Katri:");
            for (var i = 0; i < tweets.length; i++) {
                console.log("Tweet: " + tweets[i].text + " , Created on: " + tweets[i].created_at);
            }

        }
    });
}

//second command: node liri.js spotify-this-song

var Spotify = require('node-spotify-api');
var keys = require('./keys.js');

//load spotify id and secret from .env file
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

//if the user inputs "spotify-this-song", then
if (process.argv[2] === 'spotify-this-song'){

//if the user doesn't input a song, then
 if(process.argv[3] === undefined){
    
    //search for "The Sign" by Ace of Base
	spotify.search({ type: 'track', query: 'artist:ace+of+base+track:the+sign', limit: '1' }, function(err, data) {
           
        //console.log any errors
            if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }
		    // console.log the song, artist name, album name, and url
		    console.log("Song Name: " + data.tracks.items[0].name);
		 	console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
		 	console.log("Album Name: " + data.tracks.items[0].album.name);
		 	console.log("URL: " + data.tracks.items[0].preview_url);	
        });
        //otherwise if the user inputs a song, then
	 } else if (process.argv[3] !== undefined){

        //create a variable to hold user input
		var nodeArgs = process.argv;

		// create string for song choice
		var mySong = "";

		// grab all words in song choice excluding first two arguments
		for (var i=3; i < nodeArgs.length; i++){
			mySong = mySong + "+" + nodeArgs[i];
        }
        //search for the song choice
		spotify.search({ type: 'track', query: mySong}, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
            }
            //console.log the song, artist name, album name, and url
		    console.log("Song Name: " + data.tracks.items[0].name);
		 	console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
		 	console.log("Album Name: " + data.tracks.items[0].album.name);
		 	console.log("URL: " + data.tracks.items[0].preview_url);	
		});
	}
}

//third command: node liri.js movie-this

//if the user types in "movie-this", then
if (process.argv[2] === 'movie-this'){

    //create variable for the argument input
    var movieName = process.argv[3];
    
    //if the user doesn't input a movie, then
	if(process.argv[3] === undefined){

        //default to Mr. Nobody
		movieName = 'Mr. Nobody';
    }
    //create variable to store the queryUrl with api key
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&tomatoes=true&plot=short&apikey=trilogy';

	var request = require('request');

	//run a request to the OMDB api
	request(queryUrl, function (error, response, body) {

        //console.log any errors
		if (!error && response.statusCode == 200) {
            
            //console.log data from api request
			console.log("Title: " + JSON.parse(body)["Title"]);
			console.log("Released on: " + JSON.parse(body)["Year"]);
            console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
			console.log("Country: " + JSON.parse(body)["Country"]);
			console.log("Language: " + JSON.parse(body)["Language"]);
			console.log("Plot: " + JSON.parse(body)["Plot"]);
			console.log("Actors: " + JSON.parse(body)["Actors"]);
		}
	});
}


//fourth command: node liri.js do-what-it-says
var fs = require('fs'); 

//if the user inputs 'do-what-it-says', then
if (process.argv[2] === 'do-what-it-says'){

    //create array to hold data
    var dataArr;

    //grab text from random.txt
	 fs.readFile("random.txt", "utf8", function(error, data) {
         //console.log any errors
		if(error){
			return console.log(error);
		}
		dataArr = data.split(',');
		
            //search song on spotify
	 		spotify.search({ type: 'track', query: dataArr[1]}, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }
		    //console.log the new song data
            console.log("Song Name: " + data.tracks.items[0].name);
		 	console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
		 	console.log("Album Name: " + data.tracks.items[0].album.name);
		 	console.log("URL: " + data.tracks.items[0].preview_url);
		});
	});
}	 
