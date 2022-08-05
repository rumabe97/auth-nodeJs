import {SignupInputDto} from "./src/firebase/adapter/in/dtos/SignupInputDto";
import {toDefinition} from "./src/shared/stringUtils/ToDefinition";

export const swagger = {
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "Twenti auth swagger",
        "description": "Swagger for twenti auth microservice",
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
        "http"
    ],
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    "paths": {
        "/signup": {
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
                            "$ref": "#definitions/signup"
                        }
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
        "signup": {
            "type": "object",
            "properties": toDefinition(new SignupInputDto())
        }
    }
}