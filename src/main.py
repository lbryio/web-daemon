from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import requests

app = Flask(__name__)
CORS(app)

@app.route('/', methods = ['GET'])
def resolve_name():
    param = request.args.to_dict()
    method = param.pop('method')
    pretty_print = param.pop('pretty_print', False)

    response = api(method, param)
    print (pretty_print)
    if(pretty_print == 'True'):
        return "<pre>" + json.dumps(response, indent=2, sort_keys=True) + "</pre>"
    else:
        return jsonify(response)

def api(method, param):
    url = "http://localhost:5279/lbryapi"
    headers = {'content-type': 'application/json'}

    payload = {
        "method": method,
        "params": param
    }

    return requests.post( url, data=json.dumps(payload), headers=headers).json()

if __name__ == '__main__':
    app.run()
