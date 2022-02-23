import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Caption, Card } from 'react-native-paper';

import { ProductModel } from '../store/model/product.model';

interface ProductListItemInput {
    item: ProductModel;
    onClick: (productId: string) => void;
    add2cart: (productId: string) => void;
}

export const ProductListItemComponent: FunctionComponent<ProductListItemInput> = (props: ProductListItemInput) => {

    const navigate = () => props.onClick(props.item.id);
    const add2cart = () => props.add2cart(props.item.id);

    return (
        <Card style={Styles.listItem}>
            <Card.Cover source={{ uri: props.item.imageUrl }} />
            <Card.Title title={props.item.title} subtitle={props.item.price} />
            <Card.Actions style={Styles.actions}>
                <Button onPress={navigate}>Details</Button>
                <Button onPress={add2cart}>Add to cart</Button>
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
