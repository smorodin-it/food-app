import { z } from 'zod';

export const tokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().uuid(),
});

export type TokensModel = z.infer<typeof tokensSchema>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInModel = z.infer<typeof signInSchema>;

export const refreshTokenSchema = z.object({
  refreshToken: z.string().uuid(),
});

export type RefreshTokenModel = z.infer<typeof refreshTokenSchema>;

export const tokenPayloadSchema = z.object({
  id: z.string().uuid(),
  iat: z.number(),
  exp: z.number(),
});

export type TokenPayloadModel = z.infer<typeof tokenPayloadSchema>;
