import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStateContainer } from '~components/FetchStatus';

import { ProductListItemComponent } from '../components/ProductListItem.component';
import { ProductRoutes, ProductStackType } from '../routes/ProductsNavigator.types';
import { AddToCartAction } from '../store/cart/cart.action';
import { getCartItems } from '../store/cart/cart.selectors';
import { FetchProductAction } from '../store/products';
import { ProductModel } from '../store/products/product.model';
import { getProducts } from '../store/products/products.selectors';

interface ProductOverviewInput extends NativeStackScreenProps<ProductStackType, ProductRoutes.Home> { } 

export const ProductOverviewScreen: FunctionComponent<ProductOverviewInput> = (props: ProductOverviewInput) => {
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ isRefreshing, setIsRefreshing ] = useState(false);
    const items = useSelector(getProducts);
    const cartItems = useSelector(getCartItems);
    const dispatch = useDispatch();
    const navigate = (product: ProductModel) => props.navigation.navigate(ProductRoutes.ProductDetails, { product });
    const add2cart = (product: ProductModel) => dispatch(AddToCartAction(product));

    const loadProducts = useCallback(async() => {
        try {
            setIsRefreshing(true);
            setErrorMessage('');
            await dispatch(FetchProductAction());
        } catch (error: any) {
            setErrorMessage(error.message);
        }
        setIsRefreshing(false);
    }, [ dispatch, setIsRefreshing, setErrorMessage ])

    // reload data on each visit
    useEffect(
        () => props.navigation.addListener('focus', () => loadProducts()), 
        [ loadProducts ]
    );

    // load data on first load
    useEffect(() => {
        setLoading(true);
        loadProducts().then(() => {
            setLoading(false);
        });
    }, [ loadProducts, setLoading ]);

    return (
        <FetchStateContainer
            loading={ loading }
            error={{ hasError: !!errorMessage, errorText: errorMessage, btnText: "Try again", fetchDataFn: loadProducts }}
            empty={{ isEmpty: !!items && items?.length === 0, emptyText: "No products found" }}
        >
            <FlatList
                onRefresh={()=>loadProducts()}
                refreshing={ isRefreshing }
                keyExtractor={(item: ProductModel) => item.id}
                data={items}
                renderItem={(item) => <ProductListItemComponent
                    item={item.item}
                    onClick={navigate}
                > 
                    <Button onPress={() => navigate(item.item)}>Details</Button>
                    <Button onPress={() => add2cart(item.item)} icon="cart">
                        Add to cart ({cartItems[item?.item?.id]?.amount || 0})
                    </Button>
                </ProductListItemComponent>}
            />
        </FetchStateContainer>
    );
};

const Styles = StyleSheet.create({});
