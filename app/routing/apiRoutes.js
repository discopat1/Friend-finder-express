var friends = require('../data/friends');

//Routes
module.exports = function(app){

	// API GET Requests
	app.get('/api/friends', function(req, res){
		res.json(friends);
	});

	// API POST Requests
	app.post('/api/friends', function(req, res){
        console.log("were in!");
//Compare user with their best match 

var bestMatch = {
    name: "",
    photo: "",
    friendDifference: 1000
};

// Take user's data from the survey and parse it
var userData 	= req.body;
var userName 	= userData.name;
var userPhoto 	= userData.photo;
var userScores 	= userData.scores;

var totalDifference = 0;

for  (var i=0; i< friends.length; i++) {

    console.log(friends[i].name);
    totalDifference = 0;

    for (var j=0; j< friends[i].scores[j]; j++){

        // Calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        // If the sum of differences is less then the differences of the current "best match"
        if (totalDifference <= bestMatch.friendDifference){

            // Reset the bestMatch to be the new friend. 
            bestMatch.name = friends[i].name;
            bestMatch.photo = friends[i].photo;
            bestMatch.friendDifference = totalDifference;
        }
    }
}

// Save the user's data to the database 
friends.push(userData);

// Return a JSON with the user's bestMatch
res.json(bestMatch);
    })
}