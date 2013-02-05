var http = require('http'),
    url = require('url'),
    querystring = require('querystring'),
    router = require('router'),
    route = router();

var random_str = function(len, charSet){
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var text = '';
    for (var i = 0; i < len; i++) {
        text += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return text;
};

for(var code in http.STATUS_CODES){
    if(http.STATUS_CODES.hasOwnProperty(code)){
        route.all('/'+code, function(c){
            // use closure to add event in for loop
            return function(req, res){
                console.log('route: ' + c);
                res.writeHead(c);
                res.end(c);
            }
        }(code));
    }
}

route.get('/', function(req, res) {
    res.writeHead(200);
    res.end('Hello, world!');
});

route.get('/default', function(req, res) {
    var query = querystring.parse(url.parse(req.url).query),
        code = parseInt(query['code'], 10),
        delay = parseInt(query['delay'], 10),
        length = parseInt(query['length'], 10);
    console.log('default url request query: ' + url.parse(req.url).query);
    if(isNaN(code) || !http.STATUS_CODES.hasOwnProperty(code)){
        code = 200;     // default 200 OK
    }
    if(isNaN(delay) || delay < 0){
        delay = 0;  // default no delay
    }
    if(isNaN(length) || length <= 0){
        length = 16;  // default 1024 length
    }
    res.writeHead(code, {
        "Content-Type": "text/plain",
        "Content-Length": length,
    });
    setTimeout(function(){
        res.end(random_str(length));
    }, delay);    // delay to send out the response
});

route.get('/{digits}([0-9]+)', function(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/plain",
        "Content-Length": req.params.digits,
    });
    res.end(random_str(parseInt(req.params.digits, 10)));
});

http.createServer(route).listen(8080); // start the server on port 8080
console.log('server listen on 8080');
