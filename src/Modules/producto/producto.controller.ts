import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from './dto/producto.dto';

@Controller('producto')
export class ProductoController {
    private readonly logger = new Logger(ProductoController.name);
    constructor(private readonly productoService: ProductoService) {}

    @Get()
    async getAll() {
        return this.productoService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return this.productoService.findById(id);
    }

    @UsePipes(new ValidationPipe({whitelist:true}))
    @Post()
    async create(@Body() dto:ProductoDto){
        this.logger.log(`Iniciando la insercion del prodcuto: ${dto}`);
        return await this.productoService.create(dto);
    }

    @UsePipes(new ValidationPipe({whitelist:true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto:ProductoDto){
        return await this.productoService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.productoService.delete(id);
    }
}
