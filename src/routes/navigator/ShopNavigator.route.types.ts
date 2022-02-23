export enum ShopRoutes {
    Home = "Home",
    ProductDetails = "ProductDetails",
}

export type ShopStackType = {
    [ShopRoutes.Home]: undefined;
    [ShopRoutes.ProductDetails]: { product: { id: string; title: string }; };
};