import { prismaClient } from "../db/prisma.js"
import imagekit from "../configs/imagekit.config.js"
import { encodedFileToBase64, encodedFileName } from "../utils/article.util.js"

export default new class ArticleService {
  async getArticles() {
	  return prismaClient.article.findMany({
			include: {
				author: true
			}
		})
  }

	async getArticleById(articleId) {
		return prismaClient.article.findUnique({
			where: {
				id: articleId
			},
			include: {
				author: true
			}
		})
	}

	async updateArticleWithImage(request, reqImage, articleId, userId) {
		await this.deleteImageByArticleId(articleId)
		const image = await this.uploadImage(reqImage, userId)

		return prismaClient.article.update({
			where: {
				id: articleId
			},
			data: {
				title: request.title,
				content: request.content,
				imageId: image.fileId
			},
			include: {
				author: true
			}
		})
	}

	async updateArticleWithoutImage(request, articleId) {
		return prismaClient.article.update({
			where: {
				id: articleId
			},
			data: {
				title: request.title,
				content: request.content,
			},
			include: {
				author: true
			}
		})
	}

	async uploadImage(image, userId) {
		return imagekit.upload({
			file : encodedFileToBase64(image),
			fileName : encodedFileName(image.originalname, userId),
			useUniqueFileName : false,
			folder: '/articles',
			isPublished: true
		})
	}

	async getImageById(imageId) {
		return imagekit.getFileDetails(imageId)
	}

	async deleteImageByArticleId(articleId) {
		const article = await this.getArticleById(articleId)
		return imagekit.deleteFile(article.imageId)
	}

	async createArticle(request, imageId, userId) {
		return prismaClient.article.create({
			data: {
				title: request.title,
				content: request.content,
				imageId: imageId,
				authorId: userId
			},
			include: {
				author: true
			}
		})
	}

	async deleteArticleById(articleId) {
		await this.deleteImageByArticleId(articleId)
		return prismaClient.article.delete({
			where: {
				id: articleId
			}
		})
	}
}