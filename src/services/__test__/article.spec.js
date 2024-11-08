import articleService from '../article.service.js'
import { prismaClient } from '../../db/prisma.js'
import ImageKit from 'imagekit'

jest.mock('../../db/prisma.js', () => ({
  prismaClient: {
    article: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
      delete: jest.fn()
    }
  }
}))

jest.mock('imagekit', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getFileDetails: jest.fn().mockResolvedValue({}),
      deleteFile: jest.fn().mockResolvedValue({}),
      upload: jest.fn().mockResolvedValue({ fileId: 'mockFileId' })
    }
  })
})

describe('ArticleService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('get articles', () => {
    it('should get all articles', async () => {
      const articles = [
        { id: 1, title: 'Article 1', content: 'Content 1', author: { id: 1, name: 'Author 1' } },
        { id: 2, title: 'Article 2', content: 'Content 2', author: { id: 2, name: 'Author 2' } }
      ]

      prismaClient.article.findMany.mockResolvedValue(articles)
      const response = await articleService.getArticles()
      expect(response).toEqual(articles)
    })
  })

  describe('get article by id', () => {
    it('should get an article by id', async () => {
      const article = { id: 1, title: 'Article 1', content: 'Content 1', author: { id: 1, name: 'Author 1' } }

      prismaClient.article.findUnique.mockResolvedValueOnce(article)
      const response = await articleService.getArticleById(1)
      expect(response).toEqual(article)
    })

    it('should return null if article not found', async () => {
      prismaClient.article.findUnique.mockResolvedValue(null)
      const response = await articleService.getArticleById(2)
      expect(response).toBeNull()
    })
  })

  describe('create article', () => {
    it('should create an article', async () => {
      const request = { title: 'New Article', content: 'New Content' }
      const imageId = 'image123'
      const userId = 1

      prismaClient.article.create.mockImplementation(({ data }) => ({
        id: 1,
        title: data.title,
        content: data.content,
        imageId: data.imageId,
        authorId: data.authorId,
        author: { id: data.authorId, name: 'Author 1' }
      }))

      const response = await articleService.createArticle(request, imageId, userId)
      const expectedResponse = {
        id: 1,
        title: 'New Article',
        content: 'New Content',
        imageId: 'image123',
        authorId: 1,
        author: { id: 1, name: 'Author 1' }
      }
      expect(response).toEqual(expectedResponse)
    })
  })

  describe('update article with image', () => {
    it('should update an article with a new image', async () => {
      const request = { title: 'Updated Title', content: 'Updated Content' }
      const reqImage = { originalname: 'image.jpg' }
      const articleId = 1
      const userId = 1

      articleService.deleteImageByArticleId = jest.fn()
      articleService.uploadImage = jest.fn().mockResolvedValue({ fileId: 'newImageId' })

      prismaClient.article.update.mockImplementation(({ data }) => ({
        id: articleId,
        title: data.title,
        content: data.content,
        imageId: data.imageId,
        author: { id: userId, name: 'Author 1' }
      }))

      const response = await articleService.updateArticleWithImage(request, reqImage, articleId, userId)
      const expectedResponse = {
        id: articleId,
        title: 'Updated Title',
        content: 'Updated Content',
        imageId: 'newImageId',
        author: { id: userId, name: 'Author 1' }
      }
      expect(response).toEqual(expectedResponse)
    })
  })

  describe('delete article by id', () => {
    it('should delete an article by id', async () => {
      const articleId = 1

      articleService.deleteImageByArticleId = jest.fn()
      prismaClient.article.delete.mockResolvedValue({ id: articleId })

      const response = await articleService.deleteArticleById(articleId)
      expect(response).toEqual({ id: articleId })
    })
  })
})
