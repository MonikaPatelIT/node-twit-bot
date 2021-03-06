## Create Twitter bot with Node.js

As a part of 100 days of code challange, I was looking for some online tutorail on npm (node package manager) and ended up making my own twit bot from the amazing youtube series made by David Shiffman. checkout [vidoe series here](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6atTSxoRiVnSuOn6JHnq2yV)

Let's get started

1. Twitter account 
    If you don't have any twitter account then please make one to start with.
2. Create application
   TO create app visit [apps.twitter.com](apps.twitter.com﻿) and will tell you to set up developer account,
   ![developer](https://user-images.githubusercontent.com/9668906/48523703-689a5d80-e8e2-11e8-83c9-87c7e425a53c.PNG)
   Once you set your developer account you can create an app using following screen sets
   ![twitter-create-app](https://user-images.githubusercontent.com/9668906/48523810-c2028c80-e8e2-11e8-82d1-a8af43ffb48e.PNG)
  ![twitter-create-app2](https://user-images.githubusercontent.com/9668906/48523811-c3cc5000-e8e2-11e8-9b4f-94eb317143bc.PNG)
    
  My twitter application is ready with all keys wit are going to use in our npm
  ![createanapp](https://user-images.githubusercontent.com/9668906/48523854-e5c5d280-e8e2-11e8-8b82-7054ce6c83fb.PNG)
  

3.Install npm and node js
  There are awesome vidoes and blogs available to do this. Here is link for windows [How to Install Node.js® and NPM on Windows](https://blog.teamtreehouse.com/install-node-js-npm-windows)
  I have no clue about mac I never used it.
  TO check the verison of you node and npm, use the following commandlines
  ```
  npm -v
  node -v
  ```
4. Create node application 
   Go to the directory you wanted to create application and run following command to initialise npm, 
   ```
   npm init
   ```
   This will ask project details like package name, version, description, auther etc and will create package.json in your project directory once you press 'Y' for 'Is this ok?'

5. Twit API
There are heaps of API availabe on [npmjs.come](https://www.npmjs.com/). But for now we are going to use Twit API by ttexel it's over here [link](https://www.npmjs.com/package/twit)
```
npm install twit --save
```
You can see node_modules in your project folder.

6. Configur keys
  On developer account, if you go to keys and tokens will see this 
  ![api](https://user-images.githubusercontent.com/9668906/48525342-a4d0bc80-e8e8-11e8-9ec1-4df5d1324247.PNG)
  Note: I have regenerate them already so not exist anymore. :)
  
  Create config.js file and add all your keys here,
  ```
  module.exports = {
  consumer_key: 'taW0t6uab0o3Ta12C51K3O9m0',
  consumer_secret: 'V4SpD0LU69M8hGd3z99ItcXsREDJl4xrdrq7KGvBEbcwgUU51i',
  access_token: '3038692225-uB0VEWDY2v5wv2l3rm7E2F94qzYOxCGLyiX8qui',
  access_token_secret: 'qe6JmurHXmXFsGXmhQnpez9JNf4Ux5drrIupaZGZwqIi1',
  timeout_ms:60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:true,     // optional - requires SSL certificates to be valid.
}
```
7. main function file 
In my case it's bot.js you can name whatever you like 

    ```
    var Twit = require('twit');  //Import Twit API
    var config = require('./config.js'); // Import configured keys
    var T = new Twit(config); // initialise twit 
    ```  

### Get Tweets
now let's start with getting tweet by 'search'   

```
// parameters to get tweet with 'q'
var params = { 
		q: '100daysofcode', 
		count: 100 
	     }

// get top 5 from the list 
function getData(err, data, response) {
	var tweets = data.statuses;
  	for(var i=0;i<5;i++){
  		console.log(tweets[i].text);
  	}
 }
//get tweets by paramters value current value is '100daysofcode'

T.get('search/tweets',params,getData);

```
This will give top five tweets which contain '100daysofcode' in list with the command `nnpm start` if you have set your start script or just use simple `node bot.js`

![image](https://user-images.githubusercontent.com/9668906/48594121-699bbf80-e9b4-11e8-8f25-db02c60d2692.png)

### Post simple plain text tweet

```
function tweetIt(){
	// text to tweet 
	var Tweet = { status: '#self-learning This tweet is generated by twit API as part of video tutorial by @shiffman on 15.4: Twitter 			API Basics - Twitter Bot Tutorial and it is working yeahh ' };
	// will return data when sucessful else notify with msg		
	function tweeted(err, data, response) {
		if(err){
			console.log('Something went wrong');
			}
			else{
				console.log(data);
			}
		}
	T.post('statuses/update', Tweet,tweeted ); // post tweet using bot
}
```
And it's working 
![image](https://user-images.githubusercontent.com/9668906/48594499-b46a0700-e9b5-11e8-803b-765a9ed21771.png)


### Post media using processing-java

I am using windows machine and had some issue working on David shiffman video's so i have figured out way after working whole day and made notes if you wanted to use it's over here [https://github.com/MonikaPatelIT/processing-java-in-windows](https://github.com/MonikaPatelIT/processing-java-in-windows)

After you finished with your processing-java sketch part here is code to post media 


```
var exec = require('child_process').exec;
var fs = require('fs');

function TweetMedia(){
var cmd = 'processing-java --sketch="C:\\Users\\MonikaP.SCANTECH\\Documents\\Visual Studio 2017\\WebSites\\node-twit-bot\\rainbow" --run'
exec(cmd, processing);

function processing(){
	var filename = 'rainbow/output.png';
	var b64content = fs.readFileSync(filename, { encoding: 'base64' })

	// first we must post the media to Twitter
	T.post('media/upload', 
		  {media_data: b64content }, 
		  function (err, data, response) {
			var mediaIdStr = data.media_id_string
			var altText = "Amazing dotted pattern in black background"
			var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
	
	T.post('media/metadata/create', 
		   meta_params, 
		   function (err, data, response) {
				if (!err) {
      // now we can reference the media and post a tweet (media will attach to the tweet)
				var params = { status: '#Selfstudying Working on @shiffman video tutorial 15.6: Tweeting images with Processing - Twitter Bot Tutorial and it is working ', media_ids: [mediaIdStr] }
				T.post('statuses/update', 
					   params, 
					   function (err, data, response) {
							console.log(data)
						})
					}
			})
		})
	}
}
```

![image](https://user-images.githubusercontent.com/9668906/48594735-bd0f0d00-e9b6-11e8-907f-23fcde7fd50b.png)

