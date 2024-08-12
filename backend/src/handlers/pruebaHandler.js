const pruebaHandler = (req, res) => {
  try {
    res.status(200).json({ message: 'hola' });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

module.exports = {
  pruebaHandler,
};
