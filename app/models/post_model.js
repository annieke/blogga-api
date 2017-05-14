import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  tags: String,
  content: String,
  cover_url: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

const PostModel = mongoose.model('Post', PostSchema);


export default PostModel;
