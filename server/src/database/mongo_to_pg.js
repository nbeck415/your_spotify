const mongo = require('./');
const { User, Album, Artist, Infos, Track } = require('./Schemas');
const pg = require('./new_queries');

async function addArtists() {
  const artists = await Artist.find();
  return Promise.all(artists.map(async art => {
    art = art.toJSON();
    delete art.__v;
    delete art._id;
    delete art.genres;
    try {
      await pg.createArtist(art);
    } catch (e) {
      console.log(e, JSON.stringify(art, null, ' '));
    }
  }));
}

async function addAlbums() {
  const albums = await Album.find().populate('artist');
  return Promise.all(albums.map(async alb => {
    alb = alb.toObject();
    delete alb.__v;
    delete alb._id;
    delete alb.genres;
    alb.artists = alb.artist;
    delete alb.artist;
    try {
      await pg.createAlbum(alb);
    } catch (e) {
      console.log(alb, e);
    }
  }));
}

async function addTracks() {
  const tracks = await Track.find().populate('full_album full_artist');
  return Promise.all(tracks.map(async track => {
    track = track.toObject();
    delete track.__v;
    delete track._id;
    track.artists = track.full_artist;
    delete track.full_artist;
    track.album = track.full_album;
    delete track.full_album;
    try {
      await pg.createTrack(track);
    } catch (e) {
      console.log(track, e);
    }
  }));
}

async function addUsers() {
  const users = await User.find().populate('tracks');
  return Promise.all(users.map(async user => {
    user = user.toJSON();
    delete user._id;
    delete user.__v;
    user.expires_at = new Date(user.expiresIn);
    delete user.expiresIn;
    user.last_timestamp = new Date(user.lastTimestamp);
    delete user.lastTimestamp;
    user.spotify_id = user.spotifyId;
    delete user.spotifyId;
    user.access_token = user.accessToken;
    delete user.accessToken;
    user.refresh_token = user.refreshToken;
    delete user.refreshToken;
    user.history_line = user.settings.historyLine;
    user.preferred_stats_period = user.settings.preferredStatsPeriod;
    delete user.settings;
    const history = user.tracks;
    delete user.tracks;
    delete user.id;
    let newUser;
    try {
      newUser = await pg.createUserObj(user);
    } catch (e) {
      console.log(e, user);
    }
    await Promise.all(history.map(async hist => {
      const newHist = {
        listened_at: hist.played_at,
        user_id: newUser.id,
        track_id: hist.id,
      };
      try {
        await pg.addHistory(newHist.user_id, newHist.track, newHist.listened_at);
      } catch (e) {
        console.log(hist, e);
      }
    }))
  }));
}

async function main() {
  await mongo.connect();
  console.log('Starting migration...');
  const start = new Date();
  await addArtists();
  console.log('Added artists');
  await addAlbums();
  console.log('Added albums');
  await addTracks();
  console.log('Added tracks');
  await addUsers();
  const end = new Date();
  console.log('Added users');
  console.log(`Finished in ${end.getTime() - start.getTime()}ms`);
}

main();
