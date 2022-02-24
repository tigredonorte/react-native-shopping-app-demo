import { useObservable } from '@ngneat/react-rxjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButton } from '~components/UI/src/HeaderButton.component';
import { ShopRoutes, ShopStackType } from '~routes/navigator/ShopNavigator.route.types';
import { getStyle, ScreenData } from '~styles/responsiveness';

import { ProductListItemComponent } from '../components/ProductListItem.component';
import { AddToCartAction } from '../store/cart/cart.action';
import { getCartItems } from '../store/cart/cart.selectors';
import { BasicProduct, ProductModel } from '../store/products/product.model';
import { getProducts } from '../store/products/products.selectors';

interface ProductOverviewInput extends NativeStackScreenProps<ShopStackType, ShopRoutes.Home> { } 

export const ProductOverviewScreen: FunctionComponent<ProductOverviewInput> = (props: ProductOverviewInput) => {
    const [ Styles ] = useObservable(getStyle(ProductOverviewStyles));
    const items = useSelector(getProducts);
    const cartItems = useSelector(getCartItems);
    const dispatch = useDispatch();
    const navigate = (product: BasicProduct) => props.navigation.navigate(ShopRoutes.ProductDetails, { product });
    const add2cart = (product: ProductModel) => dispatch(AddToCartAction(product));

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (<HeaderButton icon='cart' onPress={() => props.navigation.navigate(ShopRoutes.Chart)}/>)
        });
    }, [cartItems]);

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
