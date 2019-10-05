import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { format, subDays, addDays, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
  DateView,
  DateButton,
  DateText,
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

export default function Dashboard({ navigation }) {
  const [meetups, setMeetups] = useState([]);
  const [hasMeetups, setHasMeetups] = useState(false);
  const [date, setDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [endPage, setEndPage] = useState(false);

  const userId = useSelector(state => state.auth.user_id);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  const loadMeetups = useCallback(
    async (pageSelected = 1) => {
      try {
        if (!endPage) {
          const response = await api.get('meetups', {
            params: { date, page: pageSelected },
          });

          response.data.forEach(m => {
            m.date = format(parseISO(m.date), "d 'de' MMMM, 'às' H'h'", {
              locale: pt,
            });
            m.userSubscription =
              m.Subscriptions.findIndex(subs => subs.user_id === userId) > -1;
          });

          setMeetups(
            pageSelected > 1 ? [...meetups, ...response.data] : response.data
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
    },
    [date, page]//eslint-disable-line
  );

  useEffect(() => {
    loadMeetups();
  }, [date]); //eslint-disable-line

  function loadMore() {
    if (meetups.length > 1) loadMeetups(page + 1);
  }

  function refreshList() {
    setEndPage(false);
    setRefreshing(true);
    setMeetups([]);
    loadMeetups();
  }

  function handlePrevDay() {
    setEndPage(false);
    setLoading(true);
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setEndPage(false);
    setLoading(true);
    setDate(addDays(date, 1));
  }

  async function handleSubscription(meetup_id) {
    await api.post('subscriptions', {
      meetup_id,
    });
    Alert.alert(
      'Inscrição feita com sucesso!',
      'Parabéns! Você está inscrito nesse meetup.'
    );
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
        <DateView>
          <DateButton onPress={handlePrevDay}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </DateButton>
          <DateText>{dateFormatted}</DateText>
          <DateButton onPress={handleNextDay}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </DateButton>
        </DateView>

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
                  {item.userSubscription ? (
                    <MeetupSubmit
                      onPress={() => handleCancelSubscription(item.id)}
                    >
                      <MeetupSubmitText>Cancelar Inscrição</MeetupSubmitText>
                    </MeetupSubmit>
                  ) : (
                    <MeetupSubmit onPress={() => handleSubscription(item.id)}>
                      <MeetupSubmitText>Fazer inscrição</MeetupSubmitText>
                    </MeetupSubmit>
                  )}
                </MeetupContent>
              </Meetup>
            )}
          />
        ) : (
          <EmptyContainer>
            <EmptyText>Não há nenhum meetup nesta data.</EmptyText>
          </EmptyContainer>
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};
