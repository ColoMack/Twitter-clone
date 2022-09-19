document.getElementById("login").onclick = function(){

    var email = document.getElementById("email1").value;
    var password = document.getElementById("password1").value;

    firebase.auth().signInWithEmailAndPassword(email, password).then((usercred)=>{

        console.log("logged in");
        window.location.href = "landingpage.html";

    }).catch((error)=>{

        alert(error.message);
        
    })
}