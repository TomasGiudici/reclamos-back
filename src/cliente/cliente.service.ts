import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { ClienteRepository } from './repositories/cliente.repository';
import { toClienteDto } from './mappers/toClienteDto.mapper';
import { ClienteDto } from './dto/cliente.dto';
import { toUsuarioEntity } from 'src/common/mappers/toUsuarioEntity.mapper';

@Injectable()
export class ClienteService {
  constructor(
    private readonly clienteRepository: ClienteRepository
  ) {}

  async register(registerDto: RegisterDto): Promise<ClienteDto> {
    try {
      const data = toUsuarioEntity(registerDto);
      const cliente = await this.clienteRepository.create(data);
      return toClienteDto(cliente);
    } catch (error) {
      throw new Error(`Error al crear el cliente: ${error.message}`);
    }
  }

  findAll() {
    return `This action returns all cliente`;
  }

  async findOne(email: string): Promise<ClienteDto | null> {
    const cliente = await this.clienteRepository.findByEmail(email);
    if(!cliente) {
      return null;
    }
    return toClienteDto(cliente);
  }

  update() {
    return `This action updates a cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
