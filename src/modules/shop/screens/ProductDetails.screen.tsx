import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Caption, Card, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStateContainer } from '~components/FetchStatus/FetchStateContainer';

import { ProductRoutes, ProductStackType } from '../routes/ProductsNavigator.types';
import { AddToCartAction } from '../store/cart/cart.action';
import { getCartItemByProductId } from '../store/cart/cart.selectors';
import { getProductById } from '../store/products/products.selectors';

interface ProductDetailsInput extends NativeStackScreenProps<ProductStackType, ProductRoutes.ProductDetails> { }

export const ProductDetailsScreen: FunctionComponent<ProductDetailsInput> = (props) => {
    const product = useSelector(getProductById(props.route.params.product.id));
    const chartItem = (useSelector(getCartItemByProductId(props.route.params.product.id)))
    const total = chartItem?.amount ?? 0;
    const dispatch = useDispatch();
    const add2cart = () => product ? dispatch(AddToCartAction(product)) : null;

    useEffect(() => {
        props.navigation.setOptions({ title: props.route.params.product.title });
    }, []);

    return (
        <FetchStateContainer
            empty={{ isEmpty: !product?.id, emptyBtnText: "No products found" }}
            loading={!product}
        >
            <ScrollView contentContainerStyle={Styles.container}>
                <Card style={Styles.card}>
                    <Card.Title title={product?.title} />
                    <Card.Cover source={{ uri: product?.imageUrl }} />
                    <Card.Actions style={Styles.buttonArea}>
                        <Button icon="cart" onPress={add2cart}>
                            Add to Cart ({total})
                        </Button>
                    </Card.Actions>
                    <Card.Content>
                        <Caption>$ {product?.price}</Caption>
                        <Paragraph>{product?.description}</Paragraph>
                    </Card.Content>
                </Card>
            </ScrollView>
        </FetchStateContainer>
    );
};


const Styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    card: {
        width: '100%',
    },
    buttonArea: {
        width: '100%',
        justifyContent: 'center'
    }
});
