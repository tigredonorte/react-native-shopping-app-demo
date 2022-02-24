import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Caption, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStateEmpty } from '~components/FetchStatus/components/FetchStateEmpty';
import { FetchStateLoading } from '~components/FetchStatus/components/FetchStateLoading';
import { TText } from '~components/UI';
import { ShopRoutes } from '~routes/navigator/ShopNavigator.route.types';
import { theme } from '~styles/theme';
import { CartItemComponent } from '../components/CartItem.component';
import { RemoveFromCartAction } from '../store/cart/cart.action';

import { CartItemModel } from '../store/cart/cart.model';
import { getCartItems, getCartTotal } from '../store/cart/cart.selectors';

interface CartInput extends NativeStackScreenProps<any> { } 

export const CartScreen: React.FunctionComponent<CartInput> = (props: CartInput) => {
    const cartItem = useSelector(getCartItems);
    const total = useSelector(getCartTotal);
    const dispatch = useDispatch();
    const items = Object.values(cartItem).sort((a, b) => a.id > b.id ? 1 : -1);
    const order = () => console.log('order');
    const removeItem = (item: CartItemModel) => dispatch(RemoveFromCartAction(item));

    if (!cartItem) {
        return <FetchStateLoading></FetchStateLoading>;
    }

    if (items.length < 1) {
        return <FetchStateEmpty
            emptyText="No Items on chart"
            onEmptyData={() => props.navigation.navigate(ShopRoutes.Home)}
            emptyBtnText="See products"
        />;
    }

    return (
        <ScrollView contentContainerStyle={Styles.container}>
            <View style={Styles.sumaryCard}>
                <Caption>Total <TText>${total}</TText></Caption>
                <Button mode="contained" onPress={order}>Order Now!</Button>
            </View>
            {items.map(it => <CartItemComponent key={it.id} cartItem={it} onRemove={removeItem}/>)}
        </ScrollView>
    );
};


// const CartStyles = (screenData: ScreenData) => StyleSheet.create({
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
    },
    total: {
        alignItems: 'center'
    },
});
