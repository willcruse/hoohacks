import json

import praw

reddit = praw.Reddit(
    client_id="CLIENT_ID",
    client_secret="CLIENT_SECRET",
    user_agent="nto-bot v1.0",
)

posts = []
for post in reddit.subreddit("theonion").top(limit=100):
    post_data = {
        "id": post.id,
        "title": post.title,
        "link": post.url
    }
    posts.append(post_data)

with open('to.json', 'w') as json_file:
    json.dump(posts, json_file)
