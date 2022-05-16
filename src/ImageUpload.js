import { Button } from '@material-ui/core';
import React, { useState } from 'react';

// import { Container } from './styles';

function ImageUpload() {
    const [caption, setCaption] = useState("")
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return <div>
        <input type="text" placeholder="Enter a caption..." onChange={event => setCaption(event.target.value)} value={caption} />
        <input type="file" onChange={handleChange} />
        <Button onClick={handleUpload}>
            Upload
        </Button>

    </div>;
}

export default ImageUpload;