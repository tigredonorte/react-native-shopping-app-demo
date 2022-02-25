import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

import { CartItemModel } from '../store/cart/cart.model';
import { ProductModel } from '../store/products/product.model';

interface ProductListItemInput {
    item: ProductModel;
    chartItem?: CartItemModel;
    onClick: (product: ProductModel) => void;
}

export const ProductListItemComponent: FunctionComponent<ProductListItemInput> = (props) => {

    const onClick = () => props.onClick(props.item);
    return (
        <Card style={Styles.listItem} onPress={onClick}>
            <Card.Cover source={{ uri: props.item.imageUrl }} />
            <Card.Title title={props.item.title} subtitle={props.item.price} />
            <Card.Actions style={Styles.actions}>
                {props.children}
            </Card.Actions>
        </Card>
    )
};

const Styles = StyleSheet.create({
    listItem: {
        flex: 1,
        padding: 0,
        marginHorizontal: 15,
        marginVertical: 10
    },
    actions: {
        width: '100%',
        justifyContent: 'space-between'
    }
});
