import React, { useEffect, useState } from "react";
import { doc, addDoc, collection, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [author, setAuthor] = useState("");
  const [checkAuthor, setCheckAuthor] = useState(false);
  const [annonymous, setAnnonymous] = useState(false);

  const [userData, setUserData] = useState("");

  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    checkIsUser();
    getUser();
    // checkAnnonymous();
  }, []);

  // console.log(annonymous, author)
  // let data = annonymous ? ("Annonymous") : ('author')

  // console.log(data)

  const createPost = async () => {
    if (title === "" || postText === "") {
      alert("Please consider about all the fields !");
    } else {
      await addDoc(postsCollectionRef, {
        title,
        postText,
        author: {
          id: auth.currentUser.uid,
          name: annonymous ? "Annonymous" : author,
        },
      });
      navigate("/");
      window.event.preventDefault();
    }
  };
  // console.log(auth.currentUser.email, auth.currentUser.displayName)
  // const checkAnnonymous = (check) => {
  //   // if (document.getElementById("checkbox").checked === true) {
  //   //   setAnnonymous(true);
  //   // } else {
  //   //   setAnnonymous(false);
  //   // }
  //   // alert(check)
  //   // if (annonymous === true) {
  //   //  console.log('checked')
  //   // } else {
  //   //   console.log('not-checked')
  //   // }
  // };
  const checkIsUser = async () => {
    if (!isAuth) {
      navigate("/");
    }
  };
  const getUser = async () => {
    const docRef = doc(db, "users", auth.currentUser.email);
    const docSnap = await getDoc(docRef);
    setUserData(docSnap.data());
  };

  // const docRef = doc(db, "users", auth.currentUser.email);
  // const docRef = collection(db, "users");
  // useEffect(() => {
  //     const getUser = async () => {
  //         const docSnap = await getDoc(docRef);
  //         setUserData(docSnap.docs.map((doc)=> ({...doc.data(), id: doc.id})))
  //     }
  //     getUser()
  // },[])

  // const handleCheckClick = (e) => {
  //     setCheckAuthor(false);
  //     setAuthor(e);
  // }

  // console.log(userData)

  return (
    <div className="createPostPage">
      {" "}
      <div className="cpContainer">
        <h1>Create A Post</h1>
        {/* <div className='inputGp'>
                    <label>Thumbnail:</label>
                    <input type='file'/>
                    <button>Upload</button>
                </div> */}
        <div className="inputGp">
          <label className="l1">Title:</label>
          <input
            contentEditable="true"
            spellCheck="true"
            placeholder="Title..."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label className="l1">Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label className="l1">Author:</label>
          <input
            contentEditable="true"
            spellCheck="true"
            placeholder="Author..."
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
        </div>
        <div className="inputGpAn1">
          <label className="ln1">
            Annonymous?:
            <input
              id="checkbox"
              className="inputAn1"
              type="checkbox"
              defaultChecked={annonymous}
              onClick={(e) => {
                setAnnonymous(!annonymous);
              }}
            />
          </label>
        </div>
        <button className="submit-btn" onClick={createPost}>
          Submit Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
