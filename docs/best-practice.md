# How to new Module

In this section, let's build a simple bussiness module.

Use nest-cli to quickly generate a module.

```bash
nest g modules/good
```

:::info
If don not install nest-cli before, please install it globally.

```bash
npm i -g @nestjs/cli
```

Or, export node_modules/.bin in `$PATH`.

```bash
export PATH="./node_modules/.bin:$PATH"
```

:::

:::tip
Add export `./node_modules/.bin` into env $PATH automatically, add this line into `$HOME/.zshrc` or other shell profile you like.

```bash
export PATH="./node_modules/.bin:$PATH"
```

:::

Do above command, nest-cli will generate a folder in modules, named good, and create a file named good.module.ts, The GoodModule will be imported in `app.module.ts` imports scope.

```ts
// app.module.ts
@Module({
  imports: [
    DbModule,
    HelperModule,
    LoggerModule,

    // 业务模块
    GoodModule, // <-- new module
  ],
  controllers: [AppController],
  providers: [
    // ...
  ],
})
export class AppModule {}
```

In NestJS, a module wraps controllers, providers. So, should create a new file named `good.controller.ts` and write api in this file. Also, use nestjs-cli to create this file quickly.

```bash
nest g co modules/good --no-spec
```

And create a service for this controller, the responsibility of a service is to manipulate a database, aggregating methods of manipulating data.

```bash
nest g s modules/good --no-spec
```

After above all command executed, Good.module.ts will become like this.

```ts
@Module({
  controllers: [GoodController],
  providers: [GoodService],
})
export class GoodModule {}
```

We also need database model for good, so create file named as `good.model.ts` to define this model. In this project, we use [Typegoose](https://typegoose.github.io/typegoose/docs/guides/quick-start-guide) to define model, it is a "wrapper" for easily writing Mongoose models with TypeScript.

```ts
export class GoodModel extends BaseModel {
  @prop()
  name: string
}
```

A model definition always extends from BaseModel. Finish define model, don't forgot register this model in DatabaseModule. Add this.

```ts
// src/processors/database/database.module.ts
// ...

const models = TypegooseModule.forFeature([
  ApplicationModel,
  BusinessModel,
  ComponentModel,
  FlagModel,
  RuleModel,
  SceneModel,
  TemplateModel,
  GoodModel, // <----------- add this

  ErrorRecordModel,
  ErrorStatusModel,
])
/// ...
```

Ok, you can use this model in service now, open `good.service.ts` and inject this model.

:::note
In NestJS application, all modules including controllers and providers is singleton default and managed by nest framework. So if want to use providers, must inject provide first.
:::

```ts
// good.service.ts
import { InjectModel } from 'nestjs-typegoose'

@Injectable()
export class GoodService {
  constructor(
    @InjectModel(GoodModel)
    private readonly goodModel: MongooseModel<GoodModel>,
  ) {}
}
```

After, use this service in controller.

```ts
// good.controller.ts
@Controller(['goods', 'database/goods'])
export class RuleController {
  constructor(private readonly service: GoodService) {}

  @Get('/')
  async gets() {
    return 'ok'
  }
}
```

Ok, a business module was successfully created.

# How to do data validation

For security reasons, middleware is usually added to the request to validate the data for compliance, and NestJS provides a ValidatePipe for data validation. Next, write a simple GoodDto to validate the data.

Create file named `good.dto.ts`

```ts
import { IsString } from 'class-validator'

export class GoodDto implements Partial<GoodModel> {
  @IsString()
  name: string
}
```

And use this dto in controller.

```ts
// good.controller.ts
import { Body, Post, Controller } from '@nestjs/common'
import { GoodDto } from './good.dto.ts'

@Controller(['goods', 'database/goods'])
export class RuleController {
  constructor(private readonly service: GoodService) {}

  @Post('/')
  async create(@Body() body: GoodDto) {
    return 'ok'
  }
}
```

You'll notice that just by adding a decorator @Body and a type definition `GoodDto` on the front of the body, that's it, just define what the type of the body is and nestjs will automatically get the type and then verify that the structure of the request is valid. If it's not valid, it throws an 422 exception.

## How to name a file

aka. NestJS is inspired by Angular architecture, so recommend name a file like ng standard.

\[module\].\[type\].\[extension\]. For example,

**Module**

- good.controller.ts
- good.model.ts
- good.service.ts
- good.dto.ts

**common**

- response.interceptor.ts
- catch.filter.ts

**utils**

- ip.util.ts
