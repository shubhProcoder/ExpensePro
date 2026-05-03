import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.normpath(os.path.join(BASE_DIR, '..', 'Frontend'))
app = Flask(__name__, static_folder=FRONTEND_DIR, static_url_path='')
CORS(app)

DATABASE = os.path.join(BASE_DIR, 'database.db')

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS expenses (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            amount   REAL    NOT NULL,
            category TEXT    NOT NULL,
            note     TEXT,
            date     TEXT    NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/expenses', methods=['GET'])
def get_expenses():
    conn = get_db()
    rows = conn.execute('SELECT * FROM expenses ORDER BY id DESC').fetchall()
    conn.close()
    expenses = [
        {
            'id': r['id'],
            'amount': r['amount'],
            'category': r['category'],
            'note': r['note'],
            'date': r['date']
        }
        for r in rows
    ]
    return jsonify(expenses)

@app.route('/expenses', methods=['POST'])
def add_expense():
    data = request.get_json()
    amount = data.get('amount')
    category = data.get('category')
    note = data.get('note', '')
    date = data.get('date')
    if not amount or not category or not date:
        return jsonify({'error': 'Amount, category and date are required'}), 400
    conn = get_db()
    conn.execute(
        'INSERT INTO expenses (amount, category, note, date) VALUES (?, ?, ?, ?)',
        (amount, category, note, date)
    )
    conn.commit()
    conn.close()
    return jsonify({'message': 'Expense added'}), 201

@app.route('/expenses/<int:expense_id>', methods=['DELETE'])
def delete_expense(expense_id):
    conn = get_db()
    conn.execute('DELETE FROM expenses WHERE id = ?', (expense_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Deleted'})

@app.route('/expenses/summary', methods=['GET'])
def get_summary():
    conn = get_db()
    rows = conn.execute('SELECT category, SUM(amount) as total FROM expenses GROUP BY category').fetchall()
    conn.close()
    summary = [{'category': r['category'], 'total': r['total']} for r in rows]
    return jsonify(summary)

init_db()

if __name__ == '__main__':
    app.run(debug=True)
