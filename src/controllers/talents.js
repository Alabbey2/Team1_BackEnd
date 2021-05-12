const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const Talent = require('../modals/talent');
const Company = require('../modals/company');
const { SECRET } = require('../utils/config');

const registerTalent = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (password.length < 4) {
      throw new Error('Password should be at least 4 characters long');
    }

    const validateEmail = (mailaddr) => {
      var re = /\S+@\S+\.\S+/;
      return re.test(mailaddr);
    };

    if (!validateEmail(email)) {
      throw new Error('Wrong email format');
    }

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
        type: [],
        techs: [],
        photo: '',
        likes: [],
        superLikes: [],
        matches: [],
      };
      const savedUser = await new Talent(newUser).save();
      res.json(savedUser);
    }
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

const getTalents = async (req, res) => {
  try {
    const users = await Talent.find({});
    if (users) {
      res.send(users);
    } else {
      throw new Error('Talents not found');
    }
  } catch (error) {
    res.status(401).json({ Error: error.message });
  }
};

const getOneTalent = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Talent.findOne({ _id: userId });
    if (user) {
      res.send(user);
    } else {
      throw new Error('Talent not found!');
    }
  } catch (error) {
    res.status(400).json({ Error: error.message });
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
        type: type.length > 0 ? type : user.type,
        techs: techs.length > 0 ? techs : user.techs,
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
    res.status(400).json({ Error: error.message });
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
    res.status(400).json({ Error: error.message });
  }
};

const like = async (req, res) => {
  try {
    const { userId, jobId } = req.body;
    const talent = await Talent.findOne({ _id: userId });
    if (talent) {
      await Talent.findOneAndUpdate(
        { _id: userId },
        { $push: { likes: jobId } },
        { upsert: true }
      )
        .then((result) => {
          console.log(result);
          res.json({ Message: 'Like recorded to the user' });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

const superlike = async (req, res) => {
  try {
    const { userId, jobId } = req.body;
    const talent = await Talent.findOne({ _id: userId });
    if (talent) {
      await Talent.findOneAndUpdate(
        { _id: userId },
        { $push: { superLikes: jobId } },
        { upsert: true }
      )
        .then((result) => {
          console.log(result);
          res.json({ Message: 'Superlike recorded to the user' });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

module.exports = {
  registerTalent,
  getTalents,
  getOneTalent,
  updateTalent,
  deleteTalent,
  like,
  superlike,
};
