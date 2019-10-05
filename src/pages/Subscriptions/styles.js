import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const Meetup = styled.View`
  margin-bottom: 30px;
`;

export const MeetupImage = styled.Image`
  height: 140px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const MeetupContent = styled.View`
  background-color: #fff;
  padding: 16px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const MeetupTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 14px;
`;

export const MeetupDetail = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

export const MeetupDetailText = styled.Text`
  color: #999;
  font-size: 14px;
  margin-left: 6px;
`;

export const MeetupSubmit = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background-color: #f94d6a;
  padding: 10px;
  margin: 20px 0 0;
  border-radius: 4px;
`;

export const MeetupSubmitText = styled.Text`
  color: #fff;
`;

export const Loading = styled.ActivityIndicator.attrs({
  color: '#f94d6a',
  size: 50,
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const EmptyContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  margin: 30px;
  border-radius: 4px;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  text-align: center;
`;
