import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Public } from '@/decorators/public';
import { LocalAuthGuard } from '@/modules/auth/local-auth.guard';
import { ResponseMessage } from '@/decorators/message';
import { Request, Response } from 'express';
import { DUser } from '@/decorators/user';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { UserService } from '@/modules/user/user.service';
import { AuthService } from '@/modules/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signin')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('Đăng nhập thành công')
  signin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.signin(req.user as UserByAccessToken, res);
  }

  @Post('signout')
  @ResponseMessage('Đăng xuất thành công')
  signout(
    @DUser() user: UserByAccessToken,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signout(user as UserByAccessToken, res);
  }

  @Post('signup')
  @Public()
  @ResponseMessage('Đăng ký thành công')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Get('account')
  @ResponseMessage('Lấy thông tin tài khoản thành công')
  getProfile(@DUser() user: UserByAccessToken) {
    return this.userService.findOne(user.id);
  }

  @Get('refresh')
  @Public()
  @ResponseMessage('Lấy access token mới thành công')
  refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    return this.authService.createAccessTokenByRefreshToken(refreshToken, res);
  }
}
