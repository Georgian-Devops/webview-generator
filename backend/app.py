
from flask import Flask, request, jsonify, send_file, make_response
from flask_cors import CORS
import os
import uuid
import time
import shutil
import requests
from werkzeug.utils import secure_filename
import threading
import json
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
UPLOAD_FOLDER = 'uploads'
BUILD_FOLDER = 'builds'
DEMO_FOLDER = 'demo'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
TEMPLATES_FOLDER = 'templates'

# Create necessary directories
for folder in [UPLOAD_FOLDER, BUILD_FOLDER, DEMO_FOLDER, TEMPLATES_FOLDER]:
    os.makedirs(folder, exist_ok=True)

# Download a sample APK if demo folder is empty
if not os.listdir(DEMO_FOLDER):
    try:
        logger.info("Downloading sample WebView APK...")
        sample_apk_url = "https://github.com/slymax/webview/releases/download/1.0/webview-app-release.apk"
        response = requests.get(sample_apk_url)
        if response.status_code == 200:
            with open(os.path.join(DEMO_FOLDER, 'webview-app-release.apk'), 'wb') as f:
                f.write(response.content)
            logger.info("Sample APK downloaded successfully")
        else:
            logger.error(f"Failed to download sample APK: {response.status_code}")
    except Exception as e:
        logger.error(f"Error downloading sample APK: {str(e)}")

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_build_progress(build_id):
    """Simulates getting the build progress for a given build ID."""
    build_dir = os.path.join(BUILD_FOLDER, build_id)
    
    # If build doesn't exist, return None
    if not os.path.exists(build_dir):
        return None
    
    # Check if build has completed
    apk_path = os.path.join(build_dir, 'app-release.apk')
    if os.path.exists(apk_path):
        return 100
    
    # Check if there's an error
    error_path = os.path.join(build_dir, 'error.log')
    if os.path.exists(error_path):
        return -1
    
    # Calculate progress based on time elapsed
    build_info_path = os.path.join(build_dir, 'build.info')
    if os.path.exists(build_info_path):
        creation_time = os.path.getctime(build_info_path)
        elapsed_seconds = time.time() - creation_time
        
        # Simulate a build that takes about 60 seconds
        progress = min(int((elapsed_seconds / 60) * 100), 95)
        
        # If more than 2 minutes have passed, let's say it's done
        if elapsed_seconds > 120:
            # Create a mock APK file
            shutil.copy(
                os.path.join(DEMO_FOLDER, 'webview-app-release.apk'),
                apk_path
            )
            return 100
            
        return progress
    
    return 0

def build_apk_process(build_id, url, app_name, package_name, app_version, app_version_code, app_icon_path=None):
    """Background process for building the APK."""
    build_dir = os.path.join(BUILD_FOLDER, build_id)
    
    try:
        logger.info(f"Starting build process for {build_id}")
        
        # Sleep to simulate building (in real implementation, this would call the actual build tools)
        time.sleep(10)  # Initial setup
        
        # Create a progress file
        with open(os.path.join(build_dir, 'progress.txt'), 'w') as f:
            f.write('20')
        
        time.sleep(10)  # Template preparation
        
        with open(os.path.join(build_dir, 'progress.txt'), 'w') as f:
            f.write('40')
        
        time.sleep(10)  # Injecting URL
        
        with open(os.path.join(build_dir, 'progress.txt'), 'w') as f:
            f.write('60')
        
        time.sleep(10)  # Compiling
        
        with open(os.path.join(build_dir, 'progress.txt'), 'w') as f:
            f.write('80')
        
        time.sleep(10)  # Finalizing
        
        # In a real implementation, this is where we would actually build the APK
        # For now, we'll just copy the demo APK
        demo_apk_path = os.path.join(DEMO_FOLDER, 'webview-app-release.apk')
        if os.path.exists(demo_apk_path):
            shutil.copy(demo_apk_path, os.path.join(build_dir, 'app-release.apk'))
            logger.info(f"Build completed for {build_id}")
        else:
            with open(os.path.join(build_dir, 'error.log'), 'w') as f:
                f.write('Demo APK not found')
            logger.error(f"Build failed for {build_id}: Demo APK not found")
    
    except Exception as e:
        logger.error(f"Build failed for {build_id}: {str(e)}")
        with open(os.path.join(build_dir, 'error.log'), 'w') as f:
            f.write(f'Build failed: {str(e)}')

