from flask import Flask, request,jsonify
import json
import urllib2
import cStringIO
import base64

"""
Taken from:  https://gist.github.com/1094140
"""

from functools import wraps
from flask import request, current_app


def jsonp(func):
    """Wraps JSONified output for JSONP requests."""
    @wraps(func)
    def decorated_function(*args, **kwargs):
        callback = request.args.get('callback', False)
        if callback:
            data = str(func(*args, **kwargs).data)
            content = str(callback) + '(' + data + ')'
            mimetype = 'application/javascript'
            return current_app.response_class(content, mimetype=mimetype)
        else:
            return func(*args, **kwargs)
    return decorated_function


app = Flask(__name__)

@app.route("/")
@jsonp
def hello():
        f = urllib2.urlopen(urllib2.unquote('http://static.guim.co.uk/sys-images/%s') % request.args.get('img'))
	im = cStringIO.StringIO(f.read())
        return_image = base64.b64encode(im.getvalue())
        type_prefix = "data:image/jpg;base64,"
        data = {
                            "data": type_prefix + return_image
                        }
    	return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
