import React, { useState, useCallback, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import {TextInputProps} from 'react-native'
import { Container, TextInput, Icon } from './styles';

import { useField } from '@unform/core';


interface InputProps extends TextInputProps{
    name: string;
    icon: string;
}
interface InputValueReference {
    value: string;
}

interface InputRef {
    focus(): void;
}

const Input: React.RefForwardingComponent< InputRef , InputProps> = ({ name,icon, ...rest}, ref) => {
    const inputElementRef = useRef<any>(null);
    
    const { registerField, defaultValue = '', fieldName, error } = useField(name);
    
    const inputValueRef = useRef<InputValueReference>({value: defaultValue});

    const [ isFocused, setFocused ] = useState(false)
    const [ isFilled, setFilled ] = useState(false)

    const handleInputFocus = useCallback(() => {
        setFocused(true);
    }, [])

    const handleInputBlur = useCallback(() => {
        setFocused(false);

        setFilled(!!inputValueRef.current.value) 
    }, [])

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.focus();
        }
    }));

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value) {
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value });
            },
            clearValue() {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            }
        })
    }, [fieldName, registerField])



   return (
    <Container isFocused={isFocused} isErrored={!!error}>
     <Icon name={icon} size={20} color={isFocused || isFilled ? "#FF9000" : "#666360"} />

     <TextInput 
     ref={inputElementRef}
     keyboardAppearance="dark" 
     placeholderTextColor="#666360" 
     defaultValue={defaultValue}
     onFocus={handleInputFocus}
     onBlur={handleInputBlur}
     onChangeText={(value) => {inputValueRef.current.value = value}} 
     {...rest}
     />

    </Container>
   )
};

export default forwardRef(Input);