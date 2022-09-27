firebase.auth().onAuthStateChanged((user)=>{
    if (user){
        //uploading the profilepic..
        document.getElementById("applyProfileBtn").onclick = function(){
            //gets the file
            let backgroundpicture = document.getElementById("backgroundpicture").files[0];
            let userid = user.uid;

            //storage reference
            let storageRef = firebase.storage().ref();

            //uploading the task(pictures)
            
            let uploadtaskbackground = storageRef.child("backgroundPicture/").child(Math.random() + backgroundpicture.name).put(backgroundpicture);
            uploadtaskbackground.on('state_changed', (snapshot)=>{

                let uploadprogressdecimal = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                let uploadprogress = Math.trunc(uploadprogressdecimal);
                console.log("backgroundpic" + " " + uploadprogress);
            },(error)=>{

                console.log("error uploading background pic to storage");

            },()=>{

                console.log("success uploading the background picture to storage..")

                uploadtaskbackground.snapshot.ref.getDownloadURL().then((downloadURL1)=>{

                    console.log("the link for backgroundpic is " + downloadURL1);

                    //for putting the profile pic download link to the profile collection..
                    firebase.firestore().collection("userprofile").doc(userid).update({

                        backgroundphotoLink:downloadURL1 

                    }).then(()=>{

                        console.log("success updating link to firestore(backgroundpic)");
                        

                    }).catch((error)=>{

                        console.log("error updating the collection in firestore(backgroundpic)");

                    })
                })
            })
        }

    } else {
        window.location.href = "signin.html";
    }
})