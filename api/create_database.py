import sqlite3

DATABASE = 'bikinematicsv1.db'

conn = sqlite3.connect(DATABASE)
cur = conn.cursor()

cur.execute("CREATE TABLE bike_data (id_no int, data json)")