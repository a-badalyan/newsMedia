import { IsString, IsUrl } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  name: string;

  @IsUrl()
  avatarUrl: string;
}
