const express = require('express');
const swaggerUI = require('swagger-ui-express');

const User = require('./models/user');
const Inventory = require('./models/inventory');
const swaggerDocumentation = require('./documentation/documentation');

const app = express();

const userRoute = require('./routes/user');
const inventoryRoute = require('./routes/inventory');

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
app.use('/api/v1/', userRoute);
app.use('/api/v1/', inventoryRoute);

app.listen(5000, async () => {
  console.log("App is running on port 5000");
  await User.sync({ alter: true });
  await Inventory.sync({ alter: true });
});