import { validate } from "../schemas/validate.schema.js"
import articleSchema from "../schemas/article.schema.js"

export default new class ArticleValidation {
	constructor() {
		this.articleSchema = articleSchema
	}

	createArticle = (req, res, next) => {
		try {
			req.body = validate(this.articleSchema.createArticle(), req.body)
			next()
		} catch (error) {
			next(error)
		}
	}

	updateArticle = (req, res, next) => {
		try {
			req.body = validate(this.articleSchema.updateArticle(), req.body)
			next()
		} catch (error) {
			next(error)
		}
	}
}