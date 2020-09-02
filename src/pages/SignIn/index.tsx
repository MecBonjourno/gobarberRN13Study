import React from 'react';
import { Image, View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.png'

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles'


const SignIn: React.FC = () => {
    return (
        <>
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flex: 1 }}>
        <Container>
            <Image source={logoImg} />
            <View>
              <Title> Faça Login </Title>
            </View>
            <Input name="email" icon="mail" placeholder="E-mail"/>

            <Input name="password" icon="lock" placeholder="Senha"/>

            <Button onPress={() => {console.log("Aham")}}>Entrar</Button>

            <ForgotPassword onPress={() => {console.log("Chave")}}>
                <ForgotPasswordText> Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>


        </Container>

        <CreateAccountButton >
            <Icon name="log-in" size={20} color="#ff9000" />
            <CreateAccountButtonText>Criar uma Conta</CreateAccountButtonText>
        </CreateAccountButton>
        </ScrollView>
    </KeyboardAvoidingView>
    </>
    );
}

export default SignIn;