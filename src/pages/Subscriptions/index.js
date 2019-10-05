import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Header from '~/components/Header';
import Background from '~/components/Background';

import {
  Container,
  List,
  Meetup,
  MeetupImage,
  MeetupContent,
  MeetupTitle,
  MeetupDetail,
  MeetupDetailText,
  MeetupSubmit,
  MeetupSubmitText,
  Loading,
  EmptyContainer,
  EmptyText,
} from './styles';

export default function Subscriptions({ navigation }) {
  const [meetups, setMeetups] = useState([]);
  const [hasMeetups, setHasMeetups] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [endPage, setEndPage] = useState(false);

  async function loadMeetups(pageSelected = 1) {
    try {
      if (!endPage) {
        const response = await api.get('subscriptions', {
          params: { page: pageSelected },
        });

        response.data.forEach(m => {
          m.meetup.date = format(
            parseISO(m.meetup.date),
            "d 'de' MMMM, 'às' H'h'",
            {
              locale: pt,
            }
          );
        });

        const subscriptions = response.data.map(subs => {
          subs.meetup.id = subs.meetup_id;
          return subs.meetup;
        });

        setMeetups(
          pageSelected > 1 ? [...meetups, ...subscriptions] : subscriptions
        );
        setHasMeetups(true);
        setPage(pageSelected);
      }
    } catch (err) {
      setEndPage(true);
      setHasMeetups(pageSelected > 1);
    }

    setRefreshing(false);
    setLoading(false);
  }

  useEffect(() => {
    loadMeetups();
  }, []); //eslint-disable-line

  function loadMore() {
    if (meetups.length > 1) loadMeetups(page + 1);
  }

  function refreshList() {
    setEndPage(false);
    setRefreshing(true);
    setMeetups([]);
    loadMeetups();
  }

  async function handleCancelSubscription(meetup_id) {
    await api.delete(`subscriptions/${meetup_id}`);
    Alert.alert(
      'Inscrição cancelada!',
      'Você cancelou a sua inscrição com sucesso.'
    );
    loadMeetups();
  }

  return (
    <Background>
      <Container>
        <Header navigation={navigation} />
        {loading ? (
          <Loading />
        ) : hasMeetups ? (
          <List
            onEndReachedThreshold={0.2}
            onEndReached={loadMore}
            onRefresh={refreshList}
            refreshing={refreshing}
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup>
                <MeetupImage source={{ uri: item.banner.url }} />
                <MeetupContent>
                  <MeetupTitle>{item.title}</MeetupTitle>
                  <MeetupDetail>
                    <Icon name="event" size={20} color="#999" />
                    <MeetupDetailText>{item.date}</MeetupDetailText>
                  </MeetupDetail>
                  <MeetupDetail>
                    <Icon name="room" size={20} color="#999" />
                    <MeetupDetailText>{item.location}</MeetupDetailText>
                  </MeetupDetail>
                  <MeetupDetail>
                    <Icon name="person" size={20} color="#999" />
                    <MeetupDetailText>
                      Organizador: {item.user.name}
                    </MeetupDetailText>
                  </MeetupDetail>
                  <MeetupSubmit
                    onPress={() => handleCancelSubscription(item.id)}
                  >
                    <MeetupSubmitText>Cancelar Inscrição</MeetupSubmitText>
                  </MeetupSubmit>
                </MeetupContent>
              </Meetup>
            )}
          />
        ) : (
          <EmptyContainer>
            <EmptyText>Você ainda não se inscreveu em nenhum meetup.</EmptyText>
          </EmptyContainer>
        )}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
