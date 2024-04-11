const sequelize = require('../config/connection');
const { BlogPost, Comment, User } = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');
const blogPostData = require('./blogPostData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const blogPosts = await BlogPost.bulkCreate(blogPostData);

    for (const blogPost of blogPosts) {
        const randomUserId = users[Math.floor(Math.random() * users.length)].id;
        await blogPost.setUser(randomUserId);
    }

    const comments = await Promise.all(commentData.map(async (comment) => {
        // Get the ID of the blog post the comment will be associated with
        const blogPostId = comment.blogpost_id;
    
        // Get the ID of the user who makes the comment
        const userIdOfCommenter = comment.user_id;
    
        // Create the comment with the specified blog post and user IDs
        const newComment = await Comment.create({
            ...comment,
            user_id: userIdOfCommenter, // Set the user_id to the ID of the commenter
            blogpost_id: blogPostId,
        });
    
        return newComment;
    }));
    
    process.exit(0);
};

seedDatabase();