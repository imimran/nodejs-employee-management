const express = require('express');
const User = require('../../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { jwtKey } = require('../../utils/key');
const bcrypt = require('bcrypt');
const { validation, success } = require('../../utils/helper');

router.get('/', (req, res) => {
  res.send('Hello Empolyee');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(501).json(validation('please add email or password'));
  }

  let user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(501).json(validation('User Not registered.'));

  // bcrypt.compare(req.body.password, user.password);
  // if (req.body.password !== user.password)
  //   return res.status(400).json(validation("Invalid email or password "));

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(501).json(validation('Invalid email or password '));

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      isEmployee: user.isEmployee,
      isOrganizer: user.isOrganizer,
    },
    jwtKey
  );
  res
    .status(200)
    .json(
      success(
        'Your Token! ',
        { data: token, id: user.id, email: user.email },
        res.statusCode
      )
    );
});

module.exports = router;
