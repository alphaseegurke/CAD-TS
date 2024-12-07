from flask import Flask, request, jsonify
from models import db_session, User

app = Flask(__name__)

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if db_session.query(User).filter_by(username=data['username']).first():
        return jsonify({'message': 'User already exists'}), 400

    new_user = User(username=data['username'], password=data['password'], role=data.get('role', 'civilian'))
    db_session.add(new_user)
    db_session.commit()
    return jsonify({'message': 'User registered successfully!'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = db_session.query(User).filter_by(username=data['username'], password=data['password']).first()
    if user:
        return jsonify({'message': 'Login successful!', 'role': user.role})
    return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
