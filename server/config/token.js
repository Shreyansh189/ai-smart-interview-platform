import jwt from "jsonwebtoken";

console.log("JWTSECRET =", process.env.JWTSECRET);

const genToken = async (userId) => {
  try {
    const token = jwt.sign(
      { userId },
      process.env.JWTSECRET,
      { expiresIn: "7d" }
    );

    return token;
  } catch (error) {
    console.log(error);
  }
};

export default genToken;