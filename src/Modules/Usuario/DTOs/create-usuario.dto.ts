import { IsString, IsEmail, IsNotEmpty, IsOptional, isNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
    @IsString( {message: 'TIENE QUE SER UN NOMBRE VALIDO'})
    @IsNotEmpty( {message: 'EL NOMBRE ES OBLIGATORIO'})
    readonly name: string;

    @IsEmail( {}, {message: 'TIENE QUE SER UN EMAIL VALIDO'})
    @IsNotEmpty( {message: 'EL NOMBRE ES OBLIGATORIO'})
    readonly email:string;
}