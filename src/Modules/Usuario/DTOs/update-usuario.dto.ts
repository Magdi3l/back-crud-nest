import { IsString, IsEmail,IsOptional, IsNotEmpty } from "class-validator";

export class UpdateUsuarioDto {
    @IsString( {message: 'TIENE QUE SER UN EMAIL VALIDO'})
    @IsOptional()
    @IsNotEmpty({message: 'EL NOMBRE ES OBLIGATORIO'})
    readonly name?: string;

    @IsEmail( {}, {message: 'TIENE QUE SER UN EMAIL VALIDO'})
    @IsOptional()
    @IsNotEmpty({message: 'EL EMAIL ES OBLIGATORIO'})
    readonly email?: string
}