import { ResponseError } from '../error/response.error.js'
import { formatArticle, formatArticles, allowedImage } from '../utils/article.util.js'
import articleService from '../services/article.service.js'

export default new class ArticleController {
  constructor() {
    this.articleService = articleService
  }

  getArticles = async (req, res, next) => {
    try {
      const articles = await this.articleService.getArticles()
			const images = await Promise.all(articles.map(article => this.articleService.getImageById(article.imageId)))
      const formattedArticles = formatArticles(articles, images)
      res.status(200).json({
        success: true,
        message: 'Berhasil mendapatkan semua artikel',
        data: formattedArticles
      })
    } catch (e) {
      next(e)
    }
  }

	createArticle = async (req, res, next) => {
		try {
			if (!req.file) throw new ResponseError(400, 'Gambar harus diisi')
			if (req.file.size > 2 * 1024 * 1024) throw new ResponseError(400, 'Ukuran gambar harus kurang dari 2 MB')

			const isAllowedImage = allowedImage(req.file.originalname)
			if (!isAllowedImage) throw new ResponseError(400, 'Format gambar yang diperbolehkan adalah .png, .jpeg, .jpg')

			const image = await this.articleService.uploadImage(req.file, req.userId)
			const article = await this.articleService.createArticle(req.body, image.fileId, req.userId)
			const formattedArticle = formatArticle(article, image.url)
			res.status(201).json({
				success: true,
				message: 'Berhasil membuat artikel',
				data: formattedArticle
			})
		} catch (e) {
			next(e)
		}
	}

	getArticleById = async (req, res, next) => {
		try {
			const articleId = parseInt(req.params.id)
			const article = await this.articleService.getArticleById(articleId)
			if (!article) throw new ResponseError(404, 'Artikel tidak ditemukan')

			const image = await this.articleService.getImageById(article.imageId)
			const formattedArticle = formatArticle(article, image.url)
			res.status(200).json({
				success: true,
				message: 'Berhasil mendapatkan artikel',
				data: formattedArticle
			})
		} catch (e) {
			next(e)
		}
	}

	updateArticle = async (req, res, next) => {
		try {
			const articleId = parseInt(req.params.id)
			const article = await this.articleService.getArticleById(articleId)
			if (!article) throw new ResponseError(404, 'Artikel tidak ditemukan')
			if (article.authorId !== req.userId) throw new ResponseError(403, 'Tidak memiliki akses untuk mengupdate artikel ini')

			if (!req.body.title) req.body.title = article.title
			if (!req.body.content) req.body.content = article.content

			if (req.file) {
				if (req.file.size > 2 * 1024 * 1024) throw new ResponseError(400, 'Ukuran gambar harus kurang dari 2 MB')
				const isAllowedImage = allowedImage(req.file.originalname)
				if (!isAllowedImage) throw new ResponseError(400, 'Format gambar yang diperbolehkan adalah .png, .jpeg, .jpg')
			}

			let updatedArticle
			if (req.file) updatedArticle = await this.articleService.updateArticleWithImage(req.body, req.file, articleId, req.userId)
			else updatedArticle = await this.articleService.updateArticleWithoutImage(req.body, articleId)
		
			const image = await this.articleService.getImageById(updatedArticle.imageId)
			const formattedArticle = formatArticle(updatedArticle, image.url)
		
			res.status(200).json({
				success: true,
				message: 'Berhasil memperbarui artikel',
				data: formattedArticle
			})
		} catch (e) {
			next(e)
		}
	}

	deleteArticle = async (req, res, next) => {
		try {
			const articleId = parseInt(req.params.id)
			const article = await this.articleService.getArticleById(articleId)
			if (!article) throw new ResponseError(404, 'Artikel tidak ditemukan')
			if (article.authorId !== req.userId) throw new ResponseError(403, 'Tidak memiliki akses untuk menghapus artikel ini')

			await this.articleService.deleteArticleById(articleId)
			res.status(200).json({
				success: true,
				message: 'Berhasil menghapus artikel',
				data: {}
			})
		} catch (e) {
			next(e)
		}
	}
}