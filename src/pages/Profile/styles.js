import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View``;

export const Separator = styled.View`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

export const Form = styled.ScrollView.attrs({
  showsVericalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const LogoutButton = styled(Button)`
  background-color: #f64c75;
  margin-top: 10px;
`;
