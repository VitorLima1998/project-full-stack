exports.getUsers = (req, res, next) => {
  console.log('show users');
  res.json([{ id: 1, name: 'Admin' }]);
};
