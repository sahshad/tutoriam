import { IsEmail, IsString } from "class-validator";
import { IUser } from "../../models/User";

export class LoginResponseDTO {
  @IsString()
  _id!: string;

  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  role!: string;

  @IsString()
  profileImageUrl!: string;

  @IsString()
  phoneNo!: string;

  @IsString()
  title!: string;

  @IsString()
  status!: string;

  static fromEntity(entity: IUser): LoginResponseDTO {
    const dto = new LoginResponseDTO()
    dto._id = entity._id
    dto.email = entity.email
    dto.name = entity.name
    dto.phoneNo = entity.phoneNo ?? ""
    dto.role = entity.role
    dto.status = entity.status
    dto.title = entity.title ?? ""
    dto.profileImageUrl = entity.profileImageUrl ?? ""

    return dto
  }
}

export class OtpVerifyResponseDTO {
  @IsString()
  _id!: string;

  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  //   static fromEntity(entity: IUser): RegisterResponseDTO {
  //     const dto = new RegisterResponseDTO();
  //     dto._id = entity._id;
  //     dto.name = entity.name;
  //     dto.email = entity.email;
  //     return dto;
  //   }
}
