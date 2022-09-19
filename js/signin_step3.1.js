firebase.auth().onAuthStateChanged((user)=>{
    if (user){
        //uploading the profilepic..
        document.getElementById("applyProfileBtn").onclick = function(){
            //gets the file
            let profilepicture = document.getElementById("profilepicture").files[0];
            let userid = user.uid;

            //storage reference
            let storageRef = firebase.storage().ref();

            //uploading the task(pictures)
            let uploadtaskprofile = storageRef.child("profilePicture/").child(Math.random() + profilepicture.name).put(profilepicture);
            uploadtaskprofile.on('state_changed', (snapshot)=>{

                let uploadprogressdecimal = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                let uploadprogress = Math.round(uploadprogressdecimal);
                console.log("profilepic" + " " + uploadprogress);
            }, (error)=>{

                console.log("error uploading the profile picture to storage..");

            },()=>{

                console.log("success uploading the profile picture to storage..")

                uploadtaskprofile.snapshot.ref.getDownloadURL().then((downloadURL)=>{

                    console.log("the link for profpic is" + downloadURL);

                    //for putting the profile pic download link to the profile collection..
                    firebase.firestore().collection("userprofile").doc(userid).update({

                        profilephotoLink:downloadURL 

                    }).then(()=>{

                        console.log("success updating link to firestore(profilepic)");
                        

                    }).catch((error)=>{

                        console.log("error updating the collection in firestore(profilepic)");

                    })
                })
            })

        }

    } else {
        window.location.href = "signin.html";
    }
})