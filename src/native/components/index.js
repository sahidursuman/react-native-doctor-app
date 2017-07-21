// all components will be imported here
import React, { Component } from 'react';
import { Container } from 'native-base';
import HeaderComponent from './../nativeBaseComponents/header';

export default class AllComponents extends Component {
    render() {
        return (
            <Container>
                <HeaderComponent></HeaderComponent>
            </Container>
        );
    }
}