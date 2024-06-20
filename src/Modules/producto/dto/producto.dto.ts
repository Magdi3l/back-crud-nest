import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { IsnotBlank } from "src/decorators/is-not-blank.decorators";


export class ProductoDto {
    @IsString({message:'Ingresa un nombre valido'})
    @IsNotEmpty({message:'El nobre del producto no puede estar vacio'})
    @IsnotBlank({message:'El nobre del producto no puede estar vacio'})
    nombre?:string;

    @IsNumber({}, {message:'Ingresa un precio valido'})
    @IsNotEmpty({message:'El precio del producto no puede estar vacio'})
    @Min(10,{message:'El precio del producto debe ser mayor a 10'})
    precio?:number;
}