@app.route('/apk-builder/build', methods=['POST'])
def build_apk():
    """Start a new APK build process."""
    # Generate a unique build ID
    build_id = str(uuid.uuid4())
    build_dir = os.path.join(BUILD_FOLDER, build_id)
    os.makedirs(build_dir, exist_ok=True)
    
    try:
        # Get form data
        url = request.form.get('url')
        app_name = request.form.get('appName', 'WebView App')
        package_name = request.form.get('packageName', 'com.webview.app')
        app_version = request.form.get('appVersion', '1.0.0')
        app_version_code = request.form.get('appVersionCode', '1')
        
        if not url:
            return jsonify({
                'status': 'error',
                'message': 'URL is required'
            }), 400
        
        # Process app icon if provided
        app_icon_path = None
        if 'appIcon' in request.files:
            app_icon = request.files['appIcon']
            if app_icon and allowed_file(app_icon.filename):
                filename = secure_filename(app_icon.filename)
                app_icon_path = os.path.join(build_dir, filename)
                app_icon.save(app_icon_path)
                logger.info(f"Saved app icon to {app_icon_path}")
        
        # Save build information
        with open(os.path.join(build_dir, 'build.info'), 'w') as f:
            f.write(f"URL: {url}\n")
            f.write(f"App Name: {app_name}\n")
            f.write(f"Package Name: {package_name}\n")
            f.write(f"Version: {app_version}\n")
            f.write(f"Version Code: {app_version_code}\n")
            f.write(f"Icon: {app_icon_path}\n")
        
        # Start build process in a background thread
        thread = threading.Thread(
            target=build_apk_process,
            args=(build_id, url, app_name, package_name, app_version, app_version_code, app_icon_path)
        )
        thread.daemon = True
        thread.start()
        
        logger.info(f"APK build started for {url} with build ID {build_id}")
        
        return jsonify({
            'status': 'processing',
            'message': 'APK build started',
            'buildId': build_id
        })
    
    except Exception as e:
        logger.error(f"Error starting build: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/apk-builder/status/<build_id>', methods=['GET'])
def build_status(build_id):
    """Check the status of an APK build."""
    build_dir = os.path.join(BUILD_FOLDER, build_id)
    
    # Check if build directory exists
    if not os.path.exists(build_dir):
        return jsonify({
            'status': 'error',
            'message': 'Build not found'
        }), 404
    
    # Check for completed APK
    apk_path = os.path.join(build_dir, 'app-release.apk')
    if os.path.exists(apk_path):
        download_url = f"/apk-builder/download/{build_id}"
        return jsonify({
            'status': 'success',
            'message': 'APK build completed successfully',
            'downloadUrl': download_url,
            'buildId': build_id
        })
    
    # Check for error file
    error_path = os.path.join(build_dir, 'error.log')
    if os.path.exists(error_path):
        with open(error_path, 'r') as f:
            error_message = f.read()
        return jsonify({
            'status': 'error',
            'message': error_message,
            'buildId': build_id
        })
    
    # Calculate progress
    progress = get_build_progress(build_id)
    if progress is None:
        return jsonify({
            'status': 'error',
            'message': 'Build not found',
            'buildId': build_id
        }), 404
    elif progress == -1:
        # Error occurred
        with open(os.path.join(build_dir, 'error.log'), 'r') as f:
            error_message = f.read()
        return jsonify({
            'status': 'error',
            'message': error_message,
            'buildId': build_id
        })
    elif progress == 100:
        # Build completed
        download_url = f"/apk-builder/download/{build_id}"
        return jsonify({
            'status': 'success',
            'message': 'APK build completed successfully',
            'downloadUrl': download_url,
            'buildId': build_id
        })
    else:
        # Build in progress
        return jsonify({
            'status': 'processing',
            'message': f"Building APK: {progress}% complete",
            'buildId': build_id,
            'progress': progress
        })

@app.route('/apk-builder/download/<build_id>', methods=['GET'])
def download_apk(build_id):
    """Download a completed APK build."""
    build_dir = os.path.join(BUILD_FOLDER, build_id)
    apk_path = os.path.join(build_dir, 'app-release.apk')
    
    if os.path.exists(apk_path):
        return send_file(
            apk_path,
            as_attachment=True,
            download_name=f"webview-app-{build_id[:8]}.apk",
            mimetype='application/vnd.android.package-archive'
        )
    
    return jsonify({
        'status': 'error',
        'message': 'APK file not found'
    }), 404

@app.route('/apk-builder/demo', methods=['GET'])
def get_demo_apk():
    """Get a demo APK without going through the build process."""
    demo_apk_path = os.path.join(DEMO_FOLDER, 'webview-app-release.apk')
    
    if os.path.exists(demo_apk_path):
        return send_file(
            demo_apk_path,
            as_attachment=True,
            download_name="webview-app-demo.apk",
            mimetype='application/vnd.android.package-archive'
        )
    
    return jsonify({
        'status': 'error',
        'message': 'Demo APK file not found'
    }), 404

@app.route('/healthcheck', methods=['GET'])
def healthcheck():
    """Simple health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'version': '1.0.0',
        'message': 'WebView APK Generator API is running'
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
