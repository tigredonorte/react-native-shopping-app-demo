export enum ShopRoutes {
    ProductsNavigator = "ProductsNavigator",
    OrdersNavigator = "OrdersNavigator"
}

export type ShopRoutesType = {
    [ShopRoutes.ProductsNavigator]: undefined;
    [ShopRoutes.OrdersNavigator]: undefined;
};