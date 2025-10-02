from flask import Flask, request, jsonify, render_template
import os, requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
OPENWEATHER_KEY = os.getenv("OPENWEATHER_KEY")

@app.route("/air")
def air():
    lat = request.args.get("lat")
    lng = request.args.get("lng")

    if not lat or not lng:
        return jsonify({"error": "Missing lat/lng"}), 400

    url = f"https://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lng}&appid={OPENWEATHER_KEY}"

    r = requests.get(url)
    return jsonify(r.json())

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/weather")
def weather():
    lat = request.args.get("lat")
    lng = request.args.get("lng")

    if not lat or not lng:
        return jsonify({"error": "Missing lat/lng"}), 400

    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lng}&appid={OPENWEATHER_KEY}&units=metric"

    r = requests.get(url)
    return jsonify(r.json())

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)