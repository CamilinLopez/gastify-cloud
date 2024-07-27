const { getTablaInventarioBodegaDB } = require("../controllers/inventarioControllers");

const getTablaInventarioBodegaHandler = async (req, res) => {
  try {
    const data = await getTablaInventarioBodegaDB();
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

module.exports = {
  getTablaInventarioBodegaHandler,
};
