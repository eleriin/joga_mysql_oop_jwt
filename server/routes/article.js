const express = require('express');
const ArticleController = require('../controllers/article');
const { requireRole } = require('../utils/auth') 

class ArticleRouter {
    constructor() {
        this.router = express.Router();
        this.controller = ArticleController;

        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/', this.controller.getAllArticles);
        this.router.get('/article/:slug', this.controller.getArticleBySlug);

        this.router.post('/article/create', requireRole('admin'), this.controller.createArticle);
        this.router.put('/article/edit/:id', requireRole('admin'), this.controller.updateArticle);
        this.router.delete('/article/delete/:id', requireRole('admin'), this.controller.deleteArticle);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new ArticleRouter().getRouter();