import authService from '../auth.service.js'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
}))

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('generateToken', () => {
    it('should return a token', () => {
      const user = { id: 1 }
      const mockToken = 'mockToken'
      jwt.sign.mockReturnValue(mockToken)

      const token = authService.generateToken(user)
      expect(token).toBe(mockToken)
    })
  })
})