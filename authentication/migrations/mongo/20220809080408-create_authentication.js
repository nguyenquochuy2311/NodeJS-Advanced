module.exports = {
  async up(db) {
    await db.collection('authentication').updateOne({ refresh_token: 'test' }, { $set: { access_token: 'test' } });
  },

  async down(db) {
    await db.collection('authentication').updateOne({ refresh_token: 'test' }, { $set: { access_token: '' } });
  },
};