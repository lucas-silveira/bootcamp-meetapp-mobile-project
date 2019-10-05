import styled from 'styled-components/native';

import logo from '~/assets/M.png';

export const Wrapper = styled.SafeAreaView`
  flex: 0 0 auto;
  flex-direction: row;
  background-color: #18161f;
`;

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  width: 23px;
  height: 23px;
`;
