import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class SignInDto extends createZodDto(SignInSchema) {}

export const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((arg) => arg.password === arg.confirmPassword, {
    message: 'Password and Confirm Password fields must have same value',
  });

export class SignUpDto extends createZodDto(SignUpSchema) {}

export const RefreshTokenSchema = z.object({
  refreshToken: z.string().uuid(),
});

export class RefreshTokenDto extends createZodDto(RefreshTokenSchema) {}

export class ResponseTokens {
  accessToken!: string;
  refreshToken!: string;
}
