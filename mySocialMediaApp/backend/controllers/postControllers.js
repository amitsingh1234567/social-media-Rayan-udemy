const Post = require('../models/postModel');



exports.pagination = (req, res) => {
    const user = [
        {id: 1, name: 'test-1'},
        {id: 2, name: 'test-2'},
        {id: 3, name: 'test-3'},
        {id: 4, name: 'test-4'},
        {id: 5, name: 'test-5'},
        {id: 6, name: 'test-6'},
        {id: 7, name: 'test-7'},
        {id: 8, name: 'test-8'},
        {id: 9, name: 'test-9'},
        {id: 10, name: 'test-10'},
        {id: 11, name: 'test-11'},
        {id: 12, name: 'test-12'},
    ]
    const page = req.query.page;
    const limit = req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = user.slice(startIndex, endIndex)
    return res.json({ data: result})
}

exports.allPosts = (req, res) => {
    const {page, size } = req.query;
    const limit = parseInt(size);
    const skip = (page - 1) * size;
    Post.countDocuments()
    .then(numOfDocument => {
        Post.find()
        .limit(limit)
        .skip(skip)
        .populate('postedBy', '_id name profilePic')
        .populate('likes', 'name')
        .populate('comments.commentedBy', 'name profilePic')
        .populate('comments.reply.replyedBy', 'name profilePic')
        .populate('comments.reply.reply.replyedBy', 'name profilePic')
        .then(posts => {
            return res.json({success: true, totalItems: numOfDocument, msg: 'All Post fetched successfully!!!', data: posts, });
        })
        .catch(console.log);
    })
    .catch(console.log);
};

exports.createPost = (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        photoURL: req.body.photoURL,
        postedBy: req.body.postedBy,
    })
    newPost.save().then(doc => {
            res.json({success: true, data: doc, msg: 'Post create successfully!!'})
    }).catch(console.log);
};

exports.like = (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.body.userId }
    }, {new: true})
    .select('likes')
    .populate('likes', 'name')
    .then(doc => {
        res.json({success: true, data: doc, msg: 'Like Post successfully!!'});
    })
    .catch(console.log);
};

exports.unlike = (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: {likes: req.body.userId}
    }, {new: true})
    .then(doc => {
        res.json({success: true, data: doc, msg: 'UnLike Post successfully!!'});
    })
    .catch(console.log);
};

exports.comment = (req, res) => {
    let comment = {
        text: req.body.text,
        commentedBy: req.body.commentedBy
    }
    Post.findByIdAndUpdate(req.body.postId, {$push: { comments: comment}}, { new: true })
    .populate('comments.commentedBy', 'name profilePic')
    .then(doc => {
        let newDoc = doc.comments[doc.comments.length - 1];
        return res.json({success: true, postId: req.body.postId,  data: newDoc, msg: 'Comment create successfully !!'});
    })
    .catch(console.log);
};

exports.commentReply = (req, res) => {
    console.log(req.body)
    // return
    let commentReply = {
        text: req.body.text,
        replyedBy: req.body.replyedBy,
        replyToUserName: req.body.replyToUserName
    }
    Post.findOneAndUpdate(
       {_id: req.body.postId, "comments._id": req.body.commentId},
       {$push: {"comments.$.reply": commentReply}},
       {new: true}
    ).populate('comments.reply.replyedBy', 'name')
    .then(doc => {    
        doc.comments.forEach(element => {
            if(element._id == req.body.commentId){
               let newDoc = element.reply[element.reply.length - 1];
                return res.json({success: true, postId: req.body.postId, data: newDoc, msg: 'Reply successfully!!'});
            }
        });
    })
    .catch(console.log);
};

// Not in use, Do not delete it
exports.reReply = (req, res) => {
    let reply = {
        text: req.body.text,
        replyedBy: req.body.replyedBy
    }
    Post.findOne({_id: req.body.postId})
    .then(doc => { 
        // console.log(doc)
        doc.comments.forEach(element => {
            element.reply.forEach(item => {
                if(item._id == req.body.replyId){
                    console.log(item._id)
                    item.reply.push({
                        text: req.body.text,
                        replyedBy: '6077c9b8bee5f329ac993557'
                    })
                    doc.save()
                    .then(document => {
                        return res.json({success: true, data: document})
                    })
                    .catch(console.log)
                }
            })
        });
        // doc.forEach((item, index) => {
        //     item.comments.forEach((element, index) => {
        //         element.reply.forEach((item, index) => {
        //             if(item._id == req.body.replyId){
        //                 item.reply.push({
        //                     text: 'xyz',
        //                     replyedBy: '12333'
        //                 })
        //                 doc.save()
        //                 .then((document => {
        //                     return res.json({data: document});
        //                 }))
        //                 .catch(console.log);
        //             }
        //         })
        //     })
        // })
        // doc.comments.forEach((item, index) => {
        //    if(item._id == req.body.replyId){
        //        console.log(item._id)
        //    }
        // })
    })
    .catch(console.log);
}