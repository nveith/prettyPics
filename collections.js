var electionData = new Meteor.Collection('election');
var resultsData = new Meteor.Collection('results');

if(Meteor.isServer){
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
}