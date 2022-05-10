import React from 'react';
import "./Post.css"
import Avatar from "@material-ui/core/Avatar"


// import { Container } from './styles';

function Post({ username, caption, imageUrl }) {
    return (
        <div className="post">
            <div className="post_header">
                <Avatar
                    className="post_avatar"
                    alt="afonsofernando051"
                    src="./images/foto.jpg"
                />

                <h3>{username}</h3>
            </div>
            <img className="post_image" src={imageUrl}
                alt="Instagram's Post" />

            <h4 className="post_text"><strong>{username} </strong>{caption}</h4>
        </div>
    )
}

export default Post;