$(document).ready(function() {

    var dateNow = moment().format("MM/DD/YY")
    var currentTime = moment();
    var trainName;
    var destination;
    var firstTrain;
    var frequency;
    var firstTime;
    var difference;
    var remaining;
    var minutesAway;
    var nextArrival;
    var nextArrivalTime;
    $("#current-time").html(moment())

    var config = {
        apiKey: "AIzaSyDO0PeF_FJtatGVVJtwN6cB7Msgf3gzHuE",
        authDomain: "train-2f24a.firebaseapp.com",
        databaseURL: "https://train-2f24a.firebaseio.com",
        projectId: "train-2f24a",
        storageBucket: "train-2f24a.appspot.com",
        messagingSenderId: "619234746060"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    $("form").submit(function() {

        event.preventDefault();

        trainName = $("#input-name").val().trim();
        destination = $("#input-destination").val().trim();
        frequency = $("#input-frequency").val().trim();
        firstTrain = $("#input-first").val().trim()
        firstTrainTime = moment(firstTrain, "HH:mm").subtract(10, "years");

        database.ref("/train").push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
        });
    });

    setInterval(function(){
        $("tbody").empty()
        database.ref("/train").on("child_added", function(snapshot) {
            var key = snapshot.key
            var train = snapshot.val();
            var displayFirstTrain = moment(train.firstTrain, "hh:mm");
            var displayDifference = moment().diff(moment(displayFirstTrain), "minutes");
            var displayRemaining = displayDifference % train.frequency;
            var displayMinutesAway = train.frequency - displayRemaining;
            var displayNextArrival = moment().add(displayMinutesAway, "minutes");
            var displayNextArrivalTime = moment(displayNextArrival).format("hh:mm");
            $("tbody").append("<tr><td>" + train.trainName + "</td><td>" + train.destination + "</td><td>Every " + train.frequency + " minutes</td><td>" + displayNextArrivalTime + "</td><td>" + displayMinutesAway + "</td><td>" +  "<button type='button' class='btn btn-default id='"+key+"'>X</button></tr>");
        });
    }, 1000)

    // didn't get the button to work :(
    
    $("button").click(function(){
        database.ref("/train").on("child_remove", function(snapshot){
            var key = snapshot.key
        })
    })

})
