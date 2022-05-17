import React, { useState, useEffect } from "react";
import "./App.css"
import Post from "./Post";
import { auth, db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Modal, makeStyles, Button, Input, } from "@material-ui/core";
import { classes } from "@material-ui/styles";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import ImageUpload from "./ImageUpload";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);

  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  async function loadPosts() {
    const querySnapshot = await getDocs(collection(db, "posts"));
    console.log('querySnapshot', querySnapshot)

    const arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setPosts(arr);
  }

  useEffect(
    () => {

      const unsubscribe =
        auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            console.log(authUser);
            setUser(authUser)

            if (authUser.displayName) {

            } else {
              return authUser.displayName = username;
              // authUser.updateProfile({
              //   displayName: username,
              // })
            }

          }
          else {
            setUser(null);
          }

          return () => { }
          unsubscribe(null)
        })
    }, [user, username]);

  //  useEffect(() => {
  //   // const unsubscribe = 
  //   auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       console.log(authUser);
  //       setUser(authUser)
  //     }
  //     else {
  //       setUser(null);
  //     }
  //   })

  // }, [user, username]);

  useEffect(() => {
    loadPosts()
  }, []);

  const signUp = (Event) => {

    //altera o comportamento padrão do formuláro
    Event.preventDefault();
    console.log(username)
    // teste('pablo@gmail.com', '123456');

    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        console.log(auth.user)

        auth.user.displayName = username
        // auth.user.updateProfile({
        //   displayName: username
        // })
      })
      .catch((error) => alert(error.message));

    // setOpen(false);
  }



  const SignIn = (Event) => {
    Event.preventDefault();

    signInWithEmailAndPassword(auth, email, password).then((user) => {

      console.log('o usário é: ', user);
    }).catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div className="app">
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry, you need to login to Upload</h3>
      )}
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup" >
            <center>
              <img
                className="app_headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram's logo"
              />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={SignIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup" >
            <center>
              <img
                className="app_headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram's logo"
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>
      <div className="app_header">
        <img className="app_headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram's logo"
        />
      </div>
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>) :
        (<div className="app_loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
        )}
      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }

    </div>
  )
}

export default App;
