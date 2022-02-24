export enum ShopRoutes {
    Home = "Home",
    ProductDetails = "ProductDetails",
    Chart = "Chart",
}

export type ShopStackType = {
    [ShopRoutes.Home]: undefined;
    [ShopRoutes.ProductDetails]: { product: { id: string; title: string }; };
    [ShopRoutes.Chart]: undefined;
};