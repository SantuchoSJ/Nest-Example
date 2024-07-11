/* Dependencies */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Reflector } from "@nestjs/core";

/* Config */
import { ConfigurationService } from "@config/configuration/configuration.service";
import { IS_PUBLIC_KEY } from "@config/guard/is-public.decorator";

/**
 * `AuthGuard` is a class that implements `CanActivate`.
 * It provides methods to validate JWT tokens and authorize requests.
 *
 * @class
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * Creates an instance of `AuthGuard`.
   *
   * @param {JwtService} jwtService - The service for handling JWT tokens.
   * @param {ConfigurationService} configService - The service for handling configuration.
   * @param reflector
   */
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigurationService,
    private reflector: Reflector
  ) {}

  /**
   * Validates the JWT token in the request header and authorizes the request.
   *
   * If the token is not found or is invalid, it throws an `ExtendedError`.
   *
   * @param {ExecutionContext} context - The execution context.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the request is authorized, or throws an `ExtendedError` if the request is not authorized.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException("Token must be provided");
    }
    try {
      request.user = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get("jwtSecret"),
      });
    } catch {
      throw new UnauthorizedException("Token is not valid");
    }
    return true;
  }

  /**
   * Extracts the JWT token from the request header.
   *
   * @param {Request} request - The request.
   * @returns {string | undefined} - The JWT token if it exists, or `undefined` if it does not exist.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
