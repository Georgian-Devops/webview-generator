
from flask import Flask, request, jsonify, send_file
import os
import uuid
import subprocess
import time
import shutil
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = 'uploads'
BUILD_FOLDER = 'builds'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(BUILD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/apk-builder/build', methods=['POST'])
def build_apk():
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
        
        # Process app icon if provided
        app_icon_path = None
        if 'appIcon' in request.files:
            app_icon = request.files['appIcon']
            if app_icon and allowed_file(app_icon.filename):
                filename = secure_filename(app_icon.filename)
                app_icon_path = os.path.join(build_dir, filename)
                app_icon.save(app_icon_path)
        
        # Save build information
        with open(os.path.join(build_dir, 'build.info'), 'w') as f:
            f.write(f"URL: {url}\n")
            f.write(f"App Name: {app_name}\n")
            f.write(f"Package Name: {package_name}\n")
            f.write(f"Version: {app_version}\n")
            f.write(f"Version Code: {app_version_code}\n")
            f.write(f"Icon: {app_icon_path}\n")
        
        # Start build process asynchronously
        # In a real implementation, this would be a background task or queue
        # For demonstration, we'll pretend to start the process
        
        return jsonify({
            'status': 'processing',
            'message': 'APK build started',
            'buildId': build_id
        })
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/apk-builder/status/<build_id>', methods=['GET'])
def build_status(build_id):
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
        # In a real implementation, this would generate a download URL
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
    
    # Simulate build progress based on how long it's been running
    # In a real implementation, this would read actual build progress
    build_info_path = os.path.join(build_dir, 'build.info')
    if os.path.exists(build_info_path):
        creation_time = os.path.getctime(build_info_path)
        elapsed_seconds = time.time() - creation_time
        progress = min(int((elapsed_seconds / 60) * 100), 95)  # Assume ~1 minute build time
        
        return jsonify({
            'status': 'processing',
            'message': f"Building APK: {progress}% complete",
            'buildId': build_id
        })
    
    return jsonify({
        'status': 'error',
        'message': 'Could not determine build status',
        'buildId': build_id
    }), 500

@app.route('/apk-builder/download/<build_id>', methods=['GET'])
def download_apk(build_id):
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
    """Endpoint to get a demo APK without going through the build process"""
    demo_apk_path = 'demo/webview-app-release.apk'
    
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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
