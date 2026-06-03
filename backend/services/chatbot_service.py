# services/chatbot_service.py

def generate_response(emotion):

    responses = {

        "joy":
            "That's wonderful to hear. Keep celebrating your achievements and positive moments.",

        "sadness":
            "I'm sorry you're feeling sad. Consider talking with someone you trust and remember that difficult emotions eventually pass.",

        "anger":
            "You seem frustrated. Taking a short break and focusing on your breathing may help.",

        "fear":
            "Feeling afraid is natural. Try focusing on what you can control right now.",

        "love":
            "It's great that you're feeling connected and appreciated. Relationships are important for wellbeing.",

        "surprise":
            "Unexpected events can bring many emotions. Take some time to process what happened.",

        "neutral":
            "You seem emotionally balanced today. Continue maintaining healthy habits."
    }

    return responses.get(
        emotion,
        "Thank you for sharing your thoughts."
    )