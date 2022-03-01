export enum SystemRoutes {
    Products = "ProductsNavigator",
    Orders = "OrdersNavigator",
    Admin = "AdminNavigator",
    Logout = "LogoutNavigator",
}

export type SystemRoutesType = {
    [SystemRoutes.Products]: undefined;
    [SystemRoutes.Orders]: undefined;
    [SystemRoutes.Admin]: undefined;
    [SystemRoutes.Logout]: undefined;
};