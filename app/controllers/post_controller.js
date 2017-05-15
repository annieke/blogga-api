import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.author = req.user;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.cover_url = req.body.cover_url;
  post.save()
  .then((result) => {
    res.json({ message: 'Post created!' });
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const getPosts = (req, res) => {
  Post.find({})
  .populate('author', ['username'])
  .then((posts) => {
    res.json(posts);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const getPost = (req, res) => {
  Post.findOne({ _id: req.params.id })
  .populate('author', ['username'])
  .then((post) => {
    res.json(post);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const deletePost = (req, res) => {
  Post.findOneAndRemove({ _id: req.params.id })
  .then((result) => {
    res.json({ message: 'Post deleted!' });
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};

export const updatePost = (req, res) => {
  Post.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
  .then((post) => {
    res.json(post);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
