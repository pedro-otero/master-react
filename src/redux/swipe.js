import { buildReducer } from 'state/base/reducers';

export const SET_TOUCH = 'SET_TOUCH';
export const END_SWIPE = 'END_SWIPE';
export const CLOSE_MENU = 'CLOSE_MENU';

export function setTouch(event) {
  return {
    type: SET_TOUCH,
    data: {
      x: event.touches.item(0).clientX,
      third: event.currentTarget.offsetWidth / 3,
    },
  };
}

export function endSwipe() {
  return {
    type: END_SWIPE,
  };
}

export function closeMenu() {
  return {
    type: CLOSE_MENU,
  };
}

export const reduce = buildReducer([
  [SET_TOUCH, (state, { data }) => {
    if (!state.firstX) {
      return {
        open: 0,
        firstX: data.x,
        width: data.width,
      };
    }
    return {
      open: (100 * (data.x - state.firstX)) / data.third,
      firstX: state.firstX,
    };
  }],
  [END_SWIPE, ({ open }) => ({ open: open > 60 ? 100 : 0 })],
  [CLOSE_MENU, () => ({ open: 0 })],
], { open: 0 });
