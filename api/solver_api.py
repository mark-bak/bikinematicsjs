from flask import Flask, request
from flask import g

from bikinematicsolver.bike import Bike #type: ignore

import json
import sqlite3
import os

## Database management fcns shamelessly copied (and partially understood) from https://flask.palletsprojects.com/en/2.0.x/patterns/sqlite3/
DATABASE = 'bikinematicsv1.db'

def get_db():
    db = getattr(g,'_database',None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

def write_db(query, args=()):
    cur = get_db().cursor()
    cur.execute(query, args)
    get_db().commit()
    return {'msg':'write_db executed'}

app = Flask(__name__, static_folder = '../build', static_url_path = '/')

@app.teardown_appcontext
#close databse on context end
def close_connection(exception):
    db = getattr(g,'_database',None)
    if db is not None:
        db.close()

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api')
def index_api():
    return {'Status':'OK'}

@app.route('/api/solve')
def solve():
    """
    Need to look at input error chacking and output error checking
    """
    data = json.loads(request.args['bike_data'])
    if data:
        try:
            sim_travel = float(request.args['sim_travel'])
            desired_outputs = json.loads(request.args['desired_outputs'])

            sol_name = 'api_call'
            b = Bike(data)
            b.get_suspension_motion(sim_travel,sol_name)
            b.calculate_suspension_characteristics(sol_name)
            ret={}
            for output in desired_outputs:
                ret[output] = b.solution[sol_name][output].tolist()
            return ret
        except:
            return {}
    return {}

@app.route('/api/getbikedata')
def get_bike_data():
    id_no = request.args['id']
    dbquery = query_db("SELECT * FROM bike_data WHERE id_no= (?)",args = [id_no], one=True) #pretty sure this is vuln to sql injection - need to chekc
    return dbquery['data']

@app.route('/api/savebikedata')
def save_bike_data():
    data = json.loads(request.args['bike_data'])
    if data != 'empty':
        return write_db("INSERT INTO bike_data VALUES (?, ?)",[1,1,json.dumps(data)])
    return {'msg':'Could not save'}

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
