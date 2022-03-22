import { Injectable } from '@nestjs/common'
import { PostModel } from './post.model'
import { InjectModel } from '~/transformers/model.transformer'

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel) public readonly model: MongooseModel<PostModel>,
  ) {}
}
