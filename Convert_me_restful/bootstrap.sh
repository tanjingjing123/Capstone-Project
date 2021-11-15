#!/bin/sh
export FLASK_APP=./convert_me_restful.py
source $(pipenv --venv)/bin/activate
flask run -h 0.0.0.0