const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const Talent = require('../modals/talent');
const Company = require('../modals/company');
const { SECRET } = require('../utils/config');

const registerTalent = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const saltRounds = 10;

    const existingUser = await Talent.findOne({ email: email });

    if (existingUser) {
      throw new Error('User with the given email already exist');
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone: '',
        location: '',
        title: '',
        github: '',
        linkedin: '',
        about: '',
        level: '',
        type: '',
        techs: [],
        photo: '',
        likes: [],
        superLikes: [],
      };
      const savedUser = await new Talent(newUser).save();
      res.json(savedUser);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Login

const getTalents = async (req, res) => {
  try {
    const users = await Talent.find({});
    res.send(users);
  } catch (error) {
    res.json({ Error: error.message });
  }
};

const getOneTalent = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Talent.findOne({ _id: userId });
    res.send(user);
  } catch (error) {
    res.json({ Error: error.message });
  }
};

const updateTalent = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await Talent.findOne({ _id: userId });
    if (user) {
      const {
        firstName,
        lastName,
        email,
        phone,
        location,
        title,
        github,
        linkedin,
        about,
        level,
        type,
        techs,
        photo,
      } = req.body;
      const updates = {
        firstName: firstName ? firstName : user.firstName,
        lastName: lastName ? lastName : user.lastName,
        email: email ? email : user.email,
        phone: phone ? phone : user.phone,
        location: location ? location : user.location,
        title: title ? title : user.title,
        github: github ? github : user.github,
        linkedin: linkedin ? linkedin : user.linkedin,
        about: about ? about : user.about,
        level: level ? level : user.level,
        type: type ? type : user.type,
        techs: techs ? techs : user.techs,
        photo: photo ? photo : user.photo,
      };

      await Talent.findByIdAndUpdate(userId, updates, { new: true })
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
  } catch (error) {
    res.json({ Error: error.message });
  }
};

const deleteTalent = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Talent.findOne({ _id: userId });

    if (user) {
      await Talent.findByIdAndDelete(userId);
      res.json({ Message: `User- ${userId} successfully deleted!` });
    } else {
      throw new Error('User with given id not found!');
    }
  } catch (error) {
    res.json({ Error: error.message });
  }
};

module.exports = {
  registerTalent,
  getTalents,
  getOneTalent,
  updateTalent,
  deleteTalent,
};
