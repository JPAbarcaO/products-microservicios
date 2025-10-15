import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) { }

  @Get()
  findAllProducts(@Query() paginationDTO : PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_products' }, { paginationDTO });
  }

  @Post()
  createProduct() {
    return this.productsClient.send({ cmd: 'create_product' }, {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'find_one_product' }, { id });
  }


  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'delete_product' }, { id });
  }

  @Patch(':id')
  patchProduct(@Param('id') id: string, @Body() body: any) {
    return this.productsClient.send({ cmd: 'update_product' }, { id, ...body });
  }
}
