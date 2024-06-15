import { Resolver, Query } from '@nestjs/graphql';
import { AboutEntity } from 'src/entities/about.entity';
import { ABOUTUS_ID } from 'src/shared/constants/localstorage.constant';
import { AboutService } from 'src/shared/services/about/about.service';

@Resolver(() => AboutEntity)
export class AboutResolver {
  constructor(private readonly aboutService: AboutService) {}

  @Query(() => AboutEntity)
  async findOneAbout() {
    const id = localStorage.getItem(ABOUTUS_ID);
    const result = await this.aboutService.findOne(id);
    return result;
  }

}
