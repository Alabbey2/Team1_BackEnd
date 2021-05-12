const Match = require('../modals/match');
const Talent = require('../modals/talent');
const Company = require('../modals/company.js');

const getAllMatches = async (req, res) => {
  try {
    const { id, type } = req.params;
    const matches =
      type === 'talent'
        ? await Match.find({ talent: id })
            .populate('talent')
            .populate('company')
        : await Match.find({ company: id })
            .populate('talent')
            .populate('company');

    if (matches) {
      res.send(matches);
    } else {
      throw new Error('Matches not found');
    }
  } catch (error) {
    res.status(401).json({ Error: error.message });
  }
};

const createMatch = async (req, res) => {
  try {
    const { companyId, talentId, type } = req.body;
    const newMatch = { type, talent: talentId, company: companyId };

    const savedMatch = await new Match(newMatch).save();

    if (savedMatch) {
      const talent = await Talent.findOne({ _id: talentId });
      if (talent) {
        await Talent.findOneAndUpdate(
          { _id: talentId },
          { $push: { matches: savedMatch.id } },
          { upsert: true }
        )
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      const company = await Company.findOne({ _id: companyId });
      if (company) {
        await Company.findOneAndUpdate(
          { _id: companyId },
          { $push: { matches: savedMatch.id } },
          { upsert: true }
        )
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      res.send(savedMatch);
    } else {
      throw new Error('Failed to create a match');
    }
  } catch (error) {
    res.status(401).json({ Error: error.message });
  }
};

module.exports = { getAllMatches, createMatch };
