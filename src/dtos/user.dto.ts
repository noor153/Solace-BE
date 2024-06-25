import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class LocalizedNameDTO {
  @AutoMap(() => String)
  @IsString()
  firstName: string;

  @AutoMap(() => String)
  @IsString()
  fatherName: string;

  @AutoMap(() => String)
  @IsString()
  grandfatherName: string;

  @AutoMap(() => String)
  @IsString()
  familyName: string;
}

export class NationalIdDTO {
  @AutoMap(() => String)
  @IsString()
  idNumber: string;

  @AutoMap(() => Date)
  @IsDate()
  expiryDate: Date;
}

export class CountryDTO {
  @AutoMap(() => Number)
  @IsNumber()
  id: number;

  @AutoMap(() => String)
  @IsString()
  name: string;
}

export class NationalityDTO {
  @AutoMap(() => CountryDTO)
  @ValidateNested()
  @Type(() => CountryDTO)
  country: CountryDTO;

  @AutoMap(() => Number)
  @IsNumber()
  countryId: number;
}

export class MaritalStatusDTO {
  @AutoMap(() => Number)
  @IsNumber()
  id: number;

  @AutoMap(() => String)
  @IsString()
  name: string;
}

export class UserDTO {
  @AutoMap(() => String)
  @IsString()
  firstName: string;

  @AutoMap(() => String)
  @IsString()
  fatherName: string;

  @AutoMap(() => String)
  @IsString()
  grandfatherName: string;

  @AutoMap(() => String)
  @IsString()
  familyName: string;

  @AutoMap(() => LocalizedNameDTO)
  @ValidateNested()
  @Type(() => LocalizedNameDTO)
  localizedName: LocalizedNameDTO;

  @AutoMap(() => NationalIdDTO)
  @ValidateNested()
  @Type(() => NationalIdDTO)
  nationalId: NationalIdDTO;

  @AutoMap(() => [NationalIdDTO])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NationalityDTO)
  nationalities: NationalityDTO[];

  @AutoMap(() => [MaritalStatusDTO])
  @ValidateNested()
  @Type(() => MaritalStatusDTO)
  maritalStatus: MaritalStatusDTO;

  @AutoMap(() => Number)
  @IsNumber()
  dependants: number;
}
