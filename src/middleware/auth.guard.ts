import { Request } from 'express'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'

export interface IQuery {
  user?: User
}

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest()

    const query: IQuery = {}
    req.params.query = query as any

    const userName = req.query.me as string

    if (!userName) {
      return false
    }

    const user = query.user = await this.usersService.findByName(userName)

    return !!user
  }
}
