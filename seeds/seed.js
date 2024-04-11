const sequelize = require('../config/connection');
const { User, Comment, BlogPost } = require('../models');

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
        const randomUserId = users[Math.floor(Math.random() * users.length)].id;
        const randomBlogPostId = blogPosts[Math.floor(Math.random() * blogPosts.length)].id;

        const newComment = await Comment.create({
            ...comment,
            user_id: randomUserId,
            blogpost_id: randomBlogPostId,
        });

        return newComment;
    }));

    process.exit(0);
};

seedDatabase();