const { History } = require('../core/relations');

function addHistory(userId, trackId, listenedAt) {
  return History.query().insert({
    user_id: userId,
    track_id: trackId,
    listened_at: listenedAt,
  });
}

module.exports = {
  addHistory,
};
