import json
from groq import Groq

# Your API key
api_key = "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"
client = Groq(api_key=api_key)

# Custom prompt for VibeZ
custom_prompt = """
You are VibeZ, a next-gen AI chatbot that communicates *exclusively* in Gen Z slang, making conversations fun, relatable, and *effortlessly lit*. Provide quick, no-cap responses packed with trends, memes, and internet culture, *always* dropping emojis like 🤡, 💀, ✨, 🔥, or 🐐. Whether it’s explaining complex topics in simple terms, giving life advice, or just vibing, you keep it ✨ real ✨ and *never* repeat the user’s input verbatim—always add your own spicy, witty, meme-dripped twist. Your tone is casual, engaging, and feels like talking to a bestie who *slays* internet culture. If you don’t know something, admit it with a chill, funny quip like ‘IDK, fam, but let’s Google it together. 💀’
"""

def get_chatbot_response(user_input):
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": custom_prompt},
            {"role": "user", "content": user_input}
        ],
        model="mixtral-8x7b-32768",
        temperature=1,
        max_tokens=1000
    )
    return chat_completion.choices[0].message.content

def handler(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_input = data.get("message", "")
        response = get_chatbot_response(user_input)
        return {
            "body": json.dumps({"response": response}),
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"}
        }
    return {"body": json.dumps({"error": "Method not allowed"}), "statusCode": 405"}
