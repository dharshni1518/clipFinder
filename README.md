# YouTube Clips Finder

A web application to discover, search, and save drama and movie clips from YouTube.

## Features

- Search for drama and movie clips from YouTube
- Browse trending clips by category
- Save favorite clips for later viewing
- View detailed information about each clip
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **External API**: YouTube Data API v3

## Project Structure

\`\`\`
youtube-clips-finder/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # Reusable components
│       ├── context/        # Context API for state management
│       ├── pages/          # Page components
│       └── ...
├── server/                 # Node.js/Express backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   └── server.js           # Express server setup
└── ...
\`\`\`

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- YouTube Data API key

### Setup

1. Clone the repository:
   \`\`\`
   git clone https://github.com/yourusername/youtube-clips-finder.git
   cd youtube-clips-finder
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm run install-all
   \`\`\`

3. Create a `.env` file in the server directory:
   \`\`\`
   cp server/.env.example server/.env
   \`\`\`

4. Update the `.env` file with your MongoDB URI and YouTube API key.

5. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`

6. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- `GET /api/videos/search` - Search videos using YouTube API
- `GET /api/videos/trending` - Get trending videos
- `POST /api/videos/save` - Save a video to favorites
- `GET /api/videos/saved` - Get user's saved videos
- `DELETE /api/videos/saved/:id` - Remove a saved video
- `GET /api/videos/:videoId` - Get video details
- `GET /api/videos/related/:videoId` - Get related videos

## Deployment

### Heroku Deployment

1. Create a Heroku account and install the Heroku CLI
2. Login to Heroku:
   \`\`\`
   heroku login
   \`\`\`
3. Create a new Heroku app:
   \`\`\`
   heroku create youtube-clips-finder
   \`\`\`
4. Set environment variables:
   \`\`\`
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set YOUTUBE_API_KEY=your_youtube_api_key
   heroku config:set NODE_ENV=production
   \`\`\`
5. Push to Heroku:
   \`\`\`
   git push heroku main
   \`\`\`

## License

MIT
