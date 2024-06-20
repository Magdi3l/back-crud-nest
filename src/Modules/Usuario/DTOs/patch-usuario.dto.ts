import { IsString, IsEmail, IsOptional, IsEmpty } from "class-validator";

export class PatchUsuarioDto {
    @IsString( {message: 'TIENE QUE SER UN NOMBRE VALIDO'})
    @IsOptional()
    readonly name?: string;

    @IsEmail( {}, {message: 'TIENE QUE SER UN EMAIL VALIDO'})
    @IsOptional()
    readonly email?: string
}