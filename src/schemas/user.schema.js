import Joi from "joi"

export default new class UserSchema {
  constructor() {
    this.userSchema = Joi.object({
      name: Joi.string().required().max(255),
      email: Joi.string().required().max(255),
      password: Joi.string().required().max(255),
      identityType: Joi.string().required().max(255),
      identityNumber: Joi.string().required().max(255),
      address: Joi.string().required().max(255)
    })
  }

  createUser() {
    return this.userSchema
  }

  loginUser() {
    return Joi.object({
      email: this.userSchema.extract('email'),
      password: this.userSchema.extract('password')
    })
  }
}