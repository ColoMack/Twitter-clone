/* this code is for getting the users credentials from firebase and sending them to the profile page(html), using their ids.. */

firebase.auth().onAuthStateChanged((user)=>{
    
    if (user){

        let userID = user.uid;
        console.log(userID);

        firebase.firestore().collection("credentials").doc(userID).get().then((credentialDoc)=>{

            let fullname = credentialDoc.data().theFullname;
            let emailuser = credentialDoc.data().theEmail;
            let accountdate = credentialDoc.data().signupTimeStamp;
            
            console.log(credentialDoc.data());
        })
    }
})