import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-rent-apts-key'

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}

export function isAuthenticated(req: NextRequest) {
  const token = req.cookies.get('adminToken')?.value || ''
  const decoded = verifyToken(token)
  return !!decoded
}
