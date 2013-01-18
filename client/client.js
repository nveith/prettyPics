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