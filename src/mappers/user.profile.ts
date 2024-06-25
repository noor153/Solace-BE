import { createMap, forMember, mapFrom, type Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import {
  CountryDTO,
  LocalizedNameDTO,
  MaritalStatusDTO,
  NationalIdDTO,
  NationalityDTO,
  UserDTO,
} from '../dtos/user.dto';
import {
  Country,
  LocalizedName,
  MaritalStatus,
  NationalId,
  Nationality,
  User,
} from '../graphql/user/user.model';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        User,
        UserDTO,
        forMember(
          (d) => d.localizedName,
          mapFrom((s) =>
            this.mapper.map(s.localizedName, LocalizedName, LocalizedNameDTO),
          ),
        ),
        forMember(
          (d) => d.nationalId,
          mapFrom((s) =>
            this.mapper.map(s.nationalId, NationalId, NationalIdDTO),
          ),
        ),
        forMember(
          (d) => d.nationalities,
          mapFrom((s) =>
            this.mapper.mapArray(s.nationalities, Nationality, NationalityDTO),
          ),
        ),
        forMember(
          (d) => d.maritalStatus,
          mapFrom((s) =>
            this.mapper.map(s.maritalStatus, MaritalStatus, MaritalStatusDTO),
          ),
        ),
      );
      createMap(mapper, LocalizedName, LocalizedNameDTO);
      createMap(mapper, NationalId, NationalIdDTO);
      createMap(
        mapper,
        Nationality,
        NationalityDTO,
        forMember(
          (d) => d.country,
          mapFrom((s) => this.mapper.map(s.country, Country, CountryDTO)),
        ),
      );
      createMap(mapper, MaritalStatus, MaritalStatusDTO);
      createMap(mapper, Country, CountryDTO);
    };
  }
}
