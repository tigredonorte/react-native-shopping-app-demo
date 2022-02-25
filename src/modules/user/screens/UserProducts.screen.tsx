import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ProductListItemComponent } from '~modules/shop/components';
import { ProductRoutes, ProductStackType } from '~modules/shop/routes';
import { RemoveProductAction } from '~modules/shop/store/products';
import { BasicProduct, ProductModel } from '~modules/shop/store/products/product.model';
import { getUserProduct } from '~modules/shop/store/products/products.selectors';

import { UserRoutes, UserStackType } from '../routes/UserNavigator.types';

interface UserProductsInput extends NativeStackScreenProps<
    UserStackType & ProductStackType, 
    UserRoutes.ListProducts> {} 

export const UserProductsScreen: React.FunctionComponent<UserProductsInput> = (props: UserProductsInput) => {
    const items = useSelector(getUserProduct);
    const dispatch = useDispatch();
    const editItem = (product: BasicProduct) => props.navigation.navigate(UserRoutes.EditProduct, { id: product.id, title: product.title });
    const deleteItem = (product: BasicProduct) => dispatch(RemoveProductAction(product.id))
    const navigate = (product: BasicProduct) => props.navigation.navigate(ProductRoutes.ProductDetails, { product });

    return (
        <FlatList
            keyExtractor={(item: ProductModel) => item.id}
            data={items}
            renderItem={(item) => <ProductListItemComponent
                item={item.item}
                onClick={editItem}
            >
                <IconButton 
                    onPress={() => editItem(item.item)}
                    icon='pencil-outline'
                />
                <IconButton 
                    onPress={() => navigate(item.item)}
                    icon='eye-outline'
                />
                <IconButton 
                    onPress={() => deleteItem(item.item)}
                    icon='trash-can-outline'
                />
            </ProductListItemComponent>}
        />
    );
};


const Styles = StyleSheet.create({});
