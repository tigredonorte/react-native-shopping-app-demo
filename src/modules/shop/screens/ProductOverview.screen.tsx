import { useObservable } from '@ngneat/react-rxjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { ShopRoutes, ShopStackType } from '~routes/navigator/ShopNavigator.route.types';
import { getStyle, ScreenData } from '~styles/responsiveness';

import { ProductListItemComponent } from '../components/ProductListItem.component';
import { BasicProduct, ProductModel } from '../store/model/product.model';
import { getProducts } from '../store/products.selectors';

interface ProductOverviewInput extends NativeStackScreenProps<ShopStackType, ShopRoutes.Home> { } 

export const ProductOverviewScreen: FunctionComponent<ProductOverviewInput> = (props: ProductOverviewInput) => {
    const [ Styles ] = useObservable(getStyle(ProductOverviewStyles));
    const items = useSelector(getProducts);
    const navigate = (product: BasicProduct) => props.navigation.navigate(ShopRoutes.ProductDetails, { product });
    const add2cart = (product: BasicProduct) => console.log('add2cart', { product });

    return (
        <FlatList 
            keyExtractor={(item: ProductModel) => item.id}
            data={items}
            renderItem={(item) => <ProductListItemComponent item={item.item} onClick={navigate} add2cart={add2cart} />}
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
