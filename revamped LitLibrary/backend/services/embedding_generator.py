import os
import torch
from transformers import AutoTokenizer, AutoModel
import pinecone

pinecone_api_key = os.getenv('PINECONE_API_KEY')
pinecone_env = os.getenv('PINECONE_ENVIRONMENT')
pinecone_index_name = os.getenv('PINECONE_INDEX_NAME')

pinecone.init(api_key=pinecone_api_key, environment=pinecone_env)
index = pinecone.Index(pinecone_index_name)

model_name = "meta-llama/Meta-Llama-3.1-8B"
token = os.getenv('HF_AUTH_TOKEN')

tokenizer = AutoTokenizer.from_pretrained(model_name, use_auth_token=token)
model = AutoModel.from_pretrained(model_name, use_auth_token=token)

def generate_embedding(book):
    inputs = tokenizer(book["title"] + " " + book["genre"] + " " + book["description"], return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).squeeze().numpy()

def store_embedding(user_id, books):
    vectors = []
    for book in books:
        embedding = generate_embedding(book)
        vectors.append({
            "id": f"{user_id}-{book['id']}",
            "values": embedding.tolist(),
            "metadata": {
                "title": book["title"],
                "genre": book["genre"],
                "description": book["description"]
            }
        })
    index.upsert(vectors)
