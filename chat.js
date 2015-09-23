MessageHistory = new Mongo.Collection("messages");

if (Meteor.isClient) {

  function scrollHistoryToBottom(){
    $('#message_history').each(function(i, hist){
      hist.scrollTop = hist.scrollHeight
    });
  }

  Template.body.helpers({
    messageHistory: function () {
      return MessageHistory.find({});
    },
    showLogin: function(){
      return Session.get('userName')==undefined || Session.get('userName').length==0;
    }
  });

  Template.chatForm.helpers({
    userName: function(){
      return Session.get('userName');
    }
  });

  Template.message.helpers({
    isMe: function(){
      return this.userName == Session.get('userName');
    }
  });

  Template.message.rendered = function(){
    scrollHistoryToBottom();
  };

  Template.registerHelper('formatDate', function(date) {
    return date.toLocaleString();
  });

  Template.body.events({
    'submit .chatForm': function () {
      event.preventDefault();

      var newMessageText = event.target.message.value;

      MessageHistory.insert({
        userName: Session.get('userName'),
        text: newMessageText,
        createdAt: new Date()
      });

      event.target.message.value="";
    },
    'submit .loginForm': function() {
      event.preventDefault();
      Session.set('userName', event.target.userName.value);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
