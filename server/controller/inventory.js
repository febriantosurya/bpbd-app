const inventoryRepo = require('../repositories/inventory');

exports.getInventoryByYear = async (req, res) => {
  try {
    const year = { year: req.params.year }
    inventories = await inventoryRepo.getInventories(year);
    return res.status(200).json({ message: "success", data: inventories })
  } catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}

exports.addInventory = async (req, res) => {
  try {
    const data = {
      idAdmin: req.user.id,
      name: req.body.name,
      brand: req.body.brand,
      quantity: req.body.quantity,
      unit: req.body.unit,
      condition: req.body.condition,
      note: req.body.note,
      source: req.body.source,
      year: req.body.year,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    await inventoryRepo.addInventories(data);
    return res.status(200).json({ message: "data added" })
  }
  catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}