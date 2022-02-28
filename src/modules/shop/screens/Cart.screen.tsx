import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Caption } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStateContainer } from '~components/FetchStatus/FetchStateContainer';
import { TText } from '~components/UI';
import { OrdersRoutes } from '~modules/shop/routes/OrdersNavigator.types';
import { SystemRoutes } from '~routes/navigator/System.routes.types';
import { theme } from '~styles/theme';

import { CartItemComponent } from '../components/CartItem.component';
import { ProductRoutes, ProductStackType } from '../routes/ProductsNavigator.types';
import { ClearCartAction, RemoveFromCartAction } from '../store/cart/cart.action';
import { CartItemModel } from '../store/cart/cart.model';
import { getCartItems, getCartTotal } from '../store/cart/cart.selectors';
import { AddOrderAction } from '../store/orders/orders.action';

interface CartInput extends NativeStackScreenProps<ProductStackType, ProductRoutes.ProductDetails> { } 

export const CartScreen: FunctionComponent<CartInput> = (props) => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState<string>();
    const cartItem = useSelector(getCartItems);
    const total = useSelector(getCartTotal);
    const dispatch = useDispatch();
    const items = Object.values(cartItem).sort((a, b) => a.id > b.id ? 1 : -1);
    const emptyDataBtnClick = (): void =>  props.navigation.navigate(ProductRoutes.Home);
    const removeItem = (item: CartItemModel) => dispatch(RemoveFromCartAction(item));
    const order = async() => {
        try {
            setError('');
            setLoading(true);
            await Promise.all([
                dispatch(AddOrderAction(items)),
                dispatch(ClearCartAction())
            ])
            //@ts-ignore
            props.navigation.navigate(SystemRoutes.Orders, { screen: OrdersRoutes.Orders });
        } catch (err: any) {
            setError(err.message);
        }
        setLoading(false);
    };
    return (
        <FetchStateContainer
            loading={loading}
            empty={{
                isEmpty: items.length < 1,
                emptyText: "No Items on chart", 
                emptyBtnText: "See products",
                onEmptyData: emptyDataBtnClick,
            }}
            error={{
                hasError: !!error,
                errorText: !error ? 'Something went wrong' : error,
                btnText: "Try Again",
                fetchDataFn: order,
            }}
        >
            <ScrollView contentContainerStyle={Styles.container}>
                <View style={Styles.sumaryCard}>
                    <Caption>Total <TText>${total.toFixed(2)}</TText></Caption>
                    <Button mode="contained" onPress={order}>Order Now!</Button>
                </View>
                {items.map(it => <CartItemComponent key={it.id} cartItem={it} onRemove={removeItem}/>)}
            </ScrollView>
        </FetchStateContainer>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    sumaryCard: {
        marginBottom: 10,
        paddingVertical: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: theme.colors.white,
    }
});
