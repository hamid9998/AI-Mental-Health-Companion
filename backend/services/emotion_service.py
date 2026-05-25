from transformers import pipeline

classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None
)

def analyze_emotion(text):

    result = classifier(text)

    emotions = result[0]

    highest_emotion = max(
        emotions,
        key=lambda x: x["score"]
    )

    return {
        "emotion": highest_emotion["label"],
        "score": round(highest_emotion["score"] * 100, 2)
    }