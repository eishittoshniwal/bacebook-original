//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyCp-7Ckgz_MMs_cB3LTOhfqqJcbuUwnk-U",
      authDomain: "bace-book.firebaseapp.com",
      databaseURL: "https://bace-book-default-rtdb.firebaseio.com",
      projectId: "bace-book",
      storageBucket: "bace-book.appspot.com",
      messagingSenderId: "922308197134",
      appId: "1:922308197134:web:9ad5a7d2fa9550ddb5b55f"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    room_name=localStorage.getItem("room")
    username=localStorage.getItem("username")

    function send() {
          msg=document.getElementById("msg").value
          firebase.database().ref(room_name).push({
                USER:username,
                MSG:msg,
                LIKES:0
             })
             document.getElementById("msg").value=""
    }
 
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id)
console.log(message_data)
//code for creating tag for username
user=message_data["USER"]
console.log(user)
usertag=`<h4>${user}</h4>`
//code for creating tag for message
message=message_data["MSG"]
console.log(message)
messagetag=`<h4>${message}</h4>`
//code for creating tag for like 
like=message_data["LIKES"]
console.log(like)
liketag=`<button class="btn btn-warning" id=${firebase_message_id} value=${like} onclick="updatelike(this.id)"><span class="glyphicon glyphicon-thumbs-up"></span> Like : ${like}</button>`

document.getElementById("output").innerHTML+=usertag+messagetag+liketag+`<hr>`
//End code
      } });  }); }
getData();

function logout() {
      localStorage.removeItem("room")
      localStorage.removeItem("username")
      window.location="login.html"

}

function updatelike(buttonid) {
      likes=document.getElementById(buttonid).value
      updatedlikes=Number(likes)+1
      firebase.database().ref(room_name).child(buttonid).update({
            LIKES:updatedlikes
      })   
      }
