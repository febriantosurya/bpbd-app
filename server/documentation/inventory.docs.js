const getInventoriesByYear = {
  tags: ["Admin_Inventory"],
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

const addInventory = {
  tags: ["Admin_Inventory"],
  security: [{ bearerAuth: [] }],
  summary: "Add inventory using admin",
  description: "This API is used to add inventory to warehouse by year",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              nullable: false,
              description: "name of inventory to add",
              example: "perahu"
            },
            brand: {
              type: "string",
              nullable: true,
              description: "brand of inventory to add",
              example: "dolphin"
            },
            quantity: {
              type: "int",
              nullable: false,
              description: "quantity of inventory to add",
              example: 3
            },
            unit: {
              type: "string",
              nullable: true,
              description: "unit kind of inventory",
              example: "pasang"
            },
            condition: {
              type: "string",
              nullable: true,
              description: "condition of inventory to add",
              example: "baik"
            },
            note: {
              type: "string",
              nullable: true,
              description: "note for inventory",
              example: "perahu sedang berada di sarangan"
            },
            source: {
              type: "string",
              nullable: true,
              description: "source of inventory",
              example: "apbd"
            },
            year: {
              type: "int",
              nullable: false,
              description: "year of inventory to add",
              example: 2022
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              message: "data added"
            }
          }
        }
      }
    },
    400: {
      description: "bad request"
    }
  }
}

const updateInventory = {
  tags: ["Admin_Inventory"],
  security: [{ bearerAuth: [] }],
  summary: "Update inventory",
  description: "This API is used to update inventory by using ID",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            id: {
              type: "int",
              nullable: false,
              description: "id of inventory to update",
              example: 1
            },
            name: {
              type: "string",
              nullable: false,
              description: "name of inventory to update",
              example: "perahu"
            },
            brand: {
              type: "string",
              nullable: true,
              description: "brand of inventory to update",
              example: "dolphin"
            },
            quantity: {
              type: "int",
              nullable: false,
              description: "quantity of inventory to update",
              example: 2
            },
            unit: {
              type: "string",
              nullable: true,
              description: "unit kind of inventory to update",
              example: "pasang"
            },
            condition: {
              type: "string",
              nullable: true,
              description: "condition of inventory to update",
              example: "baik"
            },
            note: {
              type: "string",
              nullable: true,
              description: "update note for inventory",
              example: "perahu sedang berada di sarangan"
            },
            source: {
              type: "string",
              nullable: true,
              description: "update source of inventory",
              example: "apbd"
            },
            year: {
              type: "int",
              nullable: false,
              description: "year of inventory to update",
              example: 2022
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              "id": 1,
              "idAdmin": 2,
              "name": "perahu",
              "brand": "dolphin",
              "quantity": 3,
              "unit": "pasang",
              "condition": "baik",
              "note": "perahu sedang berada di sarangan",
              "source": "apbd",
              "year": 2022,
              "createdAt": "2023-02-25T08:44:07.171Z",
              "updatedAt": "2023-02-25T08:44:07.172Z"
            }
          }
        }
      }
    },
    400: {
      description: "bad request"
    },
    401: {
      description: "not found"
    }
  }
}

const deleteInventory = {
  tags: ["Admin_Inventory"],
  summary: "Delete inventory",
  security: [{ bearerAuth: [] }],
  description: "This API is used to delete an inventory",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            id: {
              type: "int",
              nullable: false,
              description: "ID of inventory to delete",
              example: 2
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              message: "inventory successfully deleted"
            }
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
  },
  "/api/v1/inventory/add": {
    post: addInventory
  },
  "/api/v1/inventory/update": {
    put: updateInventory
  },
  "/api/v1/inventory/delete": {
    delete: deleteInventory
  }
}