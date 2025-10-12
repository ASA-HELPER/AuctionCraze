export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      sameSite: "None", // Important for cross-site cookies
      secure: true, // Must be true for SameSite=None when using in production
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
