const ArticleModel = require('../models/article');
const AuthorModel = require('../models/author');

class AuthorController {

    constructor() {
        this.model = AuthorModel;
        this.getAuthorById = this.getAuthorById.bind(this);
    }

    async getAuthorById(req, res) {
        try {
            const author = await this.model.findById(req.params.id);
            if (author) {
                const articles = await ArticleModel.findMany(author);
                author.articles = articles;
                res.status(201).json({ author: author });
            } else {
                res.status(404).json({ error: 'Author not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = new AuthorController();