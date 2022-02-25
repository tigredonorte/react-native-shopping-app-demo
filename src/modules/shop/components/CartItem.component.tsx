import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Caption, IconButton } from 'react-native-paper';
import { TText } from '~components/UI';
import { fontSizer } from '~styles/responsiveness';
import { theme } from '~styles/theme';

import { CartItemModel } from '../store/cart/cart.model';

interface CartItemInput {
    cartItem: CartItemModel;
    onRemove?: (it: CartItemModel) => void;
} 

export const CartItemComponent: React.FunctionComponent<CartItemInput> = (props: CartItemInput) => {
    return (
        <View style={Styles.itemContainer}>
            <View style={Styles.textContainer}>
                <TText>
                    <Caption style={Styles.caption}> {props.cartItem.amount} </Caption> 
                    <TText>{props.cartItem.title}</TText>
                </TText>
                <View>
                    <Caption style={Styles.caption}> $ {props.cartItem.sum.toFixed(2)} </Caption>
                </View>
            </View>
            {
                props.onRemove &&
                <View>
                    <IconButton
                        size={fontSizer('icon')}
                        style={Styles.icon}
                        icon='delete'
                        color={ theme.colors.dark_grey}
                        onPress={() => props.onRemove ? props.onRemove(props.cartItem) : undefined }
                    />
                </View>
            }
        </View>
    );
};

const Styles = StyleSheet.create({
    itemContainer: {
        marginBottom: 10,
        paddingVertical: 5,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textContainer: {
        flexGrow: 1,
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
