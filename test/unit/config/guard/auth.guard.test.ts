/* Dependencies */
import { Test } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@config/guard/auth.guard";
import { ConfigurationModule } from "@config/configuration/configuration.module";
import { IUser } from "@config/user/user.interface";
import { Reflector } from "@nestjs/core";

/* Common */

interface ExtendedRequest {
  headers: {
    authorization?: string;
  };
  user?: IUser;
}
describe("AuthGuard", () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;
  let reflector: Reflector;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigurationModule],
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
    reflector = module.get(Reflector);
  });

  describe("canActivate", () => {
    it("should throw UnauthorizedException if there is no token", async () => {
      (reflector.getAllAndOverride as jest.Mock).mockReturnValue(false);
      const context = {
        getHandler: () => {},
        getClass: () => {},
        switchToHttp: () => ({
          getRequest: (): ExtendedRequest => ({
            headers: {},
          }),
        }),
      } as unknown as ExecutionContext;

      await expect(authGuard.canActivate(context)).rejects.toThrow(
        UnauthorizedException
      );
    });

    it("should grant access for a valid token", async () => {
      (reflector.getAllAndOverride as jest.Mock).mockReturnValue(false);
      (jwtService.verifyAsync as jest.Mock).mockResolvedValue({
        userId: "B000000",
      });
      const request: ExtendedRequest = {
        headers: {
          authorization: "Bearer validToken",
        },
      };
      const context = {
        getHandler: () => {},
        getClass: () => {},
        switchToHttp: () => ({
          getRequest: () => request,
        }),
      } as unknown as ExecutionContext;

      await expect(authGuard.canActivate(context)).resolves.toBe(true);
      expect(request.user).toBeDefined();
      expect(request.user?.userId).toBe("B000000");
    });

    it("should throw UnauthorizedException for an invalid token", async () => {
      (reflector.getAllAndOverride as jest.Mock).mockReturnValue(false);
      (jwtService.verifyAsync as jest.Mock).mockRejectedValue(
        new Error("Token invalid")
      );
      const context = {
        getHandler: () => {},
        getClass: () => {},
        switchToHttp: () => ({
          getRequest: (): ExtendedRequest => ({
            headers: {
              authorization: "Bearer invalidToken",
            },
          }),
        }),
      } as unknown as ExecutionContext;

      await expect(authGuard.canActivate(context)).rejects.toThrow(
        UnauthorizedException
      );
    });

    it("should return that is a public endpoint", async () => {
      (reflector.getAllAndOverride as jest.Mock).mockReturnValue(true);
      const context = {
        getHandler: () => {},
        getClass: () => {},
        switchToHttp: () => ({
          getRequest: (): ExtendedRequest => ({
            headers: {
              authorization: "Bearer invalidToken",
            },
          }),
        }),
      } as unknown as ExecutionContext;
      const canActivate = await authGuard.canActivate(context);
      expect(canActivate).toBeTruthy();
    });
  });
});
