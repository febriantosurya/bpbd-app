const inventoryRepo = require('../repositories/inventory');

exports.getInventoryByYear = async (req, res) => {
  try {
    const year = { year: req.body.year }
    inventories = await inventoryRepo.getInventories(year);
    return res.status(400).json({ message: "success", data: inventories })
  } catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}