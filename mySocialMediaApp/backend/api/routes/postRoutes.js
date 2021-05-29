const express = require('express');
const router = express.Router();

// Post Controllers
const postControllers = require('../../controllers/postControllers');

router.get('/allPosts', postControllers.allPosts);
router.post('/createPost', postControllers.createPost);

router.put('/like', postControllers.like);
router.put('/unlike', postControllers.unlike);
router.put('/comment', postControllers.comment);
router.put('/commentReply', postControllers.commentReply);
router.put('/reReply', postControllers.reReply);

router.get('/pagination', postControllers.pagination)


module.exports = router;