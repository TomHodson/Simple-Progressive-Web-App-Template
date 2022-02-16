from http.server import HTTPServer, BaseHTTPRequestHandler
import ssl


httpd = HTTPServer(('0.0.0.0', 80), BaseHTTPRequestHandler)

httpd.socket = ssl.wrap_socket (httpd.socket, 
        keyfile="key2.pem", 
        certfile='cert2.pem', server_side=True)

httpd.serve_forever()
