const express = require('express');
const cors = require('cors')

const app = express();

const userRoute = require('./routes/user');
const barangMasukRoute = require('./routes/barangMasuk');
const barangKeluarRoute = require('./routes/barangKeluar');
const barangStockRoute = require('./routes/barangStock');
const barangMasukRouteStatic = require('./routes/barangMasukStatic');
const barangKeluarRouteStatic = require('./routes/barangKeluarStatic');
const barangStockRouteStatic = require('./routes/barangStockStatic');
const regBencanaRoute = require('./routes/registerBencana');
const regBencanaNewRoute = require('./routes/registerBencanaNew');
const readOnlyRoute = require('./routes/readOnly');
const dashboardRoute = require('./routes/dashboard');
const arsipAktifRoute = require('./routes/arsipAktif');
const arsipInaktifRoute = require('./routes/arsipInaktif');
const locationData = require('./routes/dataDesKec');

app.use(express.json());
app.use(cors());
app.use('/api/v1/', userRoute);
app.use('/api/v1/inventory', barangMasukRoute);
app.use('/api/v1/inventory', barangKeluarRoute);
app.use('/api/v1/inventory', barangStockRoute);
app.use('/api/v1/inv-static', barangMasukRouteStatic);
app.use('/api/v1/inv-static', barangKeluarRouteStatic);
app.use('/api/v1/inv-static', barangStockRouteStatic);
app.use('/api/v1/regbencana', regBencanaRoute);
app.use('/api/v1/reg-bencana-main', regBencanaNewRoute);
app.use('/api/v1/read-only', readOnlyRoute);
app.use('/api/v1/dashboard', dashboardRoute);
app.use('/api/v1/archive-active', arsipAktifRoute);
app.use('/api/v1/archive-inactive', arsipInaktifRoute);
app.use('/api/v1/location', locationData);

const User = require('./models/user');

const InvBarang = require('./models/invBarang');
const InvGudangAktif = require('./models/invGudangAktif');
const InvGudangLama = require('./models/invGudangLama');
const InvTransaksiGudang = require('./models/invTransaksiGudang');

const InvBarangStatic = require('./models/invBarangStatic');
const InvGudangAktifStatic = require('./models/invGudangAktifStatic');
const InvGudangLamaStatic = require('./models/invGudangLamaStatic');
const InvTransaksiGudangStatic = require('./models/invTransaksiGudangStatic');

const RegBencana = require('./models/registerBencana');
const RegBencanaNew = require('./models/registerBencanaNew');
const ArsipAktif = require('./models/arsipAktif');
const ArsipInaktif = require('./models/arsipInaktif');
const Desa = require('./models/dataDesa');
const Kecamatan = require('./models/dataKecamatan');

app.listen(5000, async () => {
  console.log("App is running on port 5000");
  await User.sync({ alter: true });
  await InvBarang.sync({ alter: true });
  await InvGudangAktif.sync({ alter: true });
  await InvGudangLama.sync({ alter: true });
  await InvTransaksiGudang.sync({ alter: true });
  await InvBarangStatic.sync({ alter: true });
  await InvGudangAktifStatic.sync({ alter: true });
  await InvGudangLamaStatic.sync({ alter: true });
  await InvTransaksiGudangStatic.sync({ alter: true });
  await RegBencana.sync({ alter: true });
  await RegBencanaNew.sync({ alter: true })
  await ArsipAktif.sync({ alter: true });
  await ArsipInaktif.sync({ alter: true }); 
  await Desa.sync({ alter: true });
  await Kecamatan.sync({ alter: true });
});