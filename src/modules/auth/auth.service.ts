import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { UserService } from '@/modules/user/user.service';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AxiosError, AxiosResponse } from 'axios';
import { Response } from 'express';
import ms from 'ms';
import { catchError, firstValueFrom, map, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  validateUser = async (username: string, pass: string): Promise<any> => {
    const user = await this.userService.findOneByEmail(username);
    if (user && this.userService.comparePassword(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  };

  signin = async ({ id, role }: UserByAccessToken, res: Response) => {
    const payload = { id, role };

    const refreshToken = await this.createRefreshToken(payload);

    this.userService.updateRefreshToken(id, refreshToken);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: ms(process.env.REFRESH_TOKEN_EXPIRES),
    });

    return {
      access_token: this.jwtService.sign(payload),
    };
  };

  signup = async (createUserDto: CreateUserDto) => {
    return await this.userService.create(createUserDto);
  };

  signout = async (user: UserByAccessToken, res: Response) => {
    this.userService.updateRefreshToken(user.id, null);
    res.clearCookie('refresh_token');
  };

  createRefreshToken = async (payload: UserByAccessToken) => {
    return this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    });
  };

  createAccessTokenByRefreshToken = async (
    refreshToken: string,
    res: Response,
  ): Promise<{ access_token: string }> => {
    const payload: UserByAccessToken = await this.jwtService
      .verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      })
      .catch(() => null);

    if (!payload) {
      throw new BadRequestException('Refresh token không hợp lệ');
    }

    const user = this.userService.findOneByRefreshToken(refreshToken);
    if (!user) {
      throw new BadRequestException('Refresh token không hợp lệ');
    }

    return this.signin(payload, res);
  };
}
