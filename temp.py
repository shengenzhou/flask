import json
from openai import OpenAI


question = f'maak verhaaltjessommen voor groep 8 met fortnite termen. Met antwoorden en uitleg in een JSON structuur als volgt '
format = '{\"questions\":[{\"id\":101,\"context\":\"Context for question 1.\",\"question\":\"Question 1?\",\"correct_answer\":\"Answer 1\",\"explanation\":\"Explanation for answer 1.\"},{\"id\":102,\"context\":\"Context for question 2.\",\"question\":\"Question 2?\",\"correct_answer\":\"Answer 2\",\"explanation\":\"Explanation for answer 2.\"},{\"id\":103,\"context\":\"Context for question 3.\",\"question\":\"Question 3?\",\"correct_answer\":\"Answer 3\",\"explanation\":\"Explanation for answer 3.\"},{\"id\":104,\"context\":\"Context for question 4.\",\"question\":\"Question 4?\",\"correct_answer\":\"Answer 4\",\"explanation\":\"Explanation for answer 4.\"},{\"id\":105,\"context\":\"Context for question 5.\",\"question\":\"Question 5?\",\"correct_answer\":\"Answer 5\",\"explanation\":\"Explanation for answer 5.\"}]}'


client = OpenAI()

response = client.chat.completions.create(
model="gpt-4o-mini",
response_format={ "type": "json_object" },
messages=[
    {f"role": "system", "content": "You are a dutch primary school math teacher that creates math excersises to output to JSON"},
    {f"role": "user", "content": question + format}
]
)

message_content = response.choices[0].message.content
message_json = json.loads(message_content)
print(message_content)
print("--------")
print(message_json)