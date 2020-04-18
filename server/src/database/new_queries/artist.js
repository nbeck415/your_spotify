const { Artist } = require('../core/relations');

function createArtist(spotifyArtist) {
  spotifyArtist.followers = spotifyArtist.followers.total;
  spotifyArtist.external_url = spotifyArtist.external_urls.spotify;
  delete spotifyArtist.external_urls;
  spotifyArtist.image = spotifyArtist.images.length > 0 ? spotifyArtist.images[0].url : '';
  delete spotifyArtist.images;
  return Artist.query().insert(spotifyArtist);
}

function getArtist(artistId, populate = '') {
  return Artist.query().findById(artistId).withGraphFetched(populate);
}

module.exports = {
  createArtist,
  getArtist,
};
