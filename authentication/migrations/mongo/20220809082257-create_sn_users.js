module.exports = {
  async up(db, client) {
    await db.collection('authentication').updateOne(
      { refresh_token: 'test' },
      { $set: { access_token: 'test' } }
    );
  },

  async down(db, client) {
    await db.collection('authentication').updateOne(
      { refresh_token: 'test' },
      { $set: { access_token: '' } }
    );
  }
};
