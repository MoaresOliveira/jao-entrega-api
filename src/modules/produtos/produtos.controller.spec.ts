import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosController } from './produtos.controller';
import { ProdutoService } from './produto.service';

describe('ProdutosController', () => {
  let controller: ProdutosController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: ProdutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutosController],
      providers: [ProdutoService],
    }).compile();

    controller = module.get<ProdutosController>(ProdutosController);
    service = module.get<ProdutoService>(ProdutoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
