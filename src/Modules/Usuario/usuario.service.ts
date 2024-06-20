import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { ParseIntPipe } from '@nestjs/common';

@Injectable({})
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private UsuariosRepository: Repository<Usuario>,
    ) {}
    
    async getAll(): Promise<Usuario[]> {
      try {
        return await this.UsuariosRepository.find();
      } catch (error) {
        throw new InternalServerErrorException('Error al obtener todos los usuarios');
      }
    }
    
    async create(createUsuarioDto: Partial<Usuario>): Promise<Usuario> {
      try {
        console.log('Creando nuevo usuario...');
        const newUser = this.UsuariosRepository.create(createUsuarioDto);
        await this.UsuariosRepository.save(newUser);
        console.log('Usuario creado exitosamente:', newUser);
        return newUser;
      } catch (error) {
        throw new InternalServerErrorException('Error al crear un nuevo usuario');
      }
    }

    // async getRecent(): Promise<Usuario> {
    //   try {
    //     return await this.UsuariosRepository
    //       .createQueryBuilder('usuario')
    //       .orderBy('usuario.createdAt', 'DESC')
    //       .getOne();
    //   } catch (error) {
    //     throw new InternalServerErrorException('Error al obtener el usuario más reciente');
    //   }
    // }

    async deleteUser(id: number): Promise<void> {
      try {
        const result = await this.UsuariosRepository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException(`Usuario con el id ${id} no ha sido encontrado para eliminar`);
        }
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException(`Error al eliminar el usuario con id ${id}`);
      }
    }

    async updateUsuario(id: number, updateUsuarioDto: Partial<Usuario>): Promise<Usuario> {
      try {
        const result = await this.UsuariosRepository.update(id, updateUsuarioDto);
        if (result.affected === 0) {
          throw new NotFoundException(`Usuario con el id ${id} no ha sido encontrado para actualizar`);
        }
        const updatedUser = await this.UsuariosRepository.findOne({ where: { id } });
        if (!updatedUser) {
          throw new InternalServerErrorException(`Error al obtener el usuario actualizado con id ${id}`);
        }
        return updatedUser;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException(`Error al actualizar el usuario con id ${id}`);
      }
    }

    async getUserById(id: number): Promise<string> {
      try {
        const user = await this.UsuariosRepository.findOne({ where: { id } });
        if (!user) {
          throw new NotFoundException(`Usuario con el id ${id} no ha sido encontrado`);
        }
        return `Id: ${user.id}, Nombre: ${user.name}, Email: ${user.email}`;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException(`Error al obtener el usuario con id ${id}`);
      }
    }
    
    
    async partialUpdateUsuario(id: number, patchUsuarioDto: Partial<Usuario>): Promise<Usuario> {
      try {
        const result = await this.UsuariosRepository.update(id, patchUsuarioDto);
        if (result.affected === 0) {
          throw new NotFoundException(`Usuario con el id ${id} no ha sido encontrado para actualizar`);
        }
        const updatedUser = await this.UsuariosRepository.findOne({ where: { id } });
        if (!updatedUser) {
          throw new InternalServerErrorException(`Error al obtener el usuario actualizado con id ${id}`);
        }
        return updatedUser;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException(`Error al actualizar parcialmente el usuario con id ${id}`);
      }
    }
  
}
