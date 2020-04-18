const { Model } = require('./connection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static relationMappings() {
    return {
      history: {
        relation: Model.HasManyRelation,
        modelClass: History,
        join: {
          from: 'users.id',
          to: 'history.user_id',
        },
      },
    };
  }
}

class History extends Model {
  static get tableName() {
    return 'history';
  }

  static relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'history.id',
          to: 'users.id',
        },
      },
      track: {
        relation: Model.HasOneRelation,
        modelClass: Track,
        join: {
          from: 'history.track_id',
          to: 'tracks.id',
        },
      },
    };
  }
}

class Artist extends Model {
  static get tableName() {
    return 'artists';
  }

  static relationMappings() {
    return {
      albums: {
        relation: Model.HasManyRelation,
        modelClass: Album,
        join: {
          from: 'artists.id',
          through: {
            from: 'artists_albums.artist_id',
            to: 'artists_albums.album_id',
          },
          to: 'albums.id',
        },
      },
      tracks: {
        relation: Model.HasManyRelation,
        modelClass: Track,
        join: {
          from: 'artists.id',
          through: {
            from: 'artists_tracks.artist_id',
            to: 'artists_tracks.track_id',
          },
          to: 'tracks.id',
        },
      },
    };
  }
}

class Album extends Model {
  static get tableName() {
    return 'albums';
  }

  static relationMappings() {
    return {
      artists: {
        relation: Model.HasManyRelation,
        modelClass: Album,
        join: {
          from: 'albums.id',
          through: {
            from: 'artists_albums.album_id',
            to: 'artists_albums.artist_id',
          },
          to: 'artists.id',
        },
      },
      tracks: {
        relation: Model.HasManyRelation,
        modelClass: Track,
        join: {
          from: 'albums.id',
          to: 'track.album_id',
        },
      },
    };
  }
}

class Track extends Model {
  static get tableName() {
    return 'tracks';
  }

  static relationMappings() {
    return {
      artists: {
        relation: Model.HasManyRelation,
        modelClass: Artist,
        join: {
          from: 'albums.id',
          through: {
            from: 'artists_albums.album_id',
            to: 'artists_albums.artist_id',
          },
          to: 'artists.id',
        },
      },
      album: {
        relation: Model.BelongsToOneRelation,
        modelClass: Album,
        join: {
          from: 'tracks.album_id',
          to: 'albums.id',
        },
      },
    };
  }
}

class ArtistAlbum extends Model {
  static get tableName() {
    return 'artists_albums';
  }
}

class ArtistTrack extends Model {
  static get tableName() {
    return 'artists_tracks';
  }
}

module.exports = {
  User,
  History,
  Artist,
  Album,
  Track,
  ArtistAlbum,
  ArtistTrack,
}
