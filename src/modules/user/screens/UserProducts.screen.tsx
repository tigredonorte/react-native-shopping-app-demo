import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ProductListItemComponent } from '~modules/shop/components';
import { ProductRoutes } from '~modules/shop/routes';
import { BasicProduct, ProductModel } from '~modules/shop/store/products/product.model';
import { getUserProduct } from '~modules/shop/store/products/products.selectors';

interface UserProductsInput extends NativeStackScreenProps<any> { } 

export const UserProductsScreen: React.FunctionComponent<UserProductsInput> = (props: UserProductsInput) => {
    const items = useSelector(getUserProduct);
    const dispatch = useDispatch();
    const navigate = (product: BasicProduct) => props.navigation.navigate(ProductRoutes.ProductDetails, { product });

    return (
        <FlatList
            keyExtractor={(item: ProductModel) => item.id}
            data={items}
            renderItem={(item) => <ProductListItemComponent
                item={item.item}
                onClick={navigate}
            />}
        />
    );
};


const Styles = StyleSheet.create({});
