import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStateContainer } from '~components/FetchStatus';

import { OrdersItemComponent } from '../components/OrdersItem.component';
import { ProductRoutes } from '../routes/ProductsNavigator.types';
import { FetchOrderAction } from '../store/orders';
import { OrdersItemModel } from '../store/orders/orders.model';
import { getOrdersItems } from '../store/orders/orders.selectors';

interface OrdersInput extends NativeStackScreenProps<any> { } 

export const OrdersScreen: FunctionComponent<OrdersInput> = (props) => {
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const orders = useSelector(getOrdersItems);
    const onEmptyData = () => props.navigation.navigate(ProductRoutes.Home);

    const dispatch = useDispatch();
    const loadOrders = useCallback(async() => {
        try {
            setLoading(true);
            setErrorMessage('');
            await dispatch(FetchOrderAction());
        } catch (error: any) {
            setErrorMessage(error.message);
        }
        setLoading(false);
    }, [ dispatch, setLoading, setErrorMessage ])

    useEffect(
        () => props.navigation.addListener('focus', () => loadOrders()), 
        [ loadOrders ]
    );

    return (
        <FetchStateContainer
            loading={loading}
            error={{ hasError: !!errorMessage, errorText: errorMessage, btnText: "Try again", fetchDataFn: loadOrders }}
            empty={{ isEmpty: orders.length === 0, emptyText: "You don't have any orders", emptyBtnText: "See products", onEmptyData }}
        >
            <FlatList 
                keyExtractor={(item: OrdersItemModel) => item.id}
                data={orders}
                renderItem={(item) => <OrdersItemComponent 
                    orderItem={item.item}
                    onClick={() => {}}
                />}
            />
        </FetchStateContainer>
    );
};

const Styles = StyleSheet.create({});
