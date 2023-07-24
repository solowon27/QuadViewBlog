const User = require('./users');
const Blogs = require('./blogs');
const Comment = require('./comment');

// Associations between User and BlogPost
User.hasMany(Blogs, {
  foreignKey: 'user_id',
});

Blogs.belongsTo(User, {
  foreignKey: 'user_id',
});

// Associations between User and Comment
User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

// Associations between BlogPost and Comment
Blogs.hasMany(Comment, {
  foreignKey: 'blogs_id',
});

Comment.belongsTo(Blogs, {
  foreignKey: 'blogs_id',
});

module.exports = { User, Blogs, Comment };
