Meteor.startup(function () {
	
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

    //iterate through localsArrLoad to populate results
    Meteor.methods({'resultsLoad' : function (){
    	
    		var success = false;
    		    
    		//empty the resultsData collection
    		resultsData.remove({});
    		
    		console.log(_.size(statejson.locals));
    		
    		for (x in statejson.locals){
    		
    			var stateCode = statejson.locals[x].abbr;
    			var winner = candidateDecoder(statejson.locals[x].races.President[""].final);
    			
    			//console.log("stateCode: " + stateCode + "|" + "winner: " + winner);
    			
    			resultsData.insert({
			            "stateCode": stateCode,
			            "winner": winner
		        	},function(error,result) {if(!error) {success = true;}
		    			});
    		}
			
	        return success;
	        
		    }
		})
		
})

