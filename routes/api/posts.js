const express = require('express');
const PostsController = require('../../controllers/PostsController');
const router = express.Router();
router.get('/', PostsController.getposts);
router.post('/', PostsController.createNewPost);

module.exports = router;
