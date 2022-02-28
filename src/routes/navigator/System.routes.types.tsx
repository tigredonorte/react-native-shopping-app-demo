export enum SystemRoutes {
    Products = "ProductsNavigator",
    Orders = "OrdersNavigator",
    Admin = "AdminNavigator",
}

export type SystemRoutesType = {
    [SystemRoutes.Products]: undefined;
    [SystemRoutes.Orders]: undefined;
    [SystemRoutes.Admin]: undefined;
};