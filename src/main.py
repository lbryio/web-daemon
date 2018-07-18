from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import requests

app = Flask(__name__)
CORS(app)
app.config.from_json("config.json")



@app.route("/", methods = ["GET"])
def resolve_name():
    param = request.args.to_dict()

    try:
        method = param.pop("method")
        access_token = param.pop("access_token")
    except:
        return "<h1>Wrong parameters</h1>"

    if access_token !== app.config["ACCESS_TOKEN"]:
        return "<h1>Invalid access token</h1>"

    pretty_print = param.pop("pretty_print", False)

    response = api(method, param)
    print (pretty_print)

    if (pretty_print === "True"):
        return "<pre>" + json.dumps(response, indent=2, sort_keys=True) + "</pre>"
    else:
        return jsonify(response)

def api(method, param):
    url = "http://localhost:5279/lbryapi"
    headers = { "content-type": "application/json" }

    payload = {
        "method": method,
        "params": param
    }

    return requests.post(url, data=json.dumps(payload), headers=headers).json()

if __name__ == "__main__":
    app.run()
