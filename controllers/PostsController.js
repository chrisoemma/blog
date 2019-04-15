
const mongoose = require('mongoose');
const Post = require('../models/Post');
exports.getposts = (req, res, next) => {
    Post.getAllPosts()
        .exec()
        .then(docs => {
            const reponse = {
                code: 200,
                message: 'Successfully',
                count: docs.length,
                data: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        content: doc.content,
                        createdAt: doc.created_at,
                        updatedAt: doc.updated_at,
                        request: {
                            type: 'GET',
                        }
                    }
                })
            }
            res.status(200).json(reponse);
        })
        .catch(err => {
            res.status(500).json({
                code: err.status,
                error: err,
                name: err.name,
                stack: err.stack
            });
        })
}
exports.createNewPost = (req, res, next) => {
    Post.createPost(req.body.title, req.body.content)
        .then(result => {
            res.status(201).json({
                code: 201,
                message: 'Succesfully Created',
                count: result.length,
                data: {
                    _id: result._id,
                    title: result.title,
                    body: result.content
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                code: err.status,
                error: err,
                name: err.name,
                stack: err.stack
            });
        })
}

exports.updateAPost=(req,res,next)=>{
    const id=req.params.postId;
    Post.updatePost(id,req.body.title,req.body.content)
    .exec()
    .then(result=>{
    
     res.status(200).json({
        code: 200,
        message: 'Succesfully Updated',
        count: result.length,
        data: {
            _id: result._id,
            title: result.title,
            body: result.content
        }
     })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
             code: err.status,
             error: err,
             name: err.name,
             stack: err.stack
        });
    });

}