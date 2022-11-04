import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import { doc, getDocs, collection, deleteDoc } from "firebase/firestore";

function Home({ isAuth }) {
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  let email = process.env.REACT_APP_AUTH_ADMIN_EMAIL;

  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = (id) => {
    const del = async()=> {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc)
        getPosts();
    }
    let conf = window.confirm("Willing to  delete the post?")
    if (conf === true && auth.currentUser.uid !== null) {
      del();
    }
     getPosts();
  };

  const check_user = (post)=> {
    if (auth.currentUser.email !=="") {
      if(auth.currentUser.email === email || post.author.id === auth.currentUser.id) {return true} else {return false}
    }
  }

  return (
    <div className="homePage">
      {postList.length === 0 ? (
        <h3 className="no-posts">No Posts...</h3>
      ) : (
        <>
          {postList.map((post, key) => {
            return (
              <div className="post" key={key}>
                <div className="postHeader">
                  <div className="title">
                    <h1>{post.title}</h1>
                  </div>
                  <div className="deletePost">
                    { isAuth  && check_user(post) ? (
                        <button
                          onClick={() => {
                            deletePost(post.id);
                          }}
                        >
                          {" "}
                          &#128465;{" "}
                        </button>
                      ) : (<></>)}
                  </div>
                </div>
                <div className="postTextContainer">{post.postText}</div>
                <h3>@{post.author.name}</h3>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Home;
