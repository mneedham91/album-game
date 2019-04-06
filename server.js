var express = require('express');
var app = express();

var passport = require('passport');
var jwt = require('jsonwebtoken');
var jwt_secret = 'A43101827';
var passportJWT = require('passport-jwt');
var LocalStrategy = require('passport-local').Strategy;
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;

const cors = require('cors');
app.use(cors());
app.options('*', cors())

const request = require('request');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Factory = require('./module.factory.js');

mongoose_options = {'useFindAndModify': false, 'useNewUrlParser': true};
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/albumdb', options=mongoose_options);
var db = mongoose.connection;

var factory = new Factory(Schema, mongoose, crypto);
factory.createSchemas();

// Set Passport-Local Strategy
passport.use(new LocalStrategy({
		usernameField: 'name',
		passwordField: 'password'
	},
	function (name, password, cb) {
		return factory.loginUser(name, password, cb);
	}
));

// Set Passport-JWT Strategy
passport.use(new JWTStrategy({
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		secretOrKey: jwt_secret
	},
	function (jwtPayload, cb) {
		factory.verifyUser(jwtPayload.user._id)
			.then(user => {
				return cb(null, user);
			})
			.catch(err => {
				return cb(err);
			});
	}
));

var base_url = '/api/v1/'

// Album Routes
app.get(base_url + 'album', function(req, res) {
	var resp = factory.getAlbums(req.query, res);
});

app.get(base_url + 'album/:id', function(req, res) {
	var resp = factory.getAlbum(req.params.id, res);
});

app.post(base_url + 'album', passport.authenticate('jwt', {session: false}), function(req, res) {
	var resp = factory.createAlbum(req.body, res);
});

app.patch(base_url + 'album/:id', function(req, res) {
	var resp = factory.updateAlbum(req.params.id, req.body, res);
});

app.delete(base_url + 'album/:id', function(req, res) {
	var resp = factory.deleteAlbum(req.params.id, res);
});

// Artist Routes
app.get(base_url + 'artist', function(req, res) {
	var resp = factory.getArtists(req.query, res);
});

app.get(base_url + 'artist/:id', function(req, res) {
	var resp = factory.getArtist(req.params.id, res);
});

app.post(base_url + 'artist', function(req, res) {
	var resp = factory.createArtist(req.body, res);
});

app.patch(base_url + 'artist/:id', function(req, res) {
	var resp = factory.updateArtist(req.params.id, req.body, res);
});

app.delete(base_url + 'artist/:id', function(req, res) {
	var resp = factory.deleteArtist(req.params.id, res);
});

// Round Routes
app.get(base_url + 'round', function(req, res) {
	var resp = factory.getRounds(req.query, res);
});

app.get(base_url + 'round/:id', function(req, res) {
	var resp = factory.getRound(req.params.id, res);
});

app.post(base_url + 'round', function(req, res) {
	var resp = factory.createRound(req.body, res);
});

app.patch(base_url + 'round/:id', function(req, res) {
	var resp = factory.updateRound(req.params.id, req.body, res);
});

app.delete(base_url + 'round/:id', function(req, res) {
	var resp = factory.deleteRound(req.params.id, res);
});

// Track Routes
app.get(base_url + 'track', function(req, res) {
	var resp = factory.getTracks(req.query, res);
});

app.get(base_url + 'track/:id', function(req, res) {
	var resp = factory.getTrack(req.params.id, res);
});

app.post(base_url + 'track', function(req, res) {
	var resp = factory.createTrack(req.body, res);
});

app.patch(base_url + 'track/:id', function(req, res) {
	var resp = factory.updateTrack(req.params.id, req.body, res);
});

app.delete(base_url + 'track/:id', function(req, res) {
	var resp = factory.deleteTrack(req.params.id, res);
});

// User Routes
app.get(base_url + 'user', function(req, res) {
	var resp = factory.getUsers(req.query, res);
});

app.get(base_url + 'user/:id', function(req, res) {
	var resp = factory.getUser(req.params.id, res);
});

app.post(base_url + 'user', function(req, res) {
	var resp = factory.createUser(req.body, res);
});

app.patch(base_url + 'user/:id', function(req, res) {
	var resp = factory.updateUser(req.params.id, req.body, res);
});

app.delete(base_url + 'user/:id', function(req, res) {
	var resp = factory.deleteUser(req.params.id, res);
});

// Vote Set Routes
app.get(base_url + 'voteset', function(req, res) {
	var resp = factory.getVoteSets(req.query, res);
});

app.get(base_url + 'voteset/:id', function(req, res) {
	var resp = factory.getVoteSet(req.params.id, res);
});

app.post(base_url + 'voteset', function(req, res) {
	var resp = factory.createVoteSet(req.body, res);
});

app.patch(base_url + 'voteset/:id', function(req, res) {
	var resp = factory.updateVoteSet(req.params.id, req.body, res);
});

app.delete(base_url + 'voteset/:id', function(req, res) {
	var resp = factory.deleteVoteSet(req.params.id, res);
});

// Auth Routes
app.post(base_url + 'login', function(req, res) {
	passport.authenticate('local', {session: false}, (err, user, info) => {
		if (err || !user) {
			return res.status(400).json({
				message: 'Login error: ' + err,
				user: user
			});
		}
		req.login(user, {session: false}, (err) => {
			if (err) {
				res.send(err);
			}
			const token = jwt.sign(user, jwt_secret);
			return res.json( { id: user.output._id, token: token } );
		});
	})(req, res);
});

app.post(base_url + 'setPassword', function(req, res) {
	var resp = factory.setPassword(req.body.name, req.body.password, res);
});


// Spotify Routes
app.get(base_url + 'spotify/token', function(req, res) {
	var client_id = 'd567aa85e73d41f082c2dd4618dcfd8e';
	var client_secret = 'd5e30c806ecb4b0b8d99f508f4de03d5';
	var url = 'https://' + client_id + ':' + client_secret + '@accounts.spotify.com/api/token';
	var options = {
		method: 'post',
		form: { grant_type: 'client_credentials' },
		json: true,
		url: url
	};
	request(options, function (err, resp, body) {
		if (err) {
			res.json(err);
		} else {
			res.json(body);
		}
	});
});

app.post(base_url + 'spotify/lookForAlbum', function(req, res) {
	var url = 'https://api.spotify.com/v1/search'
	var options = {
		auth: { 'bearer': req.body.token},
		method: 'get',
		qs: {q: req.body.name, type: 'album'},
		json: true,
		url: url
	}
	request(options, function (err, resp, body) {
		if (err) {
			res.json(err);
		} else {
			res.json(body);
		}
	});
});

// Angular app
app.use('/*',function(req, res) {
    var resp = res.sendfile(__dirname + '/dist/index.html');
});

app.listen(process.env.PORT || 8080);

db.on('error', function callback() {
	console.log('Connection Error');
});

db.once('open', function callback() {
	console.log('Database online!');
});
