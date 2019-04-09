var Factory = function(Schema, mongoose, crypto, smtp) {
	this.Schema = Schema;
	this.mongoose = mongoose;
	this.crypto = crypto;
	this.smtpTransport = smtp
	
	this.createSchemas = function() {
		AlbumSchema = new this.Schema({
			artist: Schema.ObjectId,
			date: Date,
			name: String,
			nominator: Schema.ObjectId,
			round: Schema.ObjectId,
			spotify_id: String
		}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});
		this.Album = mongoose.model('Album', AlbumSchema);
		ArtistSchema = new this.Schema({
			name: String,
			spotify_id: String,
		}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});
		this.Artist = mongoose.model('Artist', ArtistSchema);
		RoundSchema = new this.Schema({
			description: String,
			name: String,
			nominator: Schema.ObjectId,
			number: Number
		}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});
		this.Round = mongoose.model('Round', RoundSchema);
		TrackSchema = new this.Schema({
			album: Schema.ObjectId,
			composer: String,
			name: String,
			number: Number,
			spotify_id: String,
		}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});
		this.Track = mongoose.model('Track', TrackSchema);
		UserSchema = new this.Schema({
			name: String,
			email: String,
			hash: String,
			salt: String,
			reset_password_token: String,
			reset_password_expires: Date,
		});
		this.User = mongoose.model('User', UserSchema);
		VoteSetSchema = new this.Schema({
			album: Schema.ObjectId,
			vote_one: Schema.ObjectId,
			vote_two: Schema.ObjectId,
			vote_three: Schema.ObjectId,
			unfave: Schema.ObjectId,
			user: Schema.ObjectId
		}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});
		this.VoteSet = mongoose.model('VoteSet', VoteSetSchema);
	}

	// Album Functions
	this.getAlbum = function(id, res) {
		this.Album.findById(id, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.getAlbums = function(query, res) {
		this.Album.find(query, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.createAlbum = function(body, res) {
		this.Album(body).save(function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.updateAlbum = function(id, body, res) {
		this.Album.findByIdAndUpdate(id, body, {new: true}, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.deleteAlbum = function(id, res) {
		this.Track.deleteMany({album: id}, function(error, output) {
			if (error) {
				res.json(error);
			}
		});
		this.Album.findByIdAndDelete(id, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	// Artist Functions
	this.getArtist = function(id, res) {
		this.Artist.findById(id, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.getArtists = function(query, res) {
		this.Artist.find(query, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.createArtist = function(body, res) {
		this.Artist(body).save(function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.updateArtist = function(id, body, res) {
		this.Artist.findByIdAndUpdate(id, body, {new: true}, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.deleteArtist = function(id, res) {
		this.Artist.findByIdAndDelete(id, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	// Round Functions
	this.getRound = function(id, res) {
		this.Round.findById(id, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.getRounds = function(query, res) {
		this.Round.find(query, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.createRound = function(body, res) {
		this.Round(body).save(function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.updateRound = function(id, body, res) {
		this.Round.findByIdAndUpdate(id, body, {new: true}, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.deleteRound = function(id, res) {
		this.Round.findByIdAndDelete(id, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	// Track Functions
	this.getTrack = function(id, res) {
		this.Track.findById(id, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.getTracks = function(query, res) {
		this.Track.find(query, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.createTrack = function(body, res) {
		this.Track(body).save(function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.updateTrack = function(id, body, res) {
		this.Track.findByIdAndUpdate(id, body, {new: true}, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.deleteTrack = function(id, res) {
		this.Track.findByIdAndDelete(id, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	// Auth Functions
	this.forgotPassword = function(req, res) {
		var token = this.crypto.randomBytes(20).toString('hex');
		this.User.findOneAndUpdate( { name: req.body.name }, { reset_password_token: token }, function(error, user) {
			if (!user) {
				res.status(404).json({message: 'No user found'});
			}
		}).then((user) => {
			this.smtpTransport.sendMail({
				//to: user.email,
				to: 'mattman91@gmail.com',
				from: 'albumgame@betterdataservices.com',
				template: 'forgot-password-email',
				subject: 'Album Game: Reset your password',
				context: {
					url: 'http://localhost:8080/api/v1/resetPassword?token=' + token,
					name: user.name
				},
				dsn: {
					id: 'user._id',
					return: 'headers',
					notify: ['success', 'failure', 'delay'],
					recipient: user.email
				}
			});
		}).then(() => {
			res.json({message: 'Success'});
		}).catch((error) => {
			res.status(500).json(error);
		});
	}

	/*this.resetPassword = function(req, res) {
		if (req.body.password == req.body.verifypassword) {
			var salt = crypto.randomBytes(16).toString('hex');
			var hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex');
			this.User.findOneAndUpdate( { token: req.params.token }, { salt: salt, hash: hash, reset_password_token: null, reset_password_expires: null }, function(error, user) {
				if (error) {
					res.status(500).json(error);
				} else {
					res.json('Success');
				}
			});
		} else {
			res.status(401).json('Password mismatch');
		}
	}*/
/*
	this.loginUser = function (name, password, cb) {
		this.User.findOne({name: name}, function(error, output) {
			if (error) {
				return error;
			} else {
				var hash = crypto.pbkdf2Sync(password, output.salt, 1000, 64, 'sha512').toString('hex');
				if (output.hash === hash) {
					return cb(null, { output }, {message: 'Logged in successfully'});
				} else {
					return cb(null, false, {message: 'Incorrect login info'});
				}
			}	
		})
	}
*/
	this.loginUser = function (name, password, done) {
		this.User.findOne({name: name}, function(error, user) {
			if (error) {
				return done(null, false, error);
			} else {
				var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
				if (user.hash === hash) {
					return done(null, user.toJSON());
				} else {
					return done(null, false, { message: 'Incorrect login info' } );
				}
			}	
		})
	}

	this.verifyUser = function(id) {
		return this.User.findById(id);
	}

	this.setPassword = function(name, password, res) {
		salt = crypto.randomBytes(16).toString('hex');
		hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
		this.User.findOneAndUpdate({name: name}, {salt: salt, hash: hash}, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.status(200).json( { message: 'Success' } );
			}
		});
	};

	// User Functions
	this.getUser = function(id, res) {
		this.User.findById(id, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.getUsers = function(query, res) {
		this.User.find(query, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.createUser = function(body, res) {
		this.User(body).save(function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.updateUser = function(id, body, res) {
		this.User.findByIdAndUpdate(id, body, {new: true}, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.deleteUser = function(id, res) {
		this.User.findByIdAndDelete(id, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	// VoteSet Functions
	this.getVoteSet = function(id, res) {
		this.VoteSet.findById(id, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.getVoteSets = function(query, res) {
		this.VoteSet.find(query, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.createVoteSet = function(body, res) {
		this.VoteSet(body).save(function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.updateVoteSet = function(id, body, res) {
		this.VoteSet.findByIdAndUpdate(id, body, {new: true}, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}

	this.deleteVoteSet = function(id, res) {
		this.VoteSet.findByIdAndDelete(id, function(error, output) {
			if (error) {
				res.json(error);
			} else {
				res.json(output);
			}
		});
	}
	
}

module.exports = Factory;
