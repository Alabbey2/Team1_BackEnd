const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const Talent = require('../modals/talent');
const Company = require('../modals/company');
const { SECRET } = require('../utils/config');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userTalent = await Talent.findOne({ email: email });
    const userCompany = await Company.findOne({ email: email });

    if (userCompany) {
      const correctPassword = !userCompany
        ? null
        : await bcrypt.compare(password, userCompany.password);
      if (!(userCompany && correctPassword)) {
        throw new Error('Email and password not matched!');
      }

      const userInfo = {
        email,
        name: userCompany.name,
        userId: userCompany.id,
      };
      const token = await JWT.sign(userInfo, SECRET);
      res.status(200).send({ token, userInfo });
    } else if (userTalent) {
      const correctPassword = !userTalent
        ? null
        : await bcrypt.compare(password, userTalent.password);
      if (!(userTalent && correctPassword)) {
        throw new Error('Email and password not matched!');
      }

      const userInfo = {
        email,
        firstName: userTalent.firstName,
        lastName: userTalent.lastName,
        photo: userTalent.photo,
        userId: userTalent.id,
      };
      const token = await JWT.sign(userInfo, SECRET);
      res.status(200).send({ token, userInfo });
    } else {
      throw new Error('No user found with given Email');
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = loginUser;
