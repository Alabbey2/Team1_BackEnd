const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const Company = require('../modals/company');
const { SECRET } = require('../utils/config');

const registerCompany = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const saltRounds = 10;

    const existingUser = await Company.findOne({ email: email });

    if (existingUser) {
      throw new Error('User with the given email already exist');
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = {
        name,
        email,
        password: hashedPassword,
        location: '',
        website: '',
        about: '',
        logo: '',
        likes: [],
        superLikes: [],
      };
      const savedUser = await new Company(newUser).save();
      res.json(savedUser);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCompanies = async (req, res) => {
  try {
    const users = await Company.find({});
    res.send(users);
  } catch (error) {
    res.json({ Error: error.message });
  }
};

const getOneCompany = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Company.findOne({ _id: userId });
    res.send(user);
  } catch (error) {
    res.json({ Error: error.message });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Company.findOne({ _id: userId });
    if (user) {
      const { name, location, website, about, logo } = req.body;
      const updates = {
        name: name ? name : user.name,
        location: location ? location : user.location,
        website: website ? website : user.website,
        about: about ? about : user.about,
        logo: logo ? logo : user.logo,
      };

      await Company.findByIdAndUpdate(userId, updates, { new: true })
        .then((result) => {
          res
            .status(200)
            .json({ Message: `User details successfully updated`, result });
        })
        .catch((error) => {
          throw new Error('User details not updated');
        });
    } else {
      throw new Error('No user found with the given ID');
    }
  } catch (error) {}
};

const deleteCompany = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Company.findOne({ _id: userId });

    if (user) {
      await Company.findByIdAndDelete(userId);
      res.json({ Message: `User- ${userId} successfully deleted!` });
    } else {
      throw new Error('User with given id not found!');
    }
  } catch (error) {
    res.json({ Error: error.message });
  }
};

module.exports = {
  registerCompany,
  getCompanies,
  getOneCompany,
  updateCompany,
  deleteCompany,
};
