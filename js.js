var config = {
    apiKey: "AIzaSyB0diKc9e1eiyrsf7UPd6fgE6BJ5UBZBGs",
    authDomain: "train-schedule-hw-5bf3b.firebaseapp.com",
    databaseURL: "https://train-schedule-hw-5bf3b.firebaseio.com",
    projectId: "train-schedule-hw-5bf3b",
    storageBucket: "train-schedule-hw-5bf3b.appspot.com",
    messagingSenderId: "33543340649"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

   $("#button").on("click", function(event) {

        event.preventDefault();

        var train = $("#trainInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var frequency = $("#frequencyInput").val().trim();
        var timeStart = $("#timeInput").val().trim();

        console.log(train);

        database.ref().push({

           trainFB: train,
           destinationFB: destination,
           frequencyFB: frequency,
           timeStartFB: timeStart,

});
        });

        database.ref().on(

            "child_added",

            function(db){
            
                var dbObj = db.val();
                var freq = moment(dbObj.frequencyFB).format("m");
                var startingTime = moment(dbObj.timeStartFB).format("HH:mm");
                var nextTrain = moment(startingTime).add(freq, "m");

                console.log(freq);

                // var timeNow = moment().unix();
                // var freqOutput = moment(dbObj.earliestFB).add(parseInt(dbObj.frequencyFB), "m");
                // var freqConv = moment(freq).format("s ss");
                
                // var militaryTime = moment(timeNow).format("HH:mm");

                var newRow = $("<tr>");
                newRow.append($("<td>" + dbObj.trainFB + '</td>'));
                newRow.append($("<td>" + dbObj.destinationFB + '</td>'));
                newRow.append($("<td>" + dbObj.frequencyFB + '</td>'));
                newRow.append($("<td>" + nextTrain + '</td>'));
            //   newRow.append($("<td>" + monthCount + '</td>'));

              $("tbody").prepend(newRow);

            
            }

        )