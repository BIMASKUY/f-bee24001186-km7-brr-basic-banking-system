import Joi from 'joi'

export default new class ArticleSchema {
  constructor() {
    this.articleSchema = Joi.object({
    	title: Joi.string().required().max(255),
    	content: Joi.string().required().max(255)
    })
  }
    
  createArticle() {
    return this.articleSchema
  }
    
  updateArticle() {
    return Joi.object({
    	title: this.articleSchema.extract('title').optional(),
    	content: this.articleSchema.extract('content').optional()
    })
  }
}