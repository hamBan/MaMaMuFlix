import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

function VideoPlayerPage() {

    const { uid } = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/getuItem?uid=${uid}`);
                setItem(response.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load video");
            }
        };
        fetchItem();
    }, [uid]);

    if(error) return <div>{error}</div>
    // if(!item) return <div>Loading...</div>

  return (
    <div style={{ position: 'relative' }}>
        <button className="close-button" onClick={() => navigate(-1)}>
            <img src="/assets/close.svg" alt="Close" />
        </button>
          
        { item && <VideoPlayer
            title = {item.title}
            runtime = {item.duration}
            videoId={item.video}
            thumbnail={item.poster}
            genre = {item.genre}
        /> }
    </div>
  )
}

export default VideoPlayerPage