from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torch.nn as nn
import re
from transformers import BertTokenizer, BertModel
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the multilingual BERT model
bert = BertModel.from_pretrained('bert-base-multilingual-uncased')

# Load the multilingual BERT tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-multilingual-uncased')

# Set device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load answers from the CSV file
answers_df = pd.read_csv('./chatbot models/cleaned_medical.csv')
answers = answers_df['answers'].tolist()

class BERT_Arch(nn.Module):
    def __init__(self, bert):
        super(BERT_Arch, self).__init__()
        self.bert = bert
        self.dropout = nn.Dropout(0.1)
        self.fc1 = nn.Linear(768, len(answers))  # Update to the number of answers

    def forward(self, sent_id, attention_mask):
        cls_hs = self.bert(sent_id, attention_mask=attention_mask)[0][:, 0]
        x = self.dropout(cls_hs)
        output = self.fc1(x)
        return output

model_path = "./chatbot models/trained_model.pth"
model = BERT_Arch(bert)
model.load_state_dict(torch.load(model_path, map_location=device))
model.to(device)

def get_prediction(input_str):
    tokens_test_data = tokenizer(
        [input_str],
        max_length=128,
        padding='max_length',
        truncation=True,
        return_token_type_ids=False
    )

    test_seq = torch.tensor(tokens_test_data['input_ids']).to(device)
    test_mask = torch.tensor(tokens_test_data['attention_mask']).to(device)

    model.eval()

    with torch.no_grad():
        preds = model(test_seq, attention_mask=test_mask)
        preds = torch.softmax(preds, dim=1)
        pred_idx = torch.argmax(preds, dim=1).item()

    return answers[pred_idx]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    question = data['question']
    answer = get_prediction(question)
    return jsonify({'answer': answer})

if __name__ == '__main__':     app.run(debug=True)
