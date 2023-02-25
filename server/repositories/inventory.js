const Inventory = require('../models/inventory');

exports.getInventories = async (year) => {
  const inventories = await Inventory.findAll({ where: year })
  if (inventories) {
    return inventories
  }
  else {
    return null
  }
}

exports.addInventories = async (data) => {
  await Inventory.create(data)
}