from fastapi import APIRouter

from database.db import db
from services.emotion_service import analyze_emotion
from services.chatbot_service import generate_response

router = APIRouter()

journal_collection = db["journals"]


@router.post("/journal")
def create_journal(data: dict):

    try:

        text = data["text"]

        emotion_result = analyze_emotion(text)
        ai_response = generate_response(
    emotion_result["emotion"]
)

        journal_data = {
            "text": text,
            "emotion": emotion_result["emotion"],
            "score": emotion_result["score"]
        }

        journal_collection.insert_one(journal_data)

        return {
    "message": "Journal saved successfully",
    "analysis": emotion_result,
    "ai_response": ai_response
}

    except Exception as e:

        return {
            "error": str(e)
        }


@router.get("/journals")
def get_journals():

    try:

        journals = list(
            journal_collection.find(
                {},
                {"_id": 0}
            )
        )

        return journals if journals else []

    except Exception as e:

        return {
            "error": str(e)
        }


@router.delete("/journal/{index}")
def delete_journal(index: int):

    try:

        journals = list(journal_collection.find())

        if index >= len(journals):

            return {
                "message": "Journal not found"
            }

        journal_collection.delete_one({
            "_id": journals[index]["_id"]
        })

        return {
            "message": "Journal deleted successfully"
        }

    except Exception as e:

        return {
            "error": str(e)
        }