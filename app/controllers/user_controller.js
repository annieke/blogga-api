import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(422).send('An error occurred checking this email');
    }
    if (user) {
      return res.status(406).send('This email already exists');
    }
  });

  const user = new User();
  user.email = email;
  user.password = password;
  user.save()
  .then((result) => {
    res.send({ token: tokenForUser(user) });
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
