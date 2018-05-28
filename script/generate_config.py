import hashlib
import json
import os


def generate_access_token(n_bytes):
    return hashlib.sha1(os.urandom(n_bytes)).hexdigest()


def save_config(config_data):
    with open('../config/config.json', 'w') as outfile:
        json.dump(config_data, outfile)


config_data = dict()
access_token = generate_access_token(256)
config_data['access_token'] = access_token
save_config(config_data)
