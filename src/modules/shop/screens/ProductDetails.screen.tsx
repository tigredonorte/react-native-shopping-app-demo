import { useObservable } from '@ngneat/react-rxjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Caption, Card, Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { FetchStateEmpty } from '~components/FetchStatus/components/FetchStateEmpty';
import { FetchStateLoading } from '~components/FetchStatus/components/FetchStateLoading';
import { ShopRoutes, ShopStackType } from '~routes/navigator/ShopNavigator.route.types';
import { getStyle, ScreenData } from '~styles/responsiveness';

import { getProductById } from '../store/products.selectors';

interface ProductDetailsInput extends NativeStackScreenProps<ShopStackType, ShopRoutes.ProductDetails> { } 

export const ProductDetailsScreen: React.FunctionComponent<ProductDetailsInput> = (props: ProductDetailsInput) => {
    const [ Styles ] = useObservable(getStyle(ProductDetailsStyles));
    const product = useSelector(getProductById(props.route.params.product.id));

    useEffect(() => {
        props.navigation.setOptions({title: props.route.params.product.title});
    }, []);

    if (!product) {
        return (
            <FetchStateLoading isLoading={true}></FetchStateLoading>
        );
    }

    if (!product.id) {
        return (
            <FetchStateEmpty
                isEmpty={true}
                emptyText="No products found"
            ></FetchStateEmpty>
        );
    }
    return (
        <ScrollView contentContainerStyle={Styles.container}>
            <Card style={Styles.card}>
                <Card.Title title={product.title} />
                <Card.Cover source={{uri: product.imageUrl}} />
                <Card.Actions style={Styles.buttonArea}>
                    <Button icon="cart">
                        Add to Cart
                    </Button>
                </Card.Actions>
                <Card.Content>
                    <Caption>$ {product.price}</Caption>
                    <Paragraph>{product.description}</Paragraph>
                </Card.Content>
            </Card>
        </ScrollView>
    );
};


const ProductDetailsStyles = (screenData: ScreenData) => StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    card: {
        width: '100%',
    },
    textStyle: {
        textAlign: 'center'
    },
    buttonArea: {
        width: '100%',
        justifyContent: 'center'
    }
});
