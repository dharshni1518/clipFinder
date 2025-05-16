"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import PlaylistForm from "../components/playlists/PlaylistForm"
import "./PlaylistsPage.css"

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchPlaylists()
  }, [])

  const fetchPlaylists = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await axios.get("https://clipfinder.onrender.com/api/playlists")
      setPlaylists(res.data)
    } catch (err) {
      setError("Failed to fetch playlists. Please try again.")
      console.error("Error fetching playlists:", err)
    } finally {
      setLoading(false)
    }
  }

  const handlePlaylistCreated = (newPlaylist) => {
    setPlaylists([newPlaylist, ...playlists])
    setShowForm(false)
  }

  if (loading) {
    return <div className="loading">Loading playlists...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="playlists-page">
      <div className="playlists-header">
        <h1 className="page-title">Your Playlists</h1>
        <button className="create-playlist-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Create Playlist"}
        </button>
      </div>

      {showForm && <PlaylistForm onPlaylistCreated={handlePlaylistCreated} />}

      {playlists.length === 0 ? (
        <div className="no-playlists">
          <p>You don't have any playlists yet.</p>
          <p>Create a playlist to organize your favorite clips.</p>
        </div>
      ) : (
        <div className="playlists-grid">
          {playlists.map((playlist) => (
            <Link to={`/playlists/${playlist._id}`} className="playlist-card" key={playlist._id}>
              <div className="playlist-thumbnail">
                {playlist.videos.length > 0 ? (
                  <img src={playlist.videos[0].thumbnail || "/placeholder.svg"} alt={playlist.name} />
                ) : (
                  <div className="empty-thumbnail">
                    <i className="fas fa-film"></i>
                  </div>
                )}
                <div className="video-count">
                  {playlist.videos.length} {playlist.videos.length === 1 ? "video" : "videos"}
                </div>
              </div>
              <div className="playlist-info">
                <h3 className="playlist-name">{playlist.name}</h3>
                {playlist.description && <p className="playlist-description">{playlist.description}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default PlaylistsPage
