var logger = require('morgan'),
	cors = require('cors'),
	express = require('express'),
	errorhandler = require('errorhandler'),
	cors = require('cors'),
	dotenv  = require('dotenv'),
	bodyParser = require('body-parser'),
	path = require('path');

var app = express();
var port = process.env.PORT || 3000;

dotenv.load();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(require('./server/anonymous-routes'));
app.use(require('./server/protected-routes'));
app.use(require('./server/user-routes'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html')
});

app.use( function(err, req, res, next) {
	if (err.name === 'StatusError') {
		res.send(err.status, err.message);
	}
	else {
	    next(err);
	}
});

// if (process.env.NODE_ENV === 'development') {
// 	app.use(logger('dev'));
// 	app.use(errorhandler())
// }

app.listen(port, function (err) {
	console.log('listening in http://localhost:' + port);
});
