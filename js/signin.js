document.getElementById("signup").onclick = function(){

    let useremail = document.getElementById("email").value;
    let userpass = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(useremail, userpass).then((usercred)=>{

        let fullname = document.getElementById("fullname").value;
        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        //let password = document.getElementById("password").value;
        let signuptime = new Date(); 
        let dob = document.getElementById("DOB").value;

        let userID = usercred.user.uid;
        
        

        firebase.firestore().collection("credentials").doc(userID).set({

            theFullname:fullname,
            theUsername:username,
            theEmail:email,
            theDOB:dob,
            theuserID:userID,
            theSignupTimeStamp:signuptime

        }).then(()=>{

            alert("successful sign up");
            window.location.href = "signin(step2).html";

        }).catch((error)=>{

            alert(error.message);

        })

    }).catch((error)=>{

        alert(error.message);
        

    })
}