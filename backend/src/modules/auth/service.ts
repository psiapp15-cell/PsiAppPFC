import { prisma } from '../../shared/prisma/prismaClient';
import { AppError } from '../../shared/errors/AppError';
import { comparePassword, hashPassword } from '../../shared/utils/password';
import { signAccessToken, signRefreshToken, verifyToken } from '../../shared/utils/jwt';
import type { LoginInput, RegisterInput } from './schemas';

export async function register(input: RegisterInput) {
  const exists = await prisma.user.findFirst({
    where: { email: input.email, tenantId: input.tenantId },
  });
  if (exists) {
    throw new AppError(409, 'E-mail já cadastrado neste tenant.');
  }

  const passwordHash = await hashPassword(input.password);
  const user = await prisma.user.create({
    data: {
      tenantId: input.tenantId,
      name: input.name,
      email: input.email,
      passwordHash,
      role: input.role,
    },
    select: { id: true, name: true, email: true, role: true, tenantId: true },
  });

  return user;
}

export async function me(tenantId: string, userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId, tenantId },
    select: { id: true, name: true, email: true, role: true, tenantId: true },
  });
  if (!user) throw new AppError(404, 'Usuário não encontrado.');
  return user;
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findFirst({ where: { email: input.email } });
  // TODO: filtrar também por tenantId quando tiver multi-tenant de verdade
  if (!user) {
    throw new AppError(401, 'Credenciais inválidas.');
  }

  const ok = await comparePassword(input.password, user.passwordHash);
  if (!ok) {
    throw new AppError(401, 'Credenciais inválidas.');
  }

  const payload = { sub: user.id, role: user.role, tenantId: user.tenantId };
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    },
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
  };
}

export function refresh(refreshToken: string) {
  let payload;
  try {
    payload = verifyToken(refreshToken);
  } catch {
    throw new AppError(401, 'Refresh token inválido ou expirado.');
  }
  const next = { sub: payload.sub, role: payload.role, tenantId: payload.tenantId };
  return {
    accessToken: signAccessToken(next),
    refreshToken: signRefreshToken(next),
  };
}
