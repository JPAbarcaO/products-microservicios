import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';


@Controller('products')
export class ProductsController {
  constructor() {}

  @Get()
  findAllProducts() {
    return 'This action returns all products';
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
