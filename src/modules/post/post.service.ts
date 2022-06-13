import { Injectable } from '@nestjs/common'

import { InjectModel } from '~/transformers/model.transformer'

import { PostModel } from './post.model'

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel) public readonly model: MongooseModel<PostModel>,
  ) {}
}
