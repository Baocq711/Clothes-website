import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { RoleService } from '@/modules/role/role.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly roleService: RoleService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(
    payload: UserByAccessToken & {
      iat: number;
      exp: number;
    },
  ) {
    const role = await this.roleService.findOne(payload.role.id);
    return { id: payload.id, role };
  }
}
