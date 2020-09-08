import React, {useCallback, useRef} from 'react';
import { Image, View, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'

import getValidationErrors from '../../utils/getValidationErrors'

import * as Yup from 'yup';

import {useAuth} from '../../hooks/auth'


import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.png'

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles'

interface SignInFormData {
    email: string,
    password: string
}

const SignIn: React.FC = () => {
    const navigation = useNavigation();

    const {signIn, user} = useAuth();

    console.log(user)

    // const { addToast } = useToast();

    // const history = useHistory();

    const formRef = useRef<FormHandles>(null);

    const passwordRef = useRef<TextInput>(null);

    // const handleSignIn = useCallback((data: object) => {
    //     console.log(data)
    // }, []);

    const handleSignIn = useCallback(async (data: SignInFormData) => {
        try{
            formRef.current?.setErrors({})

            const schema = Yup.object().shape({
                email: Yup.string()
                .required('E-mail obrigatório')
                .email('digite um email válido'),
                password: Yup.string().required('Senha Obrigatória'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await signIn({
                email: data.email,
                password: data.password
            });

            // history.push('/dashboard');

        } catch(err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err)

                formRef.current?.setErrors(errors);

                return
            }

            Alert.alert("Error Auth", "Erro na Auth")
            
            // addToast({
            //     type: 'error',
            //     title: 'Erro na Autenticação',
            //     description: 'Ocorreu um erro na Autenticação'
            // })
        } 
      
    }, [signIn]);


    return (
        <>
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flex: 1 }}>
        <Container>
            <Image source={logoImg} />
            <View>
              <Title> Faça Login </Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
            <Input autoCorrect={false} autoCapitalize="none" keyboardType="email-address" name="email" icon="mail" placeholder="E-mail" returnKeyType="next" onSubmitEditing={() => {
                passwordRef.current?.focus();
                }}/>

            <Input name="password" icon="lock" placeholder="Senha" secureTextEntry returnKeyType="send" onSubmitEditing={() => {
                formRef.current?.submitForm();
                }} ref={passwordRef} />

            <Button onPress={() => {
                formRef.current?.submitForm();
                }}>
                    Entrar
                </Button>
            </Form>

            <ForgotPassword onPress={() => {console.log("Chave")}}>
                <ForgotPasswordText> Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>


        </Container>

        <CreateAccountButton onPress={()=> navigation.navigate("SignUp")}>
            <Icon name="log-in" size={20} color="#ff9000" />
            <CreateAccountButtonText>Criar uma Conta</CreateAccountButtonText>
        </CreateAccountButton>
        </ScrollView>
    </KeyboardAvoidingView>
    </>
    );
}

export default SignIn;