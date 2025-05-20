from flask import Flask, render_template, send_from_directory
import json
import os

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/treino/<dia>")
def treino(dia):
    with open("treino.json", "r", encoding="utf-8") as f:
        treinos = json.load(f)
    dia_formatado = dia.replace("-", " ").capitalize()
    treino_do_dia = treinos.get(dia_formatado, [])
    return render_template("treino.html", dia=dia_formatado, exercicios=treino_do_dia)

@app.route("/manifest.json")
def manifest():
    return send_from_directory('.', 'manifest.json')

@app.route("/service-worker.js")
def sw():
    return send_from_directory('.', 'service-worker.js')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port, debug=True)


