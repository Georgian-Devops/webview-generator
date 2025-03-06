
# WebView APK Generator Backend

This is a Python Flask backend service for generating Android WebView APKs from URLs.

## Setup

1. Install Python 3.8 or higher
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the development server:
   ```
   python app.py
   ```

4. The server will be available at http://localhost:5000

## API Endpoints

### Start APK Build
- URL: `/apk-builder/build`
- Method: POST
- Form Parameters:
  - `url` (required): The website URL to convert to an app
  - `appName`: The name of the app (default: "WebView App")
  - `packageName`: The package name (default: "com.webview.app")
  - `appVersion`: The app version (default: "1.0.0")
  - `appVersionCode`: The app version code (default: "1")
  - `appIcon`: App icon file (PNG or JPG)
- Response:
  ```json
  {
    "status": "processing",
    "message": "APK build started",
    "buildId": "uuid-string"
  }
  ```

### Check Build Status
- URL: `/apk-builder/status/<build_id>`
- Method: GET
- Response (processing):
  ```json
  {
    "status": "processing",
    "message": "Building APK: 45% complete",
    "buildId": "uuid-string"
  }
  ```
- Response (success):
  ```json
  {
    "status": "success",
    "message": "APK build completed successfully",
    "downloadUrl": "/apk-builder/download/uuid-string",
    "buildId": "uuid-string"
  }
  ```
- Response (error):
  ```json
  {
    "status": "error",
    "message": "Error message",
    "buildId": "uuid-string"
  }
  ```

### Download APK
- URL: `/apk-builder/download/<build_id>`
- Method: GET
- Response: APK file download

### Get Demo APK
- URL: `/apk-builder/demo`
- Method: GET
- Response: Demo APK file download

## Production Deployment

For production deployment, consider:

1. Using a production WSGI server like Gunicorn:
   ```
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

2. Setting up a reverse proxy with Nginx

3. Using a process manager like Supervisord

4. Implementing proper logging and monitoring

5. Securing the API with authentication
