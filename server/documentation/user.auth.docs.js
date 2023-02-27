const login = {
  tags: ["Auth"],
  summary: "Login user",
  description: "This api is used to login user, user can be root (level 0), admin (level 1), or member (level 2)",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            username: {
              type: "string",
              description: "username of the user",
              example: "user"
            },
            password: {
              type: "string",
              description: "password of the user",
              example: "pasword"
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: "user login success",
      content: {
        "application/json": {
          type: "object",
          example: {
            message: "success",
            token: "token"
          }
        }
      }
    },
    400: {
      description: "bad request"
    }
  }
}

exports.loginDoc = {
  "/api/v1/auth/login": {
    post: login
  }
}