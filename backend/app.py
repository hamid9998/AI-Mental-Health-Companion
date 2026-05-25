from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.db import db

from routes.auth_routes import router as auth_router
from routes.journal_routes import router as journal_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(journal_router)

@app.get("/")
def home():
    return {"message": "Backend Running Successfully"}

@app.get("/test-db")
def test_db():
    return {
        "database": str(db.name),
        "status": "Connected Successfully"
    }