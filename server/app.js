const express = require('express');
const cors = require('cors')
const swaggerUI = require('swagger-ui-express');

const swaggerDocumentation = require('./documentation/documentation');

const app = express();

const userRoute = require('./routes/user');
const barangMasukRoute = require('./routes/barangMasuk');
const barangKeluarRoute = require('./routes/barangKeluar');
const barangStockRoute = require('./routes/barangStock');
const regBencanaRoute = require('./routes/registerBencana');

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
app.use('/api/v1/', userRoute);
app.use('/api/v1/inventory', barangMasukRoute);
app.use('/api/v1/inventory', barangKeluarRoute);
app.use('/api/v1/inventory', barangStockRoute);
app.use('/api/v1/regbencana', regBencanaRoute)

const User = require('./models/user');

const InvBarang = require('./models/invBarang');
const InvGudangAktif = require('./models/invGudangAktif');
const InvGudangLama = require('./models/invGudangLama');
const InvTransaksiGudang = require('./models/invTransaksiGudang');
const RegBencana = require('./models/registerBencana');

app.listen(5000, async () => {
  console.log("App is running on port 5000");
  await User.sync({ alter: true });
  await InvBarang.sync({ alter: true });
  await InvGudangAktif.sync({ alter: true });
  await InvGudangLama.sync({ alter: true });
  await InvTransaksiGudang.sync({ alter: true });
  await RegBencana.sync({ alter: true })
});