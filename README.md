# ExpensePro

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Start the app:
   ```bash
   python Backend/app.py
   ```
3. Open the app in your browser:
   ```text
   http://127.0.0.1:5000/
   ```

## Notes

- The backend serves the frontend files from the `Frontend/` folder.
- The API is available at `http://127.0.0.1:5000/expenses`.
- If you prefer `flask run`, use:
  ```bash
  export FLASK_APP=Backend/app.py
  flask run
  ```
