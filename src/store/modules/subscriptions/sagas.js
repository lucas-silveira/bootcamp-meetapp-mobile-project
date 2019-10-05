import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { addSubscriptionSuccess } from './actions';

export function* addSubscription({ payload }) {
  try {
    yield call(api.post, 'subscriptions', {
      meetup_id: payload.meetup_id,
    });

    // history.push('/dashboard');
    Alert.alert(
      'Inscrição feita com sucesso!',
      'Parabéns! Você está inscrito nesse meetup.'
    );

    yield put(addSubscriptionSuccess(payload.meetup_id));
  } catch (err) {}
}
export default all([takeLatest('@subscriptions/ADD_REQUEST', addSubscription)]);
