import React, { useState, useRef, useEffect, useCallback } from 'react';
 
const ProgressBar = ({ player }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressBarRef = useRef(null);
 
  useEffect(() => {
    let intervalId;
 
    const updateProgress = async () => {
      if (player && player.getCurrentTime && player.getDuration) {
        const current = await player.getCurrentTime();
        const total = await player.getDuration();
        setCurrentTime(current);
        setDuration(total);
      }
    };
 
    if (player) {
      updateProgress();
      intervalId = setInterval(updateProgress, 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [player]);

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${min}:${s < 10 ? '0' : ''}${s}`;
  };
 
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
 
  const handleProgressBarClick = useCallback((e) => {
    if (player && progressBarRef.current) {
      const clickX = e.nativeEvent.offsetX;
      const barWidth = progressBarRef.current.offsetWidth;
      const seekTime = (clickX / barWidth) * duration;
      if (player.seekTo) {
        player.seekTo(seekTime, true);
      }
    }
  }, [player, duration]);
 
  return (

    <>
    <div
      ref={progressBarRef}
      style={{
        width: '100%',
        height: '10px',
        backgroundColor: '#333',
        cursor: 'pointer',
        borderRadius: '5px',
        overflow: 'hidden', // To keep the inner bar rounded
        marginTop: '10px'
      }}
      onClick={handleProgressBarClick}
      title={`Current Time: ${Math.floor(currentTime)}s / Duration: ${Math.floor(duration)}s`}
    >
        <div
            style={{
            width: `${progressPercentage}%`,
            height: '100%',
            backgroundColor: '#FF0000', // YouTube Red
            borderRadius: '5px',
            transition: 'width 0.9s linear' // Smooth transition for progress bar
            }}
        />
    </div>
    <div>
        {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : '...'}
    </div>
    </>
  );
};

export default ProgressBar;