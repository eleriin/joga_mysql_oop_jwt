const ArticleModel = require('../models/article');

class ArticleController {

    constructor() {
        this.model = ArticleModel;
        this.getAllArticles = this.getAllArticles.bind(this);
        this.getArticleBySlug = this.getArticleBySlug.bind(this);
        this.createArticle = this.createArticle.bind(this);
        this.updateArticle = this.updateArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
    }

    async getAllArticles(req, res) {
        try {
            const articles = await this.model.findAll();
            res.status(201).json({articles: articles});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getArticleBySlug(req, res) {
        try {
            const article = await this.model.findOne(req.params.slug);
            if (article) {
                res.status(201).json({ article: article });
            } else {
                res.status(404).json({ error: 'Article not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createArticle(req, res) { 
        try {
            const newArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: req.body.author_id
            }
            const articleId = await this.model.create(newArticle);
            res.status(201).json({ id: articleId, ...newArticle });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateArticle(req, res) {
        try {
            const articleId = req.params.id;
            const updatedArticle = {
                name: req.body.name,
                slug: req.body.slug,
                image: req.body.image,
                body: req.body.body,
                published: new Date().toISOString().slice(0, 19).replace('T', ' '),
                author_id: req.body.author_id
            }
            const affectedRows = await this.model.update(articleId, updatedArticle);
            if (affectedRows > 0) {
                res.status(200).json({ id: articleId, ...updatedArticle });
            } else {
                res.status(404).json({ error: 'Article not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteArticle(req, res) {
        try {
            const articleId = req.params.id;
            const affectedRows = await this.model.delete(articleId);
            if (affectedRows > 0) {
                res.status(200).json({ message: 'Article deleted successfully' });
            } else {
                res.status(404).json({ error: 'Article not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = new ArticleController();