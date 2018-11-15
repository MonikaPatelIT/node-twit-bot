var Twit = require('twit');
var config = require('./config.js');
var T = new Twit(config);


//setInterval(tweetIt, 1000*20); tweet every two seconds with random number

//post tweet with random number 
function tweetIt(){
	var random_num = Math.floor(Math.random() *100);
		var Tweet = { status: 'this is my tweet bot which post random number very 2 seconds and the lucky number this time is ' + random_num };
		
		T.post('statuses/update', Tweet,tweeted ); // post tweet using bot
		function tweeted(err, data, response) {
			if(err){
				console.log('Something went wrong');
					}
			else{
				console.log(data);
			}
		}
}
// parameters to get tweet with 'q'
var params = { 
				q: '100daysofcode', 
				count: 100 
			}

//get tweets by paramters value current value is '100daysofcode'			
T.get('search/tweets',params,getData);

// get top 5 from the list 
function getData(err, data, response) {
  var tweets = data.statuses;
  for(var i=0;i<5;i++){
  console.log(tweets[i].text);
  }
  
};