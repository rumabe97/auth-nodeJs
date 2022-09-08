import {SignupInputDto} from "./src/firebase/adapter/in/dtos/SignupInputDto";
import {toDefinition} from "./src/shared/stringUtils/ToDefinition";
import {SignupOutputDto} from "./src/firebase/adapter/out/dtos/SignupOutputDto";
import {LogInInputDto} from "./src/firebase/adapter/in/dtos/LogInInputDto";
import {LoginOutputDto} from "./src/firebase/adapter/out/dtos/LoginOutputDto";

export const swagger = {
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "Twenti auth swagger",
        "description": "Swagger for twenti auth microservices",
        "license": {
            "name": "MIT",
            "url": "https://opensource.org/licenses/MIT"
        }
    },
    "host": "localhost:8080",
    "basePath": "/api/v0/auth",
    "tags": [
        {
            "name": "Firebase",
            "description": "Firebase authentication endpoints"
        }
    ],
    "schemes": [
        "http",
        "https"
    ],
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    "paths": {
        "/signUp": {
            "post": {
                "tags": [
                    "Firebase"
                ],
                "summary": "Signup with firebase",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "description": "Signup body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "$ref": "#definitions/signupInputDTO"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "$ref": "#definitions/signupOutputDTO"
                        }
                    }
                }
            }
        },
        "/logIn": {
            "post": {
                "tags": [
                    "Firebase"
                ],
                "summary": "Login with firebase",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "description": "Signup body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "$ref": "#definitions/loginInputDTO"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "$ref": "#definitions/loginOutputDTO"
                        }
                    }
                }
            }
        },
        "/getUser/{uid}": {
            "get": {
                "tags": [
                    "Firebase"
                ],
                "summary": "Get user by uid",
                "produces": [
                    "application/json"
                ],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "parameters": [
                    {
                        "name": "uid",
                        "in": "path",
                        "description": "User uid",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "$ref": "#definitions/signupOutputDTO"
                        }
                    }
                }
            }
        },
        "/getUser/byEmail/{email}": {
            "get": {
                "tags": [
                    "Firebase"
                ],
                "summary": "Get user by email",
                "produces": [
                    "application/json"
                ],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "parameters": [
                    {
                        "name": "email",
                        "in": "path",
                        "description": "User email",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "$ref": "#definitions/signupOutputDTO"
                        }
                    }
                }
            }
        },
        "/getUser/byPhoneNumber/{phoneNumber}": {
            "get": {
                "tags": [
                    "Firebase"
                ],
                "summary": "Get user by phone number",
                "produces": [
                    "application/json"
                ],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "parameters": [
                    {
                        "name": "phoneNumber",
                        "in": "path",
                        "description": "User phone number",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "$ref": "#definitions/signupOutputDTO"
                        }
                    }
                }
            }
        },
        "/updateUser/{uid}": {
            "put": {
                "tags": [
                    "Firebase"
                ],
                "summary": "Update user",
                "produces": [
                    "application/json"
                ],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "parameters": [
                    {
                        "name": "uid",
                        "in": "path",
                        "description": "User uid",
                        "required": true,
                        "type": "string"
                    },
                    {
                        "name": "body",
                        "in": "body",
                        "description": "Update user body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "$ref": "#definitions/signupInputDTO"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "$ref": "#definitions/signupOutputDTO"
                        }
                    }
                }
            }
        },
        "/deleteUser/{uid}": {
            "delete": {
                "tags": [
                    "Firebase"
                ],
                "summary": "Delete user",
                "produces": [
                    "application/json"
                ],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "parameters": [
                    {
                        "name": "uid",
                        "in": "path",
                        "description": "User uid",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok"
                    }
                }
            }
        }
    },
    "definitions": {
        "signupInputDTO": {
            "type": "object",
            "properties": toDefinition(new SignupInputDto())
        },
        "signupOutputDTO": {
            "type": "object",
            "properties": toDefinition(new SignupOutputDto())
        },
        "loginInputDTO": {
            "type": "object",
            "properties": toDefinition(new LogInInputDto())
        },
        "loginOutputDTO": {
            "type": "object",
            "properties": toDefinition(new LoginOutputDto())
        }
    },
    "components": {
        "securitySchemes": {
            "bearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            }
        }
    },
    "securityDefinitions": {
        "bearerAuth": {
            "type": 'apiKey',
            "name": 'Authorization',
            "scheme": 'bearer',
            "in": 'header',
        },
    }
}