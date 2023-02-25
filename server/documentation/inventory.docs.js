const getInventoriesByYear = {
  tags: ["Admin"],
  summary: "Get inventories",
  security: [{ bearerAuth: [] }],
  description: "This API is used to get inventories stored at warehouse by year",
  parameters: [
    {
      in: "path",
      name: "year",
      description: "Year of inventories data",
      example: 2022,
      type: "int"
    }
  ],
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          type: "object",
          example: {
            "id": 1,
            "idAdmin": 2,
            "name": "Pelampung",
            "merk": null,
            "quantity": 5,
            "unit": "buah",
            "condition": "baik",
            "note": null,
            "source": "APBD",
            "year": 2022,
            "createdAt": null,
            "updatedAt": null
          }
        }
      }
    },
    400: {
      description: "bad request"
    }
  }
}

exports.invenDoc = {
  "/api/v1/inventory/{year}": {
    get: getInventoriesByYear
  }
}