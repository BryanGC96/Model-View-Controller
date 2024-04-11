const  BlogPost  = require('../models/BlogPost');
const  Comment  = require('../models/Comment');
const  User  = require('../models/User');
const sequelize = require('../config/connection');

BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE' 
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE' 
});

Comment.belongsTo(BlogPost, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE' 
});



module.exports = { BlogPost, Comment, User, sequelize };