from flask import Flask, request
from bikinematicsolver.bike import Bike #type: ignore
import json

app = Flask(__name__)

@app.route('/')
def index():
    return {'Status':'OK'}

@app.route('/solve')
def solve():
    """
    Need to look at input error chacking and output error checking
    """
    data = json.loads(request.args['bike_data'])
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