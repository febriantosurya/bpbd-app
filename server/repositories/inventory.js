const Inventory = require('../models/inventory');

const getInventories = async (year) => {
  const inventories = await Inventory.findAll({ where: year })
  if (inventories) {
    return inventories
  }
  else {
    return null
  }
}