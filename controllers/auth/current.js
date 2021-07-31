const current = (req, res, next) => {
  try {
    const { email, subscription, avatarURL } = req.user;
    res.json({
      email,
      subscription,
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = current;
