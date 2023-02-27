const Inventory = require('../models/inventory');

exports.getInventories = async (year) => {
  const inventories = await Inventory.findAll({ where: year });
  if (inventories) {
    return inventories;
  }
  else {
    return null;
  };
};

exports.addInventory = async (data) => {
  await Inventory.create(data);
};

exports.updateInventory = async (id, data) => {
  inventory = await Inventory.findOne({ where: id });
  if (!inventory) {
    return null
  }
  inventory.name = data.name;
  inventory.brand = data.brand;
  inventory.quantity = data.quantity;
  inventory.unit = data.unit;
  inventory.condition = data.condition;
  inventory.note = data.note;
  inventory.source = data.source;
  inventory.year = data.year;
  inventory.updatedAt = new Date();
  inventory.save();
};

exports.deleteInventory = async (id) => {
  await Inventory.destroy({ where: id });
}