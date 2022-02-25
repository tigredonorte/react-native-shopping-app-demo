import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { CartItemModel } from '../store/cart/cart.model';

import { BasicProduct, ProductModel } from '../store/products/product.model';

interface ProductListItemInput {
    item: ProductModel;
    chartItem?: CartItemModel;
    onClick: (product: BasicProduct) => void;
    add2cart?: (product: ProductModel) => void;
}

export const ProductListItemComponent: FunctionComponent<ProductListItemInput> = (props: ProductListItemInput) => {

    const navigate = () => props.onClick(props.item);
    const add2cart = () => props.add2cart && props.add2cart(props.item);
    const total =  props?.chartItem?.amount ?? 0;

    return (
        <Card style={Styles.listItem} onPress={navigate}>
            <Card.Cover source={{ uri: props.item.imageUrl }} />
            <Card.Title title={props.item.title} subtitle={props.item.price} />
            <Card.Actions style={Styles.actions}>
                <Button onPress={navigate}>Details</Button>
                <Button onPress={add2cart} icon="cart">
                    Add to cart ({total})
                </Button>
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
