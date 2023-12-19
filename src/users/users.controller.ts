import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ArticlesService } from 'src/articles/articles.service';
import { UsersService } from './users.service';
import { UserModel } from 'src/dtos/user.dto';
import { ArticleModel } from 'src/dtos/article.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private articlesService: ArticlesService,
    private usersService: UsersService,
  ) {}

  @Get('me')
  @ApiOperation({ summary: 'Returns current user' })
  @ApiResponse({
    status: 200,
    type: UserModel,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  getProfile(@Req() req) {
    console.log(`[AuthController] getProfile`);
    return this.usersService.findOne(req.user.email);
  }

  @Get('me/articles')
  @ApiOperation({ summary: "Returns current user's articles" })
  @ApiResponse({
    status: 200,
    type: ArticleModel,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  getMyArticles(@Req() req) {
    console.log(`[ArticlesController] getMyArticles`, req.user.email);
    return this.articlesService.findByOwnerEmail(req.user.email);
  }
}
