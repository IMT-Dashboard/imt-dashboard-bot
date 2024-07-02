import jwt, { JwtPayload } from 'jsonwebtoken';

export function getUsernameFromJWT(authToken: string): string | null {
  if (!authToken) return null;

  const decoded = jwt.decode(authToken) as JwtPayload;
  return decoded ? decoded.username : null;
}
