const { BlogPost } = require('./BlogPost');
const { Comment } = require('./Comment');
const { User } = require('./User');
const sequelize = require('../config/connection');

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
