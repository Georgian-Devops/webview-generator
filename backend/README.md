
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
    "buildId": "uuid-string",
    "progress": 45
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

### Health Check
- URL: `/healthcheck`
- Method: GET
- Response:
  ```json
  {
    "status": "healthy",
    "version": "1.0.0",
    "message": "WebView APK Generator API is running"
  }
  ```

## Deployment Options

### Deploying on Free Tier Services

You can deploy this Python backend on various free tier services:

1. **Heroku Free Tier**:
   - Create a `Procfile` with `web: gunicorn app:app`
   - Add `runtime.txt` with your Python version
   - Deploy using the Heroku CLI or GitHub integration

2. **PythonAnywhere**:
   - Free tier includes a Flask web app
   - Upload your code and set up a WSGI configuration

3. **Google Cloud Run**:
   - Free tier includes 2 million requests per month
   - Create a Dockerfile and deploy as a container

4. **Vercel Serverless Functions**:
   - Create a `vercel.json` config file
   - Deploy using the Vercel CLI

### Production Deployment

For production deployment, consider:

1. Using a production WSGI server like Gunicorn:
   ```
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

2. Setting up a reverse proxy with Nginx

3. Using a process manager like Supervisord

4. Implementing proper logging and monitoring

5. Securing the API with authentication

6. Setting up proper error handling and rate limiting

## How the APK Generation Works

The APK generation process follows these steps:

1. Receive build request with URL and app metadata
2. Create a unique build directory
3. Store app icon if provided
4. Start the build process in a background thread
5. Apply the URL to a WebView template
6. Build and sign the APK
7. Store the completed APK for download

## Free and Open Source Alternatives

If you prefer to use free and open-source alternatives for WebView APK generation:

1. **Bubblewrap (PWA Builder)**:
   - https://github.com/GoogleChromeLabs/bubblewrap
   - Command-line tool for generating Android apps from PWAs

2. **WebView App Template**:
   - https://github.com/slymax/webview
   - Simple Android WebView template you can modify

3. **Trusted Web Activities (TWA)**:
   - https://developers.google.com/web/android/trusted-web-activity
   - Google's solution for creating Android apps from PWAs

4. **Cordova/PhoneGap**:
   - https://cordova.apache.org/
   - Open-source framework for building mobile apps using HTML, CSS, JS
