import { Router } from 'express'
import articleController from '../controllers/article.controller.js'
import multer from 'multer'
import authMiddlewares from '../middleware/auth.middleware.js'
import articleValidation from '../validations/article.validation.js'

export default new class ArticleRoutes {
  constructor() {
    this.router = Router()
		this.upload = multer()
    this.articleController = articleController
		this.authMiddlewares = authMiddlewares

    this.articleValidation = articleValidation
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.get('/', this.articleController.getArticles)
    this.router.post('/', this.authMiddlewares.loggedIn, this.upload.single('image'), this.articleValidation.createArticle, this.articleController.createArticle)
    this.router.get('/:id', this.articleController.getArticleById)
    this.router.patch('/:id', this.authMiddlewares.loggedIn, this.upload.single('image'), this.articleValidation.updateArticle, this.articleController.updateArticle)
    this.router.delete('/:id', this.authMiddlewares.loggedIn, this.articleController.deleteArticle)
  }

  getRouter() {
    return this.router
  }
}