import { SET_TOUCH, END_SWIPE, setTouch, endSwipe, reduce } from 'state/swipe';

describe('Swipe', () => {
  describe('Actions', () => {
    it('sets touches', () => {
      const action = setTouch({
        currentTarget: {
          offsetWidth: 360,
        },
        touches: {
          item: jest.fn(i => [{ clientX: 5 }][i]),
        },
      });

      expect(action).toEqual({
        type: SET_TOUCH,
        data: {
          x: 5,
          third: 120,
        },
      });
    });

    it('ends swiping', () => {
      const action = endSwipe();

      expect(action).toEqual({ type: END_SWIPE });
    });
  });

  describe('Reducer', () => {
    it('sets the first touch', () => {
      const state = reduce({}, {
        type: SET_TOUCH,
        data: { x: 5 },
      });

      expect(state).toEqual({
        open: 0,
        firstX: 5,
      });
    });

    it('partially opens the menu', () => {
      const state = reduce({
        open: 0,
        firstX: 5,
      }, {
        type: SET_TOUCH,
        data: {
          x: 50,
          third: 120,
        },
      });

      expect(state).toEqual({
        open: 37.5,
        firstX: 5,
      });
    });

    it('fully opens the menu', () => {
      const state = reduce({
        open: 61,
        firstX: 5,
      }, {
        type: END_SWIPE,
      });

      expect(state).toEqual({
        open: 100,
      });
    });
  });
});
