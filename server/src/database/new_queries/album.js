const { Album, ArtistAlbum } = require('../core/relations');

async function createAlbum(spotifyAlbum) {
  const artists = spotifyAlbum.artists;
  delete spotifyAlbum.artists;
  delete spotifyAlbum.available_markets;
  delete spotifyAlbum.copyrights;
  delete spotifyAlbum.external_ids;
  spotifyAlbum.external_url = spotifyAlbum.external_urls.spotify;
  delete spotifyAlbum.external_urls;
  spotifyAlbum.image = spotifyAlbum.images.length > 0 ? spotifyAlbum.images[0].url : '';
  delete spotifyAlbum.images;
  delete spotifyAlbum.tracks;

  const alb = await Album.query().insert(spotifyAlbum);

  if (artists.length > 0) {
    await ArtistAlbum.query().insert(artists.map(art => ({
      album_id: spotifyAlbum.id,
      artist_id: art.id,
    }))).returning('*');
  }
  return alb;
}

function getAlbum(albumId, populate = '') {
  return Album.query().findById(albumId).withGraphFetched(populate);
}

module.exports = {
  createAlbum,
  getAlbum,
};
