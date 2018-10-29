import { setter, notifier } from './actions';

describe('REDUX: Base action creator generator', () => {
  describe('Set', () => {
    it('Creates action with type and payload', () => {
      const getPayload = n => n * n;
      const createAction = setter('ACTION_TYPE', getPayload);
      const action = createAction(3);
      expect(action).toEqual({
        type: 'ACTION_TYPE',
        data: 9,
      });
    });
  });

  describe('Notify', () => {
    it('Creates action with type and payload', () => {
      const createAction = notifier('ACTION_TYPE');
      const action = createAction(1);
      expect(action).toEqual({
        type: 'ACTION_TYPE',
        data: {
          id: 1,
        },
      });
    });

    it('Creates action without id', () => {
      const createAction = notifier('ACTION_TYPE');
      const action = createAction();
      expect(action).toEqual({
        type: 'ACTION_TYPE',
      });
    });
  });
});
