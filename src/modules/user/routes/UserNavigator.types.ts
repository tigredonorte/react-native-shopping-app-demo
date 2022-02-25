export enum UserRoutes {
    ListProducts = "ListProducts",
    EditProduct = "EditProduct",
}

export type OrderStackType = {
    [UserRoutes.ListProducts]: undefined;
    [UserRoutes.EditProduct]: undefined;
};