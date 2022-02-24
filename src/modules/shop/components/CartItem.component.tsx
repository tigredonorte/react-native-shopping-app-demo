import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Caption, IconButton } from 'react-native-paper';
import { TText } from '~components/UI';
import { fontSizer } from '~styles/responsiveness';
import { theme } from '~styles/theme';

import { CartItemModel } from '../store/cart/cart.model';

interface CartItemInput {
    cartItem: CartItemModel;
    onRemove: (it: CartItemModel) => void;
} 

export const CartItemComponent: React.FunctionComponent<CartItemInput> = (props: CartItemInput) => {
    return (
        <View style={Styles.itemContainer} key={props.cartItem.id}>
            <View style={Styles.textContainer}>
                <TText>
                    <Caption style={Styles.caption}> {props.cartItem.amount} </Caption> 
                    <TText>{props.cartItem.title}</TText>
                </TText>
                <View>
                    <Caption style={Styles.caption}> $ {props.cartItem.sum} </Caption>
                </View>
            </View>
            <View>
                <IconButton
                    size={fontSizer('icon')}
                    style={Styles.icon}
                    icon='delete'
                    color={ theme.colors.dark_grey}
                    onPress={() => props.onRemove(props.cartItem) }
                />
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: 2,
        marginBottom: 10,
        padding: 5,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.extra_light_grey,
        borderBottomColor: theme.colors.dark_greyOpacity,
        borderBottomWidth: 1
    },
    textContainer: {
        width: '85%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    caption: {
        color: theme.colors.dark_grey,
        fontSize: 18
    },
    icon: {
        padding: 0,
        margin: 0
    }
});
