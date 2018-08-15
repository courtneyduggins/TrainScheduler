  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA7E2t-6SQUINe2hfDu5Veu08jQBPPzuqk",
    authDomain: "fir-homework-dae47.firebaseapp.com",
    databaseURL: "https://fir-homework-dae47.firebaseio.com",
    // projectId: "fir-homework-dae47",
    storageBucket: "fir-homework-dae47.appspot.com",
    messagingSenderId: "937666192136"
  };

  firebase.initializeApp(config);


var database = firebase.database();
 
var TrnName = "";
var TrnDest = "";
var TrnTime = "";
var TrnFreq = "";


//pushing data into proper arrays
// var TrnNameArray = [];
// var TrnDestArray = [];
// var TrnTimeArray = [];
// var TrnfreqArray = [];
 

     
//submit function. This function collects form data, puts data in 
//firebase, and clears values for next submission. It also pushes the values 
//up to each array
$("#add-train-btn").on("click", function () {
    // event.preventDefault();
   
    TrnName = $("#train-input").val().trim();
    TrnDest = $("#dest-input").val().trim();
    TrnTime = $("#firstTrainTime").val().trim();
    TrnFreq = $("#frequency").val().trim();


    database.ref().push({
    TrainName: TrnName,
    TrainDest: TrnDest,
    TrainTime: TrnTime,
    TrainFreq: TrnFreq,
    // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    return false;

    // $("#train-name-input").val('');
    // $("#dest-input").val('');
    // $("#time-input").val('');
    // $("#rate-input").val('');
    // TrnNameArray.push(name);
    // TrnDestArray.push(dest);
    // TrnTimeArray.push(Time);
    // TrnfreqArray.push(freq);
});


database.ref().on("child_added", function(snapshot){

var newTrnName = snapshot.val().TrainName;
var newTrnDest = snapshot.val().TrainDest;
var newTrnTime = snapshot.val().TrainTime;
var newTrnFreq = snapshot.val().TrainFreq;


var firstTimeConverted = moment(newTrnTime,"hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
// snapshot = snapshot.val();
var currentTimeMoment = moment();
    console.log("Current Time: " + moment(currentTimeMoment).format("hh:mm"));

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference In Time: " + diffTime);    

var tRemainder = diffTime % newTrnFreq;
    console.log(tRemainder);   
    
var tMinutesUntilTrain = newTrnFreq - tRemainder;
    console.log("Minutes Until Train: " + tMinutesUntilTrain);

var nextTrain = moment().add(tMinutesUntilTrain, "minutes");
    console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));  
    
var nextTrainArrivalTime = moment(nextTrain).format("hh:mm");    


//$("tbody").append("<tr><th scope="row+ newTrnName +'</td><td>'+ newTrnDest +'</td><td>'+ newTrnFreq +'</td><td>'+ nextTrainArrivalTime +'</td><td>'+ tMinutesUntilTrain +'</td></tr>');

$(".trainSchedule").append('<tr><td>'+ newTrnName +'</td><td>'+ newTrnDest +'</td><td>'+ newTrnFreq +'</td><td>'+ nextTrainArrivalTime +'</td><td>'+ tMinutesUntilTrain +'</td></tr>');

console.log(newTrnName);
});