import { IsOptional, IsEnum } from "class-validator";
import { OrderStatusList, OrderStatus } from "../enum/order.enum";
import { PaginationDto } from "src/common";

export class OrderPaginationDto extends PaginationDto {
    @IsOptional()
    @IsEnum(OrderStatusList, { message: `status must be one of the following values: ${OrderStatusList.join(', ')}` })
    status?: OrderStatus;
}