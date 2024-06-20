import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from './producto.entity';
import { ProductoRepository } from './producto.repository';
import { ProductoDto } from './dto/producto.dto';
import { retry } from 'rxjs';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class ProductoService {
  private readonly logger = new Logger(ProductoService.name);
  constructor(
    @InjectRepository(ProductoEntity)
    private productoRepository: ProductoRepository,
  ) {}

  async getAll(): Promise<ProductoEntity[]> {
    const list = await this.productoRepository.find();
    if (!list.length) {
      throw new NotFoundException(new  MessageDto('La lista esta vacia'));
    }
    return list;
  }

  async findById(id: number): Promise<ProductoEntity> { 
    const producto = await this.productoRepository.findOne({ where: { id } });
    if (!producto) {
      throw new NotFoundException(new MessageDto(`El producto con id ${id} no existe`));
    }
    return producto;
  }

  async findByNombre(nombre: string): Promise<ProductoEntity> {
    const producto = await this.productoRepository.findOne({
      where: { nombre },
    });
    this.logger.log(`El producto encontrado fue: ${producto}`);
    return producto;
  }

  async create(dto: ProductoDto): Promise<any> {
    this.logger.log(`Iniciando la inserción del producto: ${JSON.stringify(dto)}`);
    const exists = await this.findByNombre(dto.nombre);
    if (exists) {
        this.logger.log('El nombre del producto ya existe.');
        throw new BadRequestException(new MessageDto('El nombre del producto ya existe'));
    }

    const producto = this.productoRepository.create(dto);
    await this.productoRepository.save(producto);
    return new MessageDto('El producto ha sido creado exitosamente');
}

  async update(id: number, dto: ProductoDto): Promise<any> {
    const producto = await this.findById(id);
    if (!producto)
      throw new BadRequestException(new MessageDto('El producto no existe' ));
    const exists = await this.findByNombre(dto.nombre);
    if (exists && exists.id !== id)
      throw new BadRequestException(new MessageDto(
        'El nombre del producto ya existe'
      ));
    dto.nombre
      ? (producto.nombre = dto.nombre)
      : (producto.nombre = producto.nombre);
    dto.precio
      ? (producto.precio = dto.precio)
      : (producto.precio = producto.precio);
    await this.productoRepository.save(producto);
    return new MessageDto(`Producto ${producto.nombre} actualizado exitosamente`);  
  }

  async delete(id: number): Promise<any> {
    const producto = await this.findById(id);
    await this.productoRepository.remove(producto);
    return new MessageDto(`Producto ${producto.nombre} eliminado exitosamente`);  
  }
}
