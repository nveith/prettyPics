Meteor.startup(function () {
    if (electionData.find().count() === 0) {
        electionData.insert(statejson);
    }

    // delcare arrays to hold processed JSON data
    var localsArr = [];

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
    Meteor.methods({'resultsLoad' : function (){
    		var success = false;
    	   	for (i = 0; i < localsArr.length; i++) {
    	   		success = false;
		        var stateCode = localsArr[i].abbr;
		        var winner = candidateDecoder(localsArr[i].races.President[""].final);
		        resultsData.insert({
		            "stateCode": stateCode,
		            "winner": winner
		        },function(error,result) {if(!error) {success = true;}
		    		});
		    	}
		    return sucess;
		    }
	    })
	});

