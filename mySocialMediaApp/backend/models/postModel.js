const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    // body: {
    //     type: Boolean,
    //     default: false
    // },
    // photo: {
    //     data: Buffer,
    //     contentType: String 
    // },
    photoURL: {
        type: String,
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    likes: [{ type: ObjectId, ref: 'User' }],
    comments: [
        {
            text: String,
            commentedBy: {
                type: ObjectId,
                ref: 'User'
            },
            created: {
                type: Date,
                default: Date.now
            },
            reply: [{
                text: String,
                replyedBy: {
                    type: ObjectId,
                    ref: 'User'
                },
                created: {
                    type: Date,
                    default: Date.now
                },
                replyToUserName: {
                    type: String,
                    default: ''
                }
                // reply: [{
                //     text: String,
                //     replyedBy: {
                //         type: ObjectId,
                //         ref: 'User'
                //     },
                //     created: {
                //         type: Date,
                //         default: Date.now
                //     },
                // }]
            }]
        }
    ],
    // commentsReply: [
    //     {
    //         text: String,
    //         replyedBy: {
    //             type: ObjectId,
    //             ref: 'User'
    //         },
    //         replyTo:{ type: String },
    //         created: {
    //             type: Date,
    //             default: Date.now
    //         }
    //     }
    // ]
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;