const { invenDoc } = require("./inventory.docs");
const { loginDoc } = require("./user.auth.docs");
const { rootDoc } = require("./user.root.docs");

const swaggerDocumentation = {
  openapi: "3.0.0",
  info: {
    title: "BPBD App API",
    version: "1.0.0",
    description: "REST API for BPBD Magetan App"
  },
  servers: [{
    url: "http://localhost:5000/",
    description: "Local Dev"
  }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      }
    }
  },
  tags: [
    {
      name: "Auth",
      description: "To get token session"
    },
    {
      name: "Root",
      description: "Everything root can do"
    },
    {
      name: "Admin_Inventory",
      description: "Everything admin can do"
    }
  ],
  paths: {
    ...loginDoc,
    ...rootDoc,
    ...invenDoc
  }
}

module.exports = swaggerDocumentation;