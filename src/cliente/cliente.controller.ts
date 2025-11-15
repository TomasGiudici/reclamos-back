import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}
}
