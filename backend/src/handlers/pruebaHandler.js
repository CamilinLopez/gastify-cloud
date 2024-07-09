const pruebaHandler = (req, res) => {
  try {
    res.status(200).json({ message: "hola" });
  } catch (error) {}
};

module.exports = {
  pruebaHandler,
};
