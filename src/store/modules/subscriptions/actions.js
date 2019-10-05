export function addSubscriptionRequest(meetup_id) {
  return {
    type: '@subscriptions/ADD_REQUEST',
    payload: { meetup_id },
  };
}

export function addSubscriptionSuccess(meetup_id) {
  return {
    type: '@subscriptions/ADD_SUCCESS',
    payload: { meetup_id },
  };
}
