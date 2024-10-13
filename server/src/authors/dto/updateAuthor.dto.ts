import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateAuthorDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  authorNumber?: number;
}
