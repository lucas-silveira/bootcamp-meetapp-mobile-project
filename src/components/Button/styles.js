import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  align-items: center;
  justify-content: center;
  height: 46px;
  background-color: #F94D6A;
  border-radius: 4px;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;
