import React, { useEffect, useRef, useState } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ title, runtime, videoId, thumbnail, genre }) => {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);

  const [player, setPlayer] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const hideTimeout = useRef(null);

  // Load player
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const interval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(interval);
          initPlayer();
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
  const handleFullscreenChange = () => {
    const fullscreenActive = !!document.fullscreenElement;
    setIsFullscreen(fullscreenActive);
  };

  document.addEventListener('fullscreenchange', handleFullscreenChange);
  return () => {
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
  };
}, []);


  const initPlayer = () => {
    const ytPlayer = new window.YT.Player(playerRef.current, {
      height: '100%',
      width: '100%',
      videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        fs: 0,
        disablekb: 1,
        iv_load_policy: 3,
      },
      events: {
        onReady: (e) => {
          const yt = e.target;
          setPlayer(yt);

          // Handle delayed duration
          let dur = yt.getDuration();
          if (dur && dur > 0) {
            setDuration(dur);
          } else {
            const durInterval = setInterval(() => {
              dur = yt.getDuration();
              if (dur && dur > 0) {
                setDuration(dur);
                clearInterval(durInterval);
              }
            }, 500);
          }
        },
        onStateChange: (e) => {
          if (e.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            requestAnimationFrame(updateProgress);
          } else if (e.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          }
        },
      },
    });
  };

  const playVideo = () => {
    if (player) {
      setIsPlaying(true);
      player.playVideo();
    }
  };

  const pauseVideo = () => {
    if (player) {
      setIsPlaying(false);
      player.pauseVideo();
    }
  };

  const handleSeek = (e) => {
    const value = parseFloat(e.target.value);
    if (player && duration > 0) {
      const newTime = (value / 100) * duration;
      player.seekTo(newTime, true);
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    
    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };


  const updateProgress = () => {
    if (player && player.getCurrentTime) {
      const time = player.getCurrentTime();
      setCurrentTime(time);

      if (progressRef.current && duration > 0) {
        progressRef.current.value = (time / duration) * 100;
      }

      if (player.getPlayerState() === window.YT.PlayerState.PLAYING) {
        requestAnimationFrame(updateProgress);
      }
    }
  };

  const handleReplay = () => {
    if (player && player.getCurrentTime) {
      const current = player.getCurrentTime();
      player.seekTo(Math.max(current - 5, 0), true);
    }
  };
  
  const handleFastForward = () => {
    if (player && player.getCurrentTime && duration > 0) {
      const current = player.getCurrentTime();
      player.seekTo(Math.min(current + 5, duration), true);
    }
  };

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${min}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleMouseMove = () => {
    if (!isPlaying) return;
    setShowControls(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isPlaying]);

  return (
    <div className="ytp-wrapper">
      <div ref={containerRef} className="ytp-container">
        <div ref={playerRef} className="ytp-iframe" />

        {isPlaying && <div className="ytp-overlay-cover" />}
        {isPlaying && <div className="ytp-watermark-cover" />}

        {!isPlaying && (
          <div className="ytp-overlay" onClick={playVideo}>
            <img src={thumbnail} alt="Video Thumbnail" className="ytp-thumbnail" />
            <div className="ytp-play-button">▶</div>
          </div>
        )}

        {isPlaying && (
          <div className={`ytp-controls ${showControls ? 'visible' : 'hidden'}`}>
            <button onClick={handleReplay}>
              <img src="/assets/replay_5.svg" alt="Replay 5s" className="control-icon"/>
            </button>

            {isPlaying ? <button onClick={pauseVideo}>
              <img src="/assets/pause.svg" alt="Pause" className="control-icon" /></button> :
              <button onClick={pauseVideo}>
                <img src="/assets/play.svg" alt="Play" className="control-icon" /></button> }

            <button onClick={handleFastForward} >
              <img src="/assets/forward_5.svg" alt="Forward 5s" className="control-icon"/>
            </button>

            <input
              ref={progressRef}
              type="range"
              min="0"
              max="100"
              defaultValue="0"
              onChange={handleSeek}
              className="ytp-progress"
            />
            <span className="ytp-time">
              {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : '...'}
            </span>

            <button onClick={toggleFullscreen}>
              <img src={isFullscreen ? "/assets/fullscreen_exit.svg" : "/assets/fullscreen.svg"} alt="Fullscreen Toggle" className="fullscreen-icon" /> {/* icon changes based on state */}</button>
          </div>
        )}
      </div>

      <div className="ytp-info">
        <h2 className="ytp-title">{title}</h2>
        <div className="ytp-meta">
          <div>Duration: {Math.floor(runtime/60)}hr {runtime%60}min</div>
          <div>Genre: {genre}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;