const { BlogPost } = require('./BlogPost');
const { Comment } = require('./Comment');
const sequelize = require('../config/connection');

BlogPost.hasMany(Comment, {
    foreignKey:'blogpost_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(BlogPost, {
    foreignKey: 'blogpost_id',
});

module.exports = { BlogPost, Comment, sequelize };
