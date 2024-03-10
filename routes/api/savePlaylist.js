const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth'); 
const Playlist = require('../../models/Playlists');
const mongoose = require('mongoose');
const axios = require('axios');

// Route to save a playlist
router.post("/save", auth, async (req, res) => {
  console.log('Received POST request to /api/savePlaylist');
  console.log('Request Body:', req.body);
  console.log('Received Token:', req.header('x-auth-token'));
  try {
    const { name, links } = req.body;
    console.log('User ID from req.user.id:', req.user.id);

    const userId = new mongoose.Types.ObjectId(req.user.id);
    console.log('Converted User ID to ObjectId:', userId);
    console.log('Name and Links:', name, links);
    // Create a new playlist
    const newPlaylist = new Playlist({
      name,
      links,
      user: userId, 
    });

    // Save the playlist to the database
    const savedPlaylist = await newPlaylist.save();

    res.json(savedPlaylist);
  } catch (error) {
    console.error('Error saving playlist:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Additional routes for updating, deleting, or fetching playlists can be added as needed
// ...

module.exports = router;
