from fastapi import APIRouter

from database.db import db
from services.emotion_service import analyze_emotion

router = APIRouter()

journal_collection = db["journals"]

@router.post("/journal")
def create_journal(data: dict):

    text = data["text"]

    emotion_result = analyze_emotion(text)

    journal_data = {
        "text": text,
        "emotion": emotion_result["emotion"],
        "score": emotion_result["score"]
    }

    journal_collection.insert_one(journal_data)

    return {
        "message": "Journal saved successfully",
        "analysis": emotion_result
    }

@router.get("/journals")
def get_journals():

    journals = list(
        journal_collection.find(
            {},
            {"_id": 0}
        )
    )

    return journals