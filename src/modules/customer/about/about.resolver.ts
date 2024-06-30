import { Resolver, Query } from '@nestjs/graphql';
import { AboutEntity } from 'src/entities/about.entity';
import { AboutService } from 'src/shared/services/about/about.service';

@Resolver(() => AboutEntity)
export class AboutResolver {
  constructor(private readonly aboutService: AboutService) {}

  @Query(() => AboutEntity)
  async findOneAbout() {
    const id = localStorage.getItem(process.env.ABOUT_US_ID);
    const result = await this.aboutService.findOne(id);
    return result;
  }

}
