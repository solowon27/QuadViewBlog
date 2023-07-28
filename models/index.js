const User = require('./Users');
const Blogs = require('./Blogs');
const Comment = require('./Comment');

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
  foreignKey: 'blog_id',
});

Comment.belongsTo(Blogs, {
  foreignKey: 'blog_id',
});

module.exports = { User, Blogs, Comment };
