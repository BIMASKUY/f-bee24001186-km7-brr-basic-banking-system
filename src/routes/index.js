import { Router } from 'express'
import userRoutes from './user.route.js'
import accountRoutes from './account.route.js'
import transactionRoutes from './transaction.route.js'
import authRoutes from './auth.route.js'
import articleRoutes from './article.route.js'
import authMiddlewares from '../middleware/auth.middleware.js'

export default new class AppRouter {
  constructor() {
    this.router = Router()
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.use('/users', userRoutes.getRouter())
    this.router.use('/accounts', authMiddlewares.loggedIn, accountRoutes.getRouter())
    this.router.use('/transactions', authMiddlewares.loggedIn, transactionRoutes.getRouter())
    this.router.use('/auth', authMiddlewares.guest, authRoutes.getRouter())
    this.router.use('/articles', articleRoutes.getRouter())
  }

  getRouter() {
    return this.router
  }
}