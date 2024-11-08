import path from 'path'

export const encodedFileName = (imageName, userId) => {
  return `${Date.now()}_${userId}${path.extname(imageName)}`
}

export const encodedFileToBase64 = (file) => {
	return file.buffer.toString('base64')
}

export const formatArticle = (article, imageUrl) => {
  return {
    title: article.title,
    content: article.content,
    imageUrl,
    author: article.author.name
  }
}

export const formatArticles = (articles, images) => {
  const imageUrls = images.map(image => image.url)
  return articles.map((article, index) => formatArticle(article, imageUrls[index]))
}

export const allowedImage = (fileName) => {
  const allowedExtensions = ['.png', '.jpeg', '.jpg']
  const fileExtension = path.extname(fileName).toLowerCase()
  return allowedExtensions.includes(fileExtension)
}