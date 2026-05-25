from fastapi import APIRouter
from database.db import db
import bcrypt

router = APIRouter()

users_collection = db["users"]

@router.post("/signup")
def signup(user: dict):

    email_exists = users_collection.find_one({
        "email": user["email"]
    })

    if email_exists:
        return {"message": "Email already exists"}

    hashed_password = bcrypt.hashpw(
        user["password"].encode("utf-8"),
        bcrypt.gensalt()
    )

    user["password"] = hashed_password

    users_collection.insert_one(user)

    return {"message": "User registered successfully"}

@router.post("/login")
def login(user: dict):

    existing_user = users_collection.find_one({
        "email": user["email"]
    })

    if not existing_user:
        return {"message": "User not found"}

    password_correct = bcrypt.checkpw(
        user["password"].encode("utf-8"),
        existing_user["password"]
    )

    if not password_correct:
        return {"message": "Incorrect password"}

    return {
        "message": "Login successful",
        "user": {
            "name": existing_user["name"],
            "email": existing_user["email"]
        }
    }