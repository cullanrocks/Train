$(document).ready(function() {

	var dateNow = moment().format("MM/DD/YY")

    var config = {
        apiKey: "AIzaSyD0kzx5nogsv9Lysw0Q1nV1biCvRWEaobw",
        authDomain: "employee-management-fd5c3.firebaseapp.com",
        databaseURL: "https://employee-management-fd5c3.firebaseio.com",
        projectId: "employee-management-fd5c3",
        storageBucket: "employee-management-fd5c3.appspot.com",
        messagingSenderId: "414685589563"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("form").submit(function() {

        event.preventDefault();

        var userName = $("#input-name").val().trim();
        var userPosition = $("#input-position").val().trim();
        var startDate = $("#input-start").val().trim();
        var monthsWorked = moment(dateNow).diff(moment(startDate), "months");
        var monthlyRate = $("#input-monthly").val().trim();
        var totalBilled = monthsWorked * monthlyRate;

        database.ref("/users").push({
            userName: userName,
            userPosition: userPosition,
            startDate: startDate,
            monthsWorked: monthsWorked,
            monthlyRate: monthlyRate,
            totalBilled: totalBilled
        });
    });

    database.ref("/users").on("child_added", function(snapshot, prevChildKey) {

        $("tbody").append("<tr><td>" + snapshot.val().userName 
        	+ "</td><td>" + snapshot.val().userPosition 
        	+ "</td><td>" + snapshot.val().startDate 
        	+ "</td><td>" + snapshot.val().monthsWorked 
        	+ "</td><td>$" + snapshot.val().monthlyRate 
        	+ "</td><td>$" + snapshot.val().totalBilled 
        	+ "</td></tr>");
    });
})