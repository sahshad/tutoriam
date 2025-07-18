import { IsEmail, IsOptional, IsString } from "class-validator"
import { IUser } from "../../models/User"

export class UserResponseDTO {
  @IsString()
  _id!: string

  @IsString()
  name!: string

  @IsEmail()
  email!: string

  @IsString()
  role!: string

  @IsString()
  status!: string

  @IsOptional()
  @IsString()
  profileImageUrl?: string

  @IsOptional()
  @IsString()
  phoneNo?: string

  @IsOptional()
  @IsString()
  title?: string

  @IsString()
  createdAt!: string

  @IsString()
  updatedAt!: string

  static fromEntity(entity: IUser): UserResponseDTO {
    const dto = new UserResponseDTO()
    dto._id = entity._id.toString()
    dto.name = entity.name
    dto.email = entity.email
    dto.role = entity.role
    dto.status = entity.status
    dto.phoneNo = entity.phoneNo ?? ""
    dto.title = entity.title ?? ""
    dto.profileImageUrl = entity.profileImageUrl ?? ""
    dto.createdAt = entity.createdAt.toISOString()
    dto.updatedAt = entity.updatedAt.toISOString()
    return dto
  }
}
