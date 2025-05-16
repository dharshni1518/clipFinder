"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useVideoContext } from "../context/VideoContext"
import VideoPlayer from "../components/VideoPlayer"
import VideoCard from "../components/VideoCard"
import "./VideoDetails.css"

const VideoDetails = () => {
  const { videoId } = useParams()
  const { saveVideo, removeVideo, isVideoSaved, trendingVideos } = useVideoContext()
  const [videoDetails, setVideoDetails] = useState(null)
  const [relatedVideos, setRelatedVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const saved = videoDetails ? isVideoSaved(videoDetails.videoId) : false

  useEffect(() => {
    const fetchVideoDetails = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(`/api/videos/${videoId}`)
        setVideoDetails(response.data)

        // Use trending videos as related if available, otherwise fetch related
        if (trendingVideos.length > 0) {
          setRelatedVideos(trendingVideos.filter((v) => v.videoId !== videoId).slice(0, 5))
        } else {
          const relatedResponse = await axios.get(`/api/videos/related/${videoId}`)
          setRelatedVideos(relatedResponse.data)
        }
      } catch (err) {
        setError("Failed to load video details. Please try again later.")
        console.error("Error fetching video details:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchVideoDetails()
  }, [videoId, trendingVideos])

  const handleSaveToggle = () => {
    if (saved) {
      removeVideo(videoId)
    } else if (videoDetails) {
      saveVideo(videoDetails)
    }
  }

  if (loading) {
    return <div className="loading">Loading video details...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!videoDetails) {
    return <div className="error">Video not found</div>
  }

  return (
    <div className="video-details">
      <div className="video-main">
        <VideoPlayer videoId={videoId} />

        <div className="video-info-container">
          <h1 className="video-title">{videoDetails.title}</h1>

          <div className="video-meta">
            <div className="channel-info">
              <div className="channel-avatar">{videoDetails.channelTitle?.charAt(0) || "Y"}</div>
              <div className="channel-details">
                <h3 className="channel-title">{videoDetails.channelTitle}</h3>
                <p className="subscribers">{videoDetails.subscriberCount || "1M"} subscribers</p>
              </div>
            </div>

            <div className="video-actions">
              <button className={`save-button ${saved ? "saved" : ""}`} onClick={handleSaveToggle}>
                <i className={`fas ${saved ? "fa-bookmark" : "fa-bookmark"}`}></i>
                {saved ? "Saved" : "Save"}
              </button>
            </div>
          </div>

          <div className="video-stats">
            <span>{videoDetails.viewCount || "10K"} views</span>
            <span>•</span>
            <span>{videoDetails.publishedAt || "3 days ago"}</span>
            <span>•</span>
            <span>{videoDetails.likeCount || "1.2K"} likes</span>
          </div>

          <div className="video-description">
            <p>{videoDetails.description || "No description available."}</p>
          </div>
        </div>
      </div>

      <div className="related-videos">
        <h2 className="section-title">Related Videos</h2>
        <div className="related-videos-list">
          {relatedVideos.map((video) => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default VideoDetails
