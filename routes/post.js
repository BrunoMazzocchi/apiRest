const express = require("express");
const router = express.Router()
const postController = require('../controllers/post');
const verify = require('../middleware/verifyToken');

router.get('/', verify, postController.getAllPost);

router.post('/new', verify, postController.uploadImg, postController.newPost);
router.get('/:id', verify, postController.getPost);
router.patch('/edit/:id', verify, postController.updatePost);
router.delete('/delete/:id', verify, postController.deletePost);


module.exports = router

