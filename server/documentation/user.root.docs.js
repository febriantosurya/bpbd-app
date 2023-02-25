const showAdmins = {
  tags: ["Root"],
  security: [{ bearerAuth: [] }],
  summary: "Get all admins",
  description: "This api is used to get all admins",
  responses: {
    200: {
      description: "get all admins data",
      content: {
        "application/json": {
          type: "object",
          example: {
            "message": "success",
            "data": [
              {
                "id": 3,
                "username": "admin1",
                "password": "admin1",
                "name": "Budi Purnomo",
                "level": 1,
                "createdAt": null,
                "updatedAt": null
              }
            ]
          }
        }
      }
    },
    400: {
      description: "bad request"
    },
    401: {
      description: "action is unauthorized, need to authorize using token"
    } 
  }
}

const addAdmin = {
  tags: ["Root"],
  security: [{ bearerAuth: [] }],
  summary: "Add user as admin (level1)",
  description: "This api is used to add admin, only root can add Admin",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            username: {
              type: "string",
              description: "username admin to add",
              example: "admin1"
            },
            password: {
              type: "string",
              description: "password admin to add",
              example: "admin1"
            },
            name: {
              type: "string",
              description: "admin name to add",
              example: "Budi"
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: "admin successfuly added",
      content: {
        "application/json": {
          type: "object",
          example: {
            message: "new user added"
          }
        }
      }
    },
    400: {
      description: "bad request"
    },
    401: {
      description: "action is unauthorized, need to authorize using token"
    }
  }
}

const updateAdmin = {
  tags: ["Root"],
  security: [{ bearerAuth: [] }],
  summary: "Update admin data",
  description: "This api is used to update admin data, only root can update admin data",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            id: {
              type: "int",
              description: "id of selected admin to update",
              example: "3"
            },
            username: {
              type: "string",
              description: "username admin to update",
              example: "admin1"
            },
            password: {
              type: "string",
              description: "password admin to update",
              example: "admin1"
            },
            name: {
              type: "string",
              description: "admin name to update",
              example: "Budi Purnomo"
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: "user updated",
      content: {
        "application/json": {
          type: "object",
          example: {
            message: "user updated"
          }
        }
      }
    },
    400: {
      description: "bad request"
    },
    401: {
      description: "action is unauthorized, need to authorize using token"
    }
  }
}

const deleteAdmin = {
  tags: ["Root"],
  security: [{ bearerAuth: [] }],
  summary: "Delete admin (user level1)",
  description: "This api is used to delete admin, only root can delete admin",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            username: {
              type: "string",
              description: "username admin to update",
              example: "admin1"
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: "user level 1 (admin) succesfully deleted from database",
      content: {
        "application/json": {
          type: "object",
          example: {
            message: "delete success"
          }
        }
      }
    },
    400: {
      description: "bad request"
    },
    401: {
      description: "action is unauthorized, need to authorize using token"
    }
  }
}

exports.rootDoc = {
  "/api/v1/root-add-admin": {
    post: addAdmin
  },
  "/api/v1/root-update-admin": {
    put: updateAdmin
  },
  "/api/v1/root-remove-admin": {
    delete: deleteAdmin
  },
  "/api/v1/root-mainpage": {
    get: showAdmins
  }
}