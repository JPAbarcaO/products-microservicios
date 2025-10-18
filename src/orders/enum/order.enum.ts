export enum OrderStatus {
    PENDING = 'PENDING',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED'
}

export const OrderStatusList =
    [
        OrderStatus.CANCELED,
        OrderStatus.DELIVERED,
        OrderStatus.PENDING
    ];