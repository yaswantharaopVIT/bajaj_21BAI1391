from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({
        "operation_code": 1
    }), 200

@app.route('/bfhl', methods=['POST'])
def process_data():
    try:
        data = request.get_json()

        # Input validation
        if not isinstance(data, dict) or not isinstance(data.get('data'), list):
            return jsonify({"is_success": False, "message": "Invalid input"}), 400

        # Mocked user data
        user_id = "john_doe_17091999"
        email = "john@xyz.com"
        roll_number = "ABCD123"

        # Separate numbers and alphabets
        numbers = [item for item in data['data'] if item.isdigit()]
        alphabets = [item for item in data['data'] if item.isalpha()]

        # Find the highest lowercase alphabet
        lowercase_alphabets = [char for char in alphabets if char.islower()]
        highest_lowercase_alphabet = max(lowercase_alphabets) if lowercase_alphabets else None

        response = {
            "is_success": True,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase_alphabet] if highest_lowercase_alphabet else []
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({"is_success": False, "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
