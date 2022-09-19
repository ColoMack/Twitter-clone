firebase.auth().onAuthStateChanged((user)=>{
    if (user){
        document.getElementById("nextbtn1").onclick = function(){
            let location = document.getElementById("location").value;
            let website = document.getElementById("website").value;
            let bio = document.getElementById("bio").value;
            let userid = user.uid;

            firebase.firestore().collection("userprofile").doc(userid).set({
                theLocation:location,
                theBio:bio,
                theWebsite:website,
                theUserID:userid
            }).then(()=>{
                window.location.href = "signin(step3).html";
            })
        }
    } else{
        window.location.href = "signin.html";
    }
})
