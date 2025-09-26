from flask import Flask, request, jsonify, render_template
import os, requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
OPENWEATHER_KEY = os.getenv("OPENWEATHER_KEY")

@app.route("/")
def index():
    return render_template("openweather.html")

@app.route("/weather")
def weather():
    lat = request.args.get("lat")
    lng = request.args.get("lng")

    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lng}&appid={OPENWEATHER_KEY}&units=metric"

    r = requests.get(url)
    return jsonify(r.json())

if __name__ == "__main__":
    app.run(debug=True)