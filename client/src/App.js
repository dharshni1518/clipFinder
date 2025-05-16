import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { VideoProvider } from "./context/VideoContext"
import { AuthProvider } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import SearchResults from "./pages/SearchResults"
import SavedClips from "./pages/SavedClips"
import VideoDetails from "./pages/VideoDetails"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import PlaylistsPage from "./pages/PlaylistsPage"
import PlaylistDetails from "./pages/PlaylistDetails"
import PrivateRoute from "./components/auth/PrivateRoute"
import "./App.css"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <VideoProvider>
          <Router>
            <div className="app">
              <Navbar />
              <main className="container">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/video/:videoId" element={<VideoDetails />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  {/* Protected routes */}
                  <Route
                    path="/saved"
                    element={
                      <PrivateRoute>
                        <SavedClips />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/playlists"
                    element={
                      <PrivateRoute>
                        <PlaylistsPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/playlists/:id"
                    element={
                      <PrivateRoute>
                        <PlaylistDetails />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </main>
            </div>
          </Router>
        </VideoProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
