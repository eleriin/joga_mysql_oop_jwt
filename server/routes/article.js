const express = require('express');
const ArticleController = require('../controllers/article');
const { authRequired, roleRequired }= require ('../utils/auth')

class ArticleRouter {
    constructor() {
        this.router = express.Router();
        this.controller = ArticleController;

        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/', this.controller.getAllArticles);
        this.router.get('/article/:slug', this.controller.getArticleBySlug);

        this.router.post('/article/create', authRequired, roleRequired('admin'), this.controller.createArticle);
        this.router.put('/article/edit/:id', authRequired, roleRequired('admin'), this.controller.updateArticle);
        this.router.delete('/article/delete/:id', authRequired,roleRequired('admin'), this.controller.deleteArticle);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new ArticleRouter().getRouter();