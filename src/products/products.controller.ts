import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Get()
  findAllProducts() {
    return this.productsClient.send({ cmd: 'find_all_products' }, {});
  }

  @Post()
  createProduct() {
    return 'This action adds a new product';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} product`;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return `This action removes a #${id} product`;
  }

  @Patch(':id')
  patchProduct(@Param('id') id: string, @Body() body: any) {
    return `This action updates a #${id} product`;
  }
}
