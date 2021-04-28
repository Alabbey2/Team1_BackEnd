const CODES = {
  PROGRAM_ERROR: 0,
  INSERT_OK: 1,
  UPDATE_OK: 2,
  DELETE_OK: 3,
  SIGN_UP: 4,
  SIGN_OUT: 5,
  NOT_FOUND: 6,
  NOT_UPDATED: 7,
  NOT_DELETED: 8,
  ACCESS_DENIED: 9,
  MATCH_FOUND: 10,
  MATCH_ACCEPTED: 11,
  MATCH_REJECTED: 12,
  MATCH_REMOVED: 13,
  MATCH_FAILED: 14,
  SIGNUP_FAILED: 15,
};

const MESSAGES = {
  PROGRAM_ERROR: () => ({
    message: "Sorry! Error in the program.",
    code: CODES.PROGRAM_ERROR,
    type: "error",
  }),
  INSERT_OK: (id) => ({
    message: `New Job ${id} was successuflly added`,
    code: CODES.INSERT_OK,
    type: "info",
  }),
  UPDATE_OK: (id) => ({
    message: `Job ${id} was successuflly updated`,
    code: CODES.UPDATE_OK,
    type: "info",
  }),
  DELETE_OK: (id) => ({
    message: `Job ${id} was successuflly Removed`,
    code: CODES.DELETE_OK,
    type: "info",
  }),
  SIGN_UP: () => ({
    message: `SIGN UP successful`,
    code: CODES.SIGN_UP,
    type: "info",
  }),
  SIGN_OUT: () => ({
    message: `You have successuflly signed out`,
    code: CODES.SIGN_OUT,
    type: "info",
  }),
  NOT_FOUND: (id) => ({
    message: `Job ${id} was not found`,
    code: CODES.NOT_FOUND,
    type: "error",
  }),
  NOT_UPDATED: (id) => ({
    message: `Job ${id} update Failed!!!`,
    code: CODES.NOT_UPDATED,
    type: "error",
  }),
  NOT_DELETED: (id) => ({
    message: `Deleting Job ${id}, Failed!!!`,
    code: CODES.NOT_DELETED,
    type: "error",
  }),
  ACCESS_DENIED: (userName) => ({
    message: `${userName}, Access Dednied!!!`,
    code: CODES.ACCESS_DENIED,
    type: "error",
  }),
  MATCH_FOUND: (number) => ({
    message: `New Match Found ${number}!!!`,
    code: CODES.MATCH_FOUND,
    type: "info",
  }),
  MATCH_ACCEPTED: () => ({
    message: `Your Match Request Acceped!!!`,
    code: CODES.MATCH_ACCEPTED,
    type: "info",
  }),
  MATCH_REJECTED: () => ({
    message: `Not a right Match!!`,
    code: CODES.MATCH_REJECTED,
    type: "info",
  }),
  MATCH_REMOVED: () => ({
    message: `You Have been removed from Match list`,
    code: CODES.MATCH_REMOVED,
    type: "info",
  }),
  MATCH_FAILED: (id) => ({
    message: `Match ${id} Failed`,
    code: CODES.MATCH_FAILED,
    type: "error",
  }),
  SIGNUP_FAILED: () => ({
    message: `Your SignUp attempt failed!!!`,
    code: CODES.SIGNUP_FAILED,
    type: "error",
  }),
};

module.exports = { CODES, MESSAGES };
