export type JwtPayload = {
  sub: string;
  email: string;
  iat: bigint;
  ext: bigint;
}