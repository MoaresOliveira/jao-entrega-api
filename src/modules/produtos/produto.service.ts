import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Produto } from './entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto) private produtoRepository: Repository<Produto>,
  ) {}

  create(produto: CreateProdutoDto): Promise<Produto> {
    return this.produtoRepository.save(produto);
  }

  findAll(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }

  async findById(id: number): Promise<Produto> {
    const produtos = await this.produtoRepository.findBy({ id });
    return produtos[0];
  }

  async update(id: number, produto: UpdateProdutoDto): Promise<UpdateResult> {
    return this.produtoRepository.update(id, produto);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.produtoRepository.delete(id);
  }
}
