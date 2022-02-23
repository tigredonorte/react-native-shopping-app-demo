import { useObservable } from '@ngneat/react-rxjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { getStyle, ScreenData } from '~styles/responsiveness';

import { ProductListItemComponent } from '../components/ProductListItem.component';
import { ProductModel } from '../store/model/product.model';
import { getProducts } from '../store/products.selectors';

interface ProductOverviewInput extends NativeStackScreenProps<any> { } 

export const ProductOverviewScreen: React.FunctionComponent<ProductOverviewInput> = (props: ProductOverviewInput) => {
    const [ Styles ] = useObservable(getStyle(ProductOverviewStyles));
    const items = useSelector(getProducts);
    const navigate = (id: string) => console.log('navigate', { id });
    const add2cart = (id: string) => console.log('add2cart', { id });

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
