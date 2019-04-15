const express = require('express');
const PostsController = require('../../controllers/PostsController');
const router = express.Router();
router.get('/', PostsController.getposts);
router.post('/', PostsController.createNewPost);
router.patch('/:postId',PostsController.updateAPost);
router.get('/:postId',PostsController.getApost);
router.delete('/:postId',PostsController.deleteApost);

module.exports = router;
