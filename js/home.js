firebase.auth().onAuthStateChanged((user)=>{

    if(user){

        let userID = user.uid;
        let userEmail = user.email;

        /*for storing a tweet in firestore*/
        document.getElementById("submit").onclick = function(){

            let tweet = document.getElementById("tweet").value;
            let timestamp = new Date();
            let sendtweet = firebase.firestore().collection("tweets").doc();
            let initialLikeCount = 0;

            sendtweet.set({

                theTweet:tweet,
                tweetTime:timestamp,
                theUserid:userID,
                thetweetID:sendtweet.id,
                thetweetlikes:initialLikeCount

            }).then(()=>{

                window.location.reload();

            }).catch((error)=>{

                alert(error.message);

            })
        }

        firebase.firestore().collection("credentials").get().then((allusers)=>{

            allusers.forEach((IDdoc)=>{
                let theuserid = IDdoc.data().userID;
                let userName = IDdoc.data().theUsername;


                /* for pulling the tweet from firestore where it was stored..*/
                firebase.firestore().collection("tweets").get().then((alltweets)=>{
                
                   let content = '';
                
                   alltweets.forEach((doc)=>{

                       let theid = doc.data().userid;  
                       let post = doc.data().theTweet;
                       let tweetID = doc.data().thetweetID;
                       let tweetLikes = doc.data().thetweetlikes;

                       

                       if(theuserid == theid){

                        //jquery code
                        content += '<div id="othertweets">'
                            content += '<div class="onediv">'
                                content += '<div class="oneone">'
                                    content += '<img src="/images/person.svg">'
                                content += '</div>'
                                content += '<div class="onetwo">'
                                    content += '<div class="tweetowner">'
                                        content += '<p style="font-size:110%; font-weight:600;">' + userName + '</p>'
                                        content += '<p style="color:rgb(120,120,120);">@' + '</p>'
                                        content += '<p style="color:rgb(120,120,120);"> · 21h </p>'
                                    content += '</div>'
                                    content += '<div class="tweetdiv">'
                                        content += '<p id="tweetitself">' + post  + '</p>'
                                        content += '<div style="display:flex; flex-direction:row; gap:0.4rem; margin-top:1rem;">'
                                            content += '<a onclick="tweetid(\'' + tweetID + '\')" data-bs-toggle="modal" data-bs-target="#commentModal"><svg style="width:20px; cursor:pointer; height:20px;" fill="rgb(155, 155, 155)" viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg></a>'
                                            content += '<a><svg style="width:20px; margin-left:6rem; cursor:pointer; height:20px;" fill="rgb(155, 155, 155)" viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg></a>'
                                            content += '<a id="likeclick" onclick="liketweetid(\'' + tweetID + '\')" ><svg style="width:20px; margin-left:6rem; cursor:pointer; height:20px;" fill="rgb(155, 155, 155)" viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg></a> <p>' + tweetLikes + '</p>'
                                            content += '<a><svg style="width:20px; margin-left:6rem; cursor:pointer; height:20px;" fill="rgb(155, 155, 155)" viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path><path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path></g></svg></a>'
                                        content += '</div>'                                                                               
                                    content += '</div>'
                                content += '</div>'
                                content += '<div style="width:20px" class="onethree">'
                                    content += '<a style="border:none; width:10px;" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="tweetid(\'' + tweetID + '\')">'
                                        content += '<svg style="cursor:pointer;" viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><circle cx="5" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="19" cy="12" r="2"></circle></g></svg>'
                                    content += '</a>'
                                content += '</div>'
                            content += '</div>'
                        content += '</div>'


                       }


                       
                   })
                   
                   $("#here").append(content);

                   window.tweetid = function(tweetID){

                        document.getElementById("submitdeleteoption").onclick = function(){
                            firebase.firestore().collection("tweets").doc(tweetID).delete().then(()=>{
                                window.location.reload();
                            })
                        }

                        //function for updating your tweet
                        document.getElementById("submiteditbtn").onclick = function(){
                            console.log(tweetID);
                            let edittweet = document.getElementById("edittweet").value;
                            let newtimestamp = new Date();

                            firebase.firestore().collection("tweets").doc(tweetID).update({
                                theTweet:edittweet,
                                tweetTime:newtimestamp

                            }).then(()=>{
                                window.location.reload();
                            })
        
                        }
                       
                        //function for commenting on a tweet..
                        // 1. for storing the tweet in firebase-firestore
                        document.getElementById("submitcomment").onclick = function(){
                            
                            console.log("comment working");
                            
                            let comment = document.getElementById("comment").value;
                            let addComment = firebase.firestore().collection("comments").doc();

                            addComment.set({
                                
                                theuserID:userID,
                                thecomment:comment,
                                thecommentID:addComment.id,
                                thetweetID:tweetID
                                
                            }).then(()=>{

                                window.location.reload();
                            })                           
                        }

                        // 2. for retrieving the comment from firebase-firestore and showing it in html
                        firebase.firestore().collection("comments").where("thetweetID", "==", tweetID).get().then((querySnapshot)=>{
                            querySnapshot.forEach((doc)=>{

                                let selectedcomment = doc.data().thecomment;
                                
                                let content2 = ''

                                content2 += '<div>'
                                    content2 += '<p>' + selectedcomment + '</p>'
                                content2 += '</div>'

                                $("#othercomments").append(content2);
                            })
                            
                        })
                    }

                    //function for liking a tweet
                    //read the number of likes from firebase-firestore
                    window.liketweetid = function(tweetID){
                        firebase.firestore().collection("tweets").doc(tweetID).get().then((doc)=>{
                        
                            let tweetlikes = doc.data().thetweetlikes;
                            let addlike = tweetlikes + 1;
                    
                            firebase.firestore().collection("tweets").doc(tweetID).update({
                                thetweetlikes:addlike
                            }).then(()=>{
                                window.location.reload();    
                            }).catch((error)=>{
                                console.log("there is something wrong with the like function");
                            })
                        })
                    }
                    
                    
                    
                   
                })
                
                 
            })
        })

        
        


        //for logging out...
        /*document.getElementById("logout").onclick = function(){
            firebase.auth().signOut().then(() => {

                // Sign-out successful.
                window.location.href = "login.html";

              }).catch((error) => {

                // An error happened.....fails to log out the user
                error.message;

              });
        }*/


    } else{
        window.location.href = "login.html";
    }
})