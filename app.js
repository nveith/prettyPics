var electionData = new Meteor.Collection('election');

var states = electionData.find({}, {fields: {locals: 1}}).fetch();

//console.log(states);

if (Meteor.isClient) {
	    
function candidate_id_decoder(president){	
	// Decode president name based on codes
	// because our data doesn't just give us their names
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

console.log(states);

//function stateResults(){
//if(electionData.find().count() === 0){
//	console.log("No rows in electionData");
//}
//else {
//	console.log("Rows found in electionData");
//	return electionData.findOne({},{locals:1});
//}
//}
	
console.log("end of isClient block");

}
else if (Meteor.isServer) {
	
electionData.allow({insert: function(){return true;}})

//db.electionData.remove()

console.log(electionData.find().count());

// On server startup, if the database is empty, create some initial data.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (electionData.find().count() === 0) {        
        electionData.insert(statejson);        
       }
  });
}

console.log(states);

}
