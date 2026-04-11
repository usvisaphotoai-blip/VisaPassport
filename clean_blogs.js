const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'blog-posts.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
let posts = JSON.parse(rawData);

posts = posts.map(post => {
    // Cut off the content at the FAQ section
    const faqIndex = post.content.indexOf('<h2>Frequently Asked Questions</h2>');
    if (faqIndex !== -1) {
        post.content = post.content.substring(0, faqIndex);
    }
    return post;
});

fs.writeFileSync(dataPath, JSON.stringify(posts, null, 4), 'utf8');
console.log('Cleaned 9 blog posts of duplicate FAQ content.');
