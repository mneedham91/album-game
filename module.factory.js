var Factory = function(Schema, mongoose, crypto) {
	this.Schema = Schema;
	this.mongoose = mongoose;
	this.crypto = crypto;
	
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
			password: String,
			username: String
		})
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

	// User Functions
	this.loginUser = function(name, password) {
		return this.User.findOne({name: name, password: password});
	}

	this.verifyUser = function(id) {
		return this.User.findById(id);
	}

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
