import { Global, Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { MONGO_DB } from '~/app.config'
import { UserModel } from '../../modules/user/user.model'
import { DatabaseService } from './database.service'

const models = TypegooseModule.forFeature([UserModel])
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory: () => ({
        uri: MONGO_DB.uri,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      }),
    }),
    models,
  ],
  providers: [DatabaseService],
  exports: [models, DatabaseService],
})
@Global()
export class DbModule {}
