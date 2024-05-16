import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './shared/database/prisma.service';
import { CompanyAppModule } from './apps/company-app/company-app.module';

@Module({
  imports: [CompanyAppModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
