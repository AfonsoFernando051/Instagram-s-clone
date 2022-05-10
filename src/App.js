import React, { useState, useEffect } from "react";
import "./App.css"
import Post from "./Post";
import Bleed from "./images/toronto1992.jpg"
import Setup from "./images/setup.jpg"
import Foto from "./images/foto.jpg"
import db from "./firebase";

function App() {
  const [posts, setPosts] = useState([
    {
      username: "afonsofernando051",
      caption: "Dia de aprendizado e estudo em ReactJS!",
      imageUrl: Setup
    },
    {
      username: "AliceInChains",
      caption: "Incredible live in Toronto, 1992",
      imageUrl: Bleed
    },
  ]);

  // useEffect(() => {

  //   db.collection("posts").onSnapshot(snapshot => {
  //     setPosts(snapshot.docs.map(doc => doc.data()))
  //   })
  // }, []);

  return (
    <div className="app">
      <div className="app_header">
        <img className="app_headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram's logo"
        />
      </div>

      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
      <Post username="afonsofernando051" caption="Dia de aprendizado e estudo em ReactJS!" imageUrl={Setup} />
      <Post username="AliceInChains" caption="Incredible live in Toronto, 1992" imageUrl={Bleed} />
      <Post username="afonsofernando051" caption="Incrível praia em Portugal!" imageUrl={Foto} />
    </div>
  )
}

export default App;
