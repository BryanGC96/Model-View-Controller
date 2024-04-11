const  BlogPost  = require('../models/BlogPost');
const  Comment  = require('../models/Comment');
const  User  = require('../models/User');
const sequelize = require('../config/connection');

console.log(User);

User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

BlogPost.hasMany(Comment, {
    foreignKey:'blogpost_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(BlogPost, {
    foreignKey: 'blogpost_id',
});

module.exports = { BlogPost, Comment, User, sequelize };
