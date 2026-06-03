from fastapi import APIRouter
from database.db import db
import bcrypt

from utils.jwt_handler import create_access_token

router = APIRouter()

users_collection = db["users"]


@router.post("/signup")
def signup(user: dict):

    email_exists = users_collection.find_one({
        "email": user["email"]
    })

    if email_exists:
        return {
            "message": "Email already exists"
        }

    hashed_password = bcrypt.hashpw(
        user["password"].encode("utf-8"),
        bcrypt.gensalt()
    )

    user["password"] = hashed_password

    users_collection.insert_one(user)

    return {
        "message": "User registered successfully"
    }


@router.post("/login")
def login(user: dict):

    existing_user = users_collection.find_one({
        "email": user["email"]
    })

    if not existing_user:
        return {
            "message": "User not found"
        }

    password_correct = bcrypt.checkpw(
        user["password"].encode("utf-8"),
        existing_user["password"]
    )

    if not password_correct:
        return {
            "message": "Incorrect password"
        }

    token = create_access_token({
        "email": existing_user["email"],
        "name": existing_user["name"]
    })

    return {
        "message": "Login successful",
        "token": token,
        "user": {
            "name": existing_user["name"],
            "email": existing_user["email"]
        }
    }