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
      name: "Root",
      description: "Everything root can do"
    }
  ],
  paths: {
    ...rootDoc
  }
}

module.exports = swaggerDocumentation;