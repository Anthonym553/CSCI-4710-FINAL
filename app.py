from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/templates/snake.html")
def game():
    return render_template("snake.html")

@app.route("/templates/leaderboard.html")
def leaderboard():
    return render_template("leaderboard.html")

if __name__ == "__main__":
  app.run()