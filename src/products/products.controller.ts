import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, BadRequestException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ClientProxy, MessagePattern, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto, RpcCustomExceptionFilter } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) { }

  @Get()
  findAllProducts(@Query() paginationDTO: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_products' }, { paginationDTO });
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({ cmd: 'create_product' }, { createProductDto });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id })
      );
      if (!product) {
        throw new RpcException({
          message: `Product with id ${id} not found`,
          status: HttpStatus.NOT_FOUND
        });
      }
      return product;
    }
    catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }


  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'delete_product' }, { id });
  }

  @Patch(':id')
  patchProduct(@Param('id', ParseIntPipe)
  id: number,
    @Body() updateProductDto: UpdateProductDto) {
    return this.productsClient.send({ cmd: 'update_product' }, { id, ...updateProductDto });
  }
}
