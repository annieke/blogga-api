import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const PostSchema = new Schema({
  title: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

const PostModel = mongoose.model('Post', PostSchema);


export default PostModel;