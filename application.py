from flask import Flask, request
import requests


application = Flask(__name__)


@application.route('/')
def homepage():
    return application.send_static_file('index.html')


@application.route('/events', methods=['GET'])
def get_events():
    keyword = request.args.get('keyword')

    url = f'https://app.ticketmaster.com/discovery/v2/events.json?apikey=AUDS8juIE7IqZ5q4FSzUsrpS7Hr3XBDC&keyword={keyword}'
    response = requests.get(url)
    data = response.json()

    return data


@application.route('/details', methods=['GET'])
def get_event_details():
    eventId = request.args.get('id')

    url = f'https://app.ticketmaster.com/discovery/v2/events/{eventId}?apikey=AUDS8juIE7IqZ5q4FSzUsrpS7Hr3XBDC'
    response = requests.get(url)
    data = response.json()

    return data


@application.route('/venues', methods=['GET'])
def get_venues():
    name = request.args.get('name')

    url = f'https://app.ticketmaster.com/discovery/v2/venues?apikey=AUDS8juIE7IqZ5q4FSzUsrpS7Hr3XBDC&keyword={name}'
    response = requests.get(url)
    data = response.json()

    return data


if __name__ == '__main__':
    application.run(host='0.0.0.0', port=5000)
