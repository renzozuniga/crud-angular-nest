import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    PostModule, 
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://mongo/posts-nest', { useNewUrlParser: true }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
