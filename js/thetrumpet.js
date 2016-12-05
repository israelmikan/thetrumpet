  // Create a reference to firebase
  var messagesRef = new Firebase('https://kigezifm.firebaseio.com/');
document.getElementById("nameInput").value = localStorage.whoname;

document.getElementById("locInput").value = localStorage.locationy;  // C.R.E.A.M -  cache your elements
  var messageField = $('#messageInput');
  var nameField = $('#nameInput');
  var locationy=$('#locInput');
  
  var messageList = $('.messages');

  function addMessage(data) {
     var username = data.name || 'anonymous'; 
    var message = data.text;
	var location = data.location;

    // Create an element
    
   // var nameElement = $('<strong>').text(location).prepend(username+"  From ");
    var nameElement = $('<strong>').text(" Name: "+username);
    //var nameElement = $('<strong>').text(location).prepend(username+"  From ");
	  var locele=$('<p>').text("Location: "+location+"\n");
    var messageElement = $('<li>').text("Msg>>: "+message).prepend(nameElement).prepend(locele);
     
    // Add the message to the DOM
    messageList.append(messageElement);

    // Scroll to the bottom of the message list
    messageList[0].scrollTop = messageList[0].scrollHeight;
  }

  // Listen for the form submit
  $('.chat').on('submit',function(e) {

    // stop the form from submitting
    e.preventDefault();
if(localStorage.userlat==null && localStorage.userlong==null){
  localStorage.userlat="undefined";
  localStorage.userlong="undefined";
}else{
  
}
    // create a message object
    var message = {
      name : localStorage.whoname,
      text : messageField.val(),
      location : localStorage.locationy,
      latitude:localStorage.userlat,
      longitude:localStorage.userlong
    }

    // Save Data to firebase
    messagesRef.push(message);

    // clear message field
    messageField.val('');


  });

  // Add a callback that is triggered for each chat message
  // this is kind of like an Ajax request, but they come in via websockets
  // 10 of them will load on page load, and any future messages will as well
  messagesRef.limitToLast(50).on('child_added', function (snapshot) {
    // Get data from returned
    addMessage(snapshot.val());
  });
