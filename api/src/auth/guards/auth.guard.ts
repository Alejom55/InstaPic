import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      return false;
    }
    return this.verifyToken(token);

  }
  extractToken(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') || [];
    if (type && type === 'Bearer') {
      return token;
    }
    return undefined;
  }
  async verifyToken(token: string): Promise<boolean> {
    const client = jwksRsa({
      cache: true,
      rateLimit: true,
      jwksUri: `https://dev-dldijf5dnyno46t1.us.auth0.com/.well-known/jwks.json`,
    });

    const getKey = (header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) => {
      client.getSigningKey(header.kid, (err, key) => {
        if (err) {
          callback(err, null);
        } else {
          const signingKey = key.getPublicKey();
          callback(null, signingKey);
        }
      });
    };

    return new Promise((resolve, reject) => {
      jwt.verify(token, getKey, {
        audience: 'ui77yQ1o4A91tv0OLLbo5Ql5VAclGfo2',
        issuer: `https://dev-dldijf5dnyno46t1.us.auth0.com/`,
        algorithms: ['RS256']
      }, (err, decoded) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }

}
