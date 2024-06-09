import { Resolver, Query, Args } from '@nestjs/graphql';
import { AboutEntity } from 'src/entities/about.entity';
import { AboutService } from 'src/shared/services/about/about.service';
import { AuthorService } from 'src/shared/services/author/author.service';

@Resolver(() => AboutEntity)
export class AboutResolver {
  constructor(private readonly aboutService: AboutService) {}

  @Query(() => AboutEntity)
  async findOneAbout() {
    const result = await this.aboutService.findOne(process.env.ABOUTUS_ID);
    return result;
  }

}
