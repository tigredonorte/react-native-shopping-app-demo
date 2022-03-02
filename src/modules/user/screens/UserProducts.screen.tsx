import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStateContainer } from '~components/FetchStatus';
import { ProductListItemComponent } from '~modules/shop/components';
import { ProductRoutes, ProductStackType } from '~modules/shop/routes/ProductsNavigator.types';
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
    const addProduct = () => props.navigation.navigate(UserRoutes.EditProduct);
    const editItem = (product: BasicProduct) => props.navigation.navigate(
        UserRoutes.EditProduct, { id: product.id, title: product.title }
    );
    const deleteItem = useCallback((product: BasicProduct) => {
        const executeDeletion = () => dispatch(RemoveProductAction(product.id));
        Alert.alert(
            'Apagar produto', 
            'Você deseja apagar o produto?', 
            [
                { text: 'Não', style: 'default' },
                { text: 'Sim', style: 'destructive', onPress: executeDeletion },
            ]
        );
    }, []);
    const navigate = (product: BasicProduct) => props.navigation.navigate(ProductRoutes.ProductDetails, { product });

    return (
        <FetchStateContainer
            empty={{ 
                isEmpty: !!items && items?.length === 0, 
                emptyText: "You didn't add any product yet", 
                emptyBtnText: "Add New Product",
                onEmptyData: addProduct
            }}
        >
            <FlatList
                keyExtractor={(item: ProductModel) => item.id}
                data={items}
                renderItem={(item) => <ProductListItemComponent
                    item={item.item}
                    onClick={editItem}
                >
                    <View></View>
                    <View style={Styles.iconsContainer}>
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
                    </View>
                </ProductListItemComponent>}
            />
        </FetchStateContainer>
    );
};


const Styles = StyleSheet.create({
    iconsContainer: {
        flexDirection: 'row'
    }
});
