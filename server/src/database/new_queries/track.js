const { Track, ArtistTrack } = require('../core/relations');

async function createTrack(spotifyTrack) {
  spotifyTrack.album_id = spotifyTrack.album.id;
  delete spotifyTrack.album;

  const artists = spotifyTrack.artists;
  delete spotifyTrack.artists;
  delete spotifyTrack.external_ids;
  delete spotifyTrack.available_markets;
  spotifyTrack.external_url = spotifyTrack.external_urls.spotify;
  delete spotifyTrack.external_urls;

  const track = await Track.query().insert(spotifyTrack);
  await ArtistTrack.query().insert(artists.map(art => ({
    artist_id: art.id,
    track_id: spotifyTrack.id,
  }))).returning('*');
  return track;
}

function getTrack(trackId, populate = '') {
  return Track.query().findById(trackId).withGraphFetched(populate);
}

module.exports = {
  createTrack,
  getTrack,
};
