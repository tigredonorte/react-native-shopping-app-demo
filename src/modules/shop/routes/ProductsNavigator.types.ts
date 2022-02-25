export enum ProductRoutes {
    Home = "Home",
    ProductDetails = "ProductDetails",
    Cart = "Cart",
    Orders = "Orders",
}

export type ProductStackType = {
    [ProductRoutes.Home]: undefined;
    [ProductRoutes.ProductDetails]: { product: { id: string; title: string }; };
    [ProductRoutes.Cart]: undefined;
    [ProductRoutes.Orders]: undefined;
};