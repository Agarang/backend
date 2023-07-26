import { AuthGuard } from '@nestjs/passport';

export class JwtLocalGuard extends AuthGuard('jwt-local') {}
