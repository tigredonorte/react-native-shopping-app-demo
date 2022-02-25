import { useObservable } from '@ngneat/react-rxjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getStyle, ScreenData } from '~styles/responsiveness';

import { ProductListItemComponent } from '../components/ProductListItem.component';
import { ProductRoutes, ProductStackType } from '../routes/ProductsNavigator.types';
import { AddToCartAction } from '../store/cart/cart.action';
import { getCartItems } from '../store/cart/cart.selectors';
import { BasicProduct, ProductModel } from '../store/products/product.model';
import { getProducts } from '../store/products/products.selectors';

interface ProductOverviewInput extends NativeStackScreenProps<ProductStackType, ProductRoutes.Home> { } 

export const ProductOverviewScreen: FunctionComponent<ProductOverviewInput> = (props: ProductOverviewInput) => {
    const [ Styles ] = useObservable(getStyle(ProductOverviewStyles));
    const items = useSelector(getProducts);
    const cartItems = useSelector(getCartItems);
    const dispatch = useDispatch();
    const navigate = (product: BasicProduct) => props.navigation.navigate(ProductRoutes.ProductDetails, { product });
    const add2cart = (product: ProductModel) => dispatch(AddToCartAction(product));

    return (
        <FlatList 
            keyExtractor={(item: ProductModel) => item.id}
            data={items}
            renderItem={(item) => <ProductListItemComponent 
                item={item.item}
                chartItem={cartItems[item.item.id]}
                onClick={navigate}
                add2cart={add2cart}
            />}
        />
    );
};

const ProductOverviewStyles = (screenData: ScreenData) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});
