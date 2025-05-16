"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import { useAuthContext } from "./AuthContext"

const VideoContext = createContext()

export const useVideoContext = () => useContext(VideoContext)

export const VideoProvider = ({ children }) => {
  const [trendingVideos, setTrendingVideos] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [savedVideos, setSavedVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [categories] = useState(["drama", "action", "comedy", "romance", "thriller"])
  const [selectedCategory, setSelectedCategory] = useState("drama")

  const { isAuthenticated } = useAuthContext()

  // Fetch trending videos
  const fetchTrendingVideos = async (category = selectedCategory) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`https://clipfinder.onrender.com/api/videos/trending?category=${category}`)
      setTrendingVideos(response.data)
      setSelectedCategory(category)
    } catch (err) {
      setError("Failed to fetch trending videos. Please try again later.")
      console.error("Error fetching trending videos:", err)
    } finally {
      setLoading(false)
    }
  }

  // Search videos
  const searchVideos = async (query) => {
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`https://clipfinder.onrender.com/api/videos/search?q=${query}`)
      setSearchResults(response.data)
    } catch (err) {
      setError("Failed to search videos. Please try again later.")
      console.error("Error searching videos:", err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch saved videos
  const fetchSavedVideos = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get("https://clipfinder.onrender.com/api/videos/saved")
      setSavedVideos(response.data)
    } catch (err) {
      setError("Failed to fetch saved videos. Please try again later.")
      console.error("Error fetching saved videos:", err)
    } finally {
      setLoading(false)
    }
  }

  // Save a video
  const saveVideo = async (video) => {
    if (!isAuthenticated) {
      setError("Please log in to save videos")
      return false
    }

    try {
      await axios.post("https://clipfinder.onrender.com/api/videos/save", video)
      // Update saved videos list
      fetchSavedVideos()
      return true
    } catch (err) {
      setError("Failed to save video. Please try again later.")
      console.error("Error saving video:", err)
      return false
    }
  }

  // Remove a saved video
  const removeVideo = async (videoId) => {
    if (!isAuthenticated) return

    try {
      await axios.delete(`https://clipfinder.onrender.com/api/videos/saved/${videoId}`)
      // Update saved videos list
      setSavedVideos(savedVideos.filter((video) => video.videoId !== videoId))
      return true
    } catch (err) {
      setError("Failed to remove video. Please try again later.")
      console.error("Error removing video:", err)
      return false
    }
  }

  // Check if a video is saved
  const isVideoSaved = (videoId) => {
    return savedVideos.some((video) => video.videoId === videoId)
  }

  // Load trending videos on initial render
  useEffect(() => {
    fetchTrendingVideos()
  }, [])

  // Fetch saved videos when authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchSavedVideos()
    } else {
      setSavedVideos([])
    }
  }, [isAuthenticated])

  return (
    <VideoContext.Provider
      value={{
        trendingVideos,
        searchResults,
        savedVideos,
        loading,
        error,
        categories,
        selectedCategory,
        setSelectedCategory,
        fetchTrendingVideos,
        searchVideos,
        fetchSavedVideos,
        saveVideo,
        removeVideo,
        isVideoSaved,
      }}
    >
      {children}
    </VideoContext.Provider>
  )
}
