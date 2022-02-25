import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Caption, IconButton } from 'react-native-paper';
import { TText } from '~components/UI';
import { theme } from '~styles/theme';

import { OrdersItemModel } from '../store/orders/orders.model';
import { CartItemComponent } from './CartItem.component';

interface OrdersItemInput {
    orderItem: OrdersItemModel;
    onClick: (it: OrdersItemModel) => void;
} 

export const OrdersItemComponent: React.FunctionComponent<OrdersItemInput> = (props: OrdersItemInput) => {

    const date = moment.utc(props.orderItem.date).format('DD/MM/YYYY');
    const [ showDetails, setShowDetails ] = useState(false);

    return (
        <View style={Styles.itemContainer}>
            <View style={Styles.headerContainer}>
                <View style={Styles.textItem}>
                    <Caption>Date</Caption>
                    <TText>{date}</TText>
                </View>
                <View style={Styles.textItem}>
                    <Caption>Total</Caption>
                    <TText>{props.orderItem.total.toFixed(2)}</TText>
                </View>
            </View>
            {   
                showDetails &&
                <View style={Styles.detailsContainer}>
                    <View style={Styles.itemsTitleContainer}>
                        <TText style={Styles.itemsTitle}>Itens</TText>
                    </View>
                    {
                        props.orderItem.cartItems.map(it => 
                            <CartItemComponent key={it.id} cartItem={it} />
                        )
                    }
                </View>
            }
            <View style={{alignItems: 'center'}}>
                <IconButton 
                    icon={!showDetails ? 'chevron-down' : 'chevron-up'} 
                    onPress={() => setShowDetails(!showDetails) }
                    color={theme.colors.primary}
                />
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    itemContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        backgroundColor: theme.colors.white,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        paddingBottom: 10,
    },
    detailsContainer: {
        borderTopColor: theme.colors.light_grey, 
        borderTopWidth: 1
    },
    textItem: {
        
    },
    itemsTitleContainer: {
        paddingBottom: 5,
        marginBottom: 5
    },
    itemsTitle: {
        color: theme.colors.disabled
    }
});
