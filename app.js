var electionData = new Meteor.Collection('election');
var resultsData = new Meteor.Collection('results');


electionData.allow({
    insert: function () {
        return true;
    }
})
electionData.allow({
    remove: function () {
        return true;
    }
})
resultsData.allow({
    insert: function () {
        return true;
    }
})
resultsData.allow({
    remove: function () {
        return true;
    }
})


Meteor.startup(function () {
    if (electionData.find().count() === 0) {
        electionData.insert(statejson);
    }

    // delcare arrays to hold processed JSON data
    var localsArr = [];
    var resultsArr = [];

    // Decode president name based on codes
    // because our data doesn't just give us their names
    function candidateDecoder(president) {
        if (president == '1701') {
            return 'McCain';
        } else if (president == '1918') {
            return 'Obama';
        } else {
            return false;
        }
    }

    //check id electionData has been populated
    // if yes then load states and winners into new array localsArr
    if (electionData.find().count() === 1) {
        for (var i in electionData.findOne().locals) {
            localsArr.push(electionData.findOne().locals[i]);
        }
    }

    //empty the resultsData collection
    resultsData.remove({});

    //iterate through localsArrLoad to populate results
    for (i = 0; i < localsArr.length; i++) {

        var stateCode = localsArr[i].abbr;
        var winner = candidateDecoder(localsArr[i].races.President[""].final);

        resultsData.insert({
            "stateCode": stateCode,
            "winner": winner
        });
    }
});

if (Meteor.isClient) {

    Meteor.startup(function () {

        d3.selectAll('path').attr('fill', function () {

            // Get the ID of the path we are currently working with
            // Our SVG uses the state abbreviation for the ID
            var abbr = this.id;
            var stateWinner = "";

            if (resultsData.find({
                stateCode: abbr
            }).count() === 0) {
                stateWinner = 'Unknown';
            } else {
                stateWinner = resultsData.find({
                    stateCode: abbr
                }).fetch()[0].winner;
            }

            if (stateWinner == "Obama") {
                return 'blue'
            } else if (stateWinner == "McCain") {
                return 'red'
            } else {
                return 'purple'
            }

        });

    })
}