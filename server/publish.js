Meteor.publish('resultsData', function() {
return resultsData.find({});
});