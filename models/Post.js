const mongoose = require('mongoose'); //require mongoose

//Defining Post schema
const PostSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});
//creating a Post model 
const Post = mongoose.model('Post', PostSchema);
//this gives you all list of posts
exports.getAllPosts = () => {
    return Post.find().select('_id title content');
}
//creating new post and exporting
exports.createPost = (title, content) => {
    const post = new Post({
        _id: new mongoose.Types.ObjectId,
        title: title,
        content:content
    });
    return post.save();
}

exports.updatePost=(pId,title,content)=>{
    const post=new Post({
        id:pId,
        title:title,
        content:content
    });

   return  Post.updateOne({ _id: pId }, post);
}

exports.getPost=(pId)=>{
  return  Post.findById(pId);

}
