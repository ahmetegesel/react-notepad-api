import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { findUsersBy, upsertUser } from '../../api';

const signup = async (req, res) => {
  const { username, password, email } = req.body;

  let [user] = await findUsersBy({ username });

  if (user) {
    return res.status(400).send({ message: 'Failed! Username is already in use!' });
  }

  [user] = await findUsersBy({ email })

  if (user) {
    return res.status(400).send({ message: 'Failed! Email is already in use!' });
  }

  user = await upsertUser({
    username,
    password: bcrypt.hashSync(password, 8),
    email,
  });

  if (user) {
    return res.status(200).send({ message: 'User was successfully registered!'});
  }

  return res.status(500).send({ message: 'Invalid request!' });
};

const signin = async (req, res) => {
  const { username, password } = req.body;

  const [user] = await findUsersBy({ username });

  if (!user) {
    return res.status(404).send({ message: 'User not found!' });
  }

  const isValid = bcrypt.compareSync(password, user.password);

  if (!isValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!"
    });
  }

  const token = jwt.sign({ id: user._id.toString() }, process.env.API_AUTH_SECRET, {
    expiresIn: 86400,
  });

  return res.status(200).send({
    id: user._id.toString(),
    username,
    email: user.email,
    accessToken: token,
  });
};

export {
  signup,
  signin,
};
