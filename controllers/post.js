const Post = require('../models/Post');
const multer = require('multer');

//Storage
const storage = multer.diskStorage ({
    destination: function (req, file, cb){
        cb(null, './uploads');
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    }
})
const uploadImg = multer({storage}).single('image');


const newPost = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        image: req.file.path 
        })
    
    await post.save(
        res.send(post)
    )
};

const getAllPost = async (req, res) => {
    const posts = await Post.find()
    res.send(posts)
};
 
const getPost =  async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        res.send(post)
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        if (req.body.title) {
            post.title = req.body.title
        }

        if (req.body.content) {
            post.content = req.body.content
        }

        await post.save()
        res.send(post)
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
};

const deletePost = async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
};

module.exports = {

    newPost,
    uploadImg,
    getAllPost,
    getPost,
    updatePost,
    deletePost

}