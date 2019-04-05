var express = require('express');
var app = express();

var passport = require('passport');
var Strategy = require('passport-local').Strategy;

const cors = require('cors');
app.use(cors());
app.options('*', cors())

const request = require('request');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Factory = require('./module.factory.js');

mongoose_options = {'useFindAndModify': false, 'useNewUrlParser': true};
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/albumdb', options=mongoose_options);
var db = mongoose.connection;

var factory = new Factory(Schema, mongoose);
factory.createSchemas();

var base_url = '/api/v1/'

// Album Routes
app.get(base_url + 'album', function(req, res) {
	var resp = factory.getAlbums(req.query, res);
});

app.get(base_url + 'album/:id', function(req, res) {
	var resp = factory.getAlbum(req.params.id, res);
});

app.post(base_url + 'album', function(req, res) {
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
	console.log('Mongo working!');
});
