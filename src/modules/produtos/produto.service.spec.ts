import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from './produto.service';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

describe('ProdutoService', () => {
  let service: ProdutoService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<Produto>;

  const mockRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoService,
        {
          provide: getRepositoryToken(Produto),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProdutoService>(ProdutoService);
    repository = module.get<Repository<Produto>>(getRepositoryToken(Produto));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new produto', async () => {
      const produtoDto: CreateProdutoDto = {
        nome: 'Pepsi 2L',
        preco: 7.99,
        descricao: 'Bem melhor e mais barato que Coca-Cola',
        quantidade: 1,
      };
      const produto = { id: 1, ...produtoDto };

      mockRepository.save.mockResolvedValue(produtoDto);

      const result = await service.create(produtoDto);
      expect(result).toEqual(produto);
      expect(mockRepository.save).toHaveBeenCalledWith(produtoDto);
    });
  });

  // Teste para o método 'findAll'
  describe('findAll', () => {
    it('should return an array of produtos', async () => {
      const produtos = [{ id: 1, nome: 'Produto 1', preco: 100 }];

      mockRepository.find.mockResolvedValue(produtos);

      const result = await service.findAll();
      expect(result).toEqual(produtos);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  // Teste para o método 'findById'
  describe('findById', () => {
    it('should return a single produto by id', async () => {
      const produto = { id: 1, nome: 'Produto 1', preco: 100 };

      mockRepository.findBy.mockResolvedValue([produto]);

      const result = await service.findById(1);
      expect(result).toEqual(produto);
      expect(mockRepository.findBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  // Teste para o método 'update'
  describe('update', () => {
    it('should update a produto', async () => {
      const updateProdutoDto: UpdateProdutoDto = {
        nome: 'Produto Updated',
        preco: 200,
      };
      const updateResult = { affected: 1 };

      mockRepository.update.mockResolvedValue(updateResult);

      const result = await service.update(1, updateProdutoDto);
      expect(result).toEqual(updateResult);
      expect(mockRepository.update).toHaveBeenCalledWith(1, updateProdutoDto);
    });
  });

  // Teste para o método 'delete'
  describe('delete', () => {
    it('should delete a produto', async () => {
      const deleteResult = { affected: 1 };

      mockRepository.delete.mockResolvedValue(deleteResult);

      const result = await service.delete(1);
      expect(result).toEqual(deleteResult);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
