import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Wrapper, Container, Logo } from './styles';

export default function Header({ navigation }) {
  return (
    <Wrapper>
      <Container>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Logo />
        </TouchableOpacity>
      </Container>
    </Wrapper>
  );
}
