const {Schema,model} = require('mongoose');

const commentSchema = new Schema(
    {
        blogId: {
            type: Schema.Types.ObjectId,
            ref: 'blog',
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Comment = model('Comment', commentSchema);

module.exports=Comment