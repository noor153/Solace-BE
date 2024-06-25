// This file contains the User model that will be used in the GraphQL schema.

import { AutoMap } from '@automapper/classes';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LocalizedName {
  @AutoMap(() => String)
  @Field()
  firstName: string;

  @AutoMap(() => String)
  @Field()
  fatherName: string;

  @AutoMap(() => String)
  @Field()
  grandfatherName: string;

  @AutoMap(() => String)
  @Field()
  familyName: string;
}

@ObjectType()
export class NationalId {
  @AutoMap(() => String)
  @Field()
  idNumber: string;

  @AutoMap(() => String)
  @Field()
  expiryDate: string;
}

@ObjectType()
export class Country {
  @AutoMap(() => Number)
  @Field(() => Int)
  id: number;

  @AutoMap(() => String)
  @Field()
  name: string;
}

@ObjectType()
export class Nationality {
  @AutoMap(() => Country)
  @Field(() => Country)
  country: Country;

  @AutoMap(() => Number)
  @Field(() => Int)
  countryId: number;
}

@ObjectType()
export class MaritalStatus {
  @AutoMap(() => Number)
  @Field(() => Int)
  id: number;

  @AutoMap(() => String)
  @Field()
  name: string;
}

@ObjectType()
export class User {
  @AutoMap(() => String)
  @Field()
  firstName: string;

  @AutoMap(() => String)
  @Field()
  fatherName: string;

  @AutoMap(() => String)
  @Field()
  grandfatherName: string;

  @AutoMap(() => String)
  @Field()
  familyName: string;

  @AutoMap(() => LocalizedName)
  @Field(() => LocalizedName)
  localizedName: LocalizedName;

  @AutoMap(() => NationalId)
  @Field(() => NationalId)
  nationalId: NationalId;

  @AutoMap(() => [Nationality])
  @Field(() => [Nationality])
  nationalities: Nationality[];

  @AutoMap(() => MaritalStatus)
  @Field(() => MaritalStatus)
  maritalStatus: MaritalStatus;

  @AutoMap(() => Number)
  @Field(() => Int)
  dependants: number;
}
