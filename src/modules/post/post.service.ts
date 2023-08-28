import { Injectable } from '@nestjs/common'

import { DatabaseService } from '~/processors/database/database.service'

import { PostInputSchema } from './post.protect'

@Injectable()
export class PostService {
  constructor(private readonly db: DatabaseService) {}

  create(dto: PostInputSchema) {
    return this.db.prisma.post.create({
      data: {
        ...dto,
      },
    })
  }
}
