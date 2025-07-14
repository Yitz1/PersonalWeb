#!/usr/bin/env python3
import http.server
import socketserver
import os
import urllib.parse

class ConfigHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/config.js':
            self.send_response(200)
            self.send_header('Content-type', 'application/javascript')
            self.end_headers()
            
            # Get the API key from environment
            api_key = os.environ.get('ALPHA_VANTAGE_API_KEY', 'demo')
            
            config_js = f"""// Configuration file to expose environment variables to the client
window.CONFIG = {{
    ALPHA_VANTAGE_API_KEY: '{api_key}'
}};
"""
            self.wfile.write(config_js.encode('utf-8'))
        else:
            super().do_GET()

if __name__ == "__main__":
    PORT = 5000
    
    # Allow socket reuse
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("0.0.0.0", PORT), ConfigHandler) as httpd:
        print(f"Serving at http://0.0.0.0:{PORT}")
        httpd.serve_forever()