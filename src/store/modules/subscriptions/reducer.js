import produce from 'immer';

export default function subscriptions(state = [], action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@subscriptions/ADD_SUCCESS': {
        draft.push(action.payload.meetup_id);
        break;
      }
      default:
    }
  });
}
