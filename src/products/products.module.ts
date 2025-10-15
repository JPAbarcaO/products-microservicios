import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { env, PRODUCT_SERVICE } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: env.productsMicroservicesHost,
          port: env.productsMicroservicesPort,
        },
      },
    ]),
  ],
})
export class ProductsModule {}
