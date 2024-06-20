import { Controller, Get, Param, Delete, Body, Post, Put, ParseIntPipe, BadRequestException, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './DTOs/create-usuario.dto';
import { UpdateUsuarioDto } from './DTOs/update-usuario.dto';
import { PatchUsuarioDto } from './DTOs/patch-usuario.dto';

@Controller('usuarios')
@UsePipes(new ValidationPipe())
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async getAll(): Promise<Usuario[]> {
    return this.usuarioService.getAll();
  }

  @Post()
  async create(@Body() createUsuarioDto:  CreateUsuarioDto): Promise<Usuario> {
    return this.usuarioService.create(createUsuarioDto);
  }


  @Delete(':id')
  async deleteUser(@Param('id', new ParseIntPipe({ errorHttpStatusCode: 400, exceptionFactory: () => new BadRequestException('El ID proporcionado no es un número entero válido') })) id: number): Promise<void> {
    return await this.usuarioService.deleteUser(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: 400, exceptionFactory: () => new BadRequestException('El ID proporcionado no es un número entero válido') })) id: number, 
    @Body() updateUsuarioDto: UpdateUsuarioDto): 
    Promise<Usuario> {
    return await this.usuarioService.updateUsuario(id, updateUsuarioDto);
  }

  @Patch(':id')
  async partialUpdateUser(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: 400, exceptionFactory: () => new BadRequestException('El ID proporcionado no es un número entero válido') })) id: number,
    @Body() patchUsuarioDto: PatchUsuarioDto
  ): Promise<Usuario> {
    return await this.usuarioService.updateUsuario(id, patchUsuarioDto);
  }

  @Get(':id')
  async getUserById(@Param('id', new ParseIntPipe({ errorHttpStatusCode: 400, exceptionFactory: () => new BadRequestException('El ID proporcionado no es un número entero válido') })) id: number): Promise<string> {
    return this.usuarioService.getUserById(id);
  } 

}
