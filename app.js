var electionData = new Meteor.Collection('election');

electionData.allow({insert: function(){return true;}})
electionData.allow({remove: function(){return true;}})

if (Meteor.isClient) {
	     
	Meteor.startup(function () {
		
    var state = d3.selectAll('path').attr('fill', function(d){
	
	// Get the ID of the path we are currently working with
	// Our SVG uses the state abbreviation for the ID
	var abbr = this.id;
	
	// delcare arrays to hold processed JSON data
	var localsArr = [];
	var resultsArr = [];
	
	// declare StatePresident variable
	var statePresident  = "";
	
	// Decode president name based on codes
	// because our data doesn't just give us their names
	function candidateDecoder(president){	
	if(president == '1701'){
		return 'McCain';
	}
	else if(president == '1918') {
		return 'Obama';
	}
	else {
		return false;
	}	
	}

	//check id electionData has been populated
	// if yes then load states and winners into new array stateResults
	if(electionData.find().count() === 1){
		for(var i in electionData.findOne().locals){
			localsArr.push(electionData.findOne().locals[i]);
		}
	}
	
	//iterate through localsArrLoad to populate resultsArr
	for (i=0;i<localsArr.length;i++){
			
	var stateCode = localsArr[i].abbr;
	var winner = candidateDecoder(localsArr[0].races.President[""].final);
		
	resultsArr.push({"stateCode":stateCode, "winner":winner});	
	}
	
	// Loop through the state data looking for
	// a match for that abbreviation
	// Then returning the corresponding president
	// who won that state, from the array we made earlier
	$.each(resultsArr, function(key, data){
		if(resultsArr.stateCode == abbr){
			statePresident = resultsArr.winner;
		}
	})
	 
	// Return colors
	// based on data					
	if(statePresident == "Obama"){
		return "blue"
	}
	else if(statePresident == "McCain"){
		return "red"
	}
	else {
		return "#CCC"
	}
})

}
);

}
else if (Meteor.isServer) {

// On server startup, if the database is empty, create some initial data.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (electionData.find().count() === 0) {        
        electionData.insert(statejson);        
       }          
  });
}

}

