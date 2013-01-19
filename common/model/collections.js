var resultsData = new Meteor.Collection('results');

if(Meteor.isServer){

resultsData.allow({
    insert: function () {
        return true;
    },
	remove: function () {
        return true;
    }
});

}



