import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { FetchStateContainer } from '~components/FetchStatus';

import { OrdersItemComponent } from '../components/OrdersItem.component';
import { ProductRoutes } from '../routes/ProductsNavigator.types';
import { OrdersItemModel } from '../store/orders/orders.model';
import { getOrdersItems } from '../store/orders/orders.selectors';

interface OrdersInput extends NativeStackScreenProps<any> { } 

export const OrdersScreen: FunctionComponent<OrdersInput> = (props) => {
    const orders = useSelector(getOrdersItems);
    const seeOrder = (it: OrdersItemModel) => console.log('see order!');

    return (
        <FetchStateContainer
            loading={!orders}
            empty={{
                isEmpty: orders.length < 1,
                emptyText: "You don't have any orders", 
                emptyBtnText: "See products",
                onEmptyData: () => props.navigation.navigate(ProductRoutes.Home),
            }}
        >
            <FlatList 
                keyExtractor={(item: OrdersItemModel) => item.id}
                data={orders}
                renderItem={(item) => <OrdersItemComponent 
                    orderItem={item.item}
                    onClick={seeOrder}
                />}
            />
        </FetchStateContainer>
    );
};

const Styles = StyleSheet.create({});
