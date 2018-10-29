import { startLoad, fail, buildReducer, set, setIntoMapFromArray } from './reducers';

describe('Reducers handlers', () => {
  describe('Set', () => {
    it('sets an item into an empty map', () => {
      const state = set()(undefined, { data: { id: 'item', value: 1 } });

      expect(state).toEqual({
        item: {
          id: 'item', value: 1, loading: false, failed: false,
        },
      });
    });

    it('sets an item into an object (no id con action)', () => {
      const state = set()(undefined, { data: { value: 1 } });

      expect(state).toEqual({
        value: 1, loading: false, failed: false,
      });
    });

    it('sets an item into an map with an item', () => {
      const previousState = {
        item: {
          id: 'item', value: 1, loading: false, failed: false,
        },
      };

      const state = set()(previousState, { data: { id: 'item2', value: 79 } });

      expect(state).toEqual({
        item: {
          id: 'item', value: 1, loading: false, failed: false,
        },
        item2: {
          id: 'item2', value: 79, loading: false, failed: false,
        },
      });
    });

    it('updates an existing item of a map', () => {
      const previousState = {
        item: {
          id: 'item', value: 1, loading: false, failed: false,
        },
      };

      const state = set()(previousState, { data: { id: 'item', value: 79 } });

      expect(state).toEqual({
        item: {
          id: 'item', value: 79, loading: false, failed: false,
        },
      });
    });

    it('updates values in an object', () => {
      const previousState = {
        value: 1, loading: false, failed: false,
      };

      const state = set()(previousState, { data: { value: 79 } });

      expect(state).toEqual({
        value: 79, loading: false, failed: false,
      });
    });

    it('adds a value to an existing item of a map', () => {
      const previousState = {
        item: {
          id: 'item', value: 1, loading: false, failed: false,
        },
      };

      const state = set()(previousState, { data: { id: 'item', foo: 'bar' } });

      expect(state).toEqual({
        item: {
          id: 'item', value: 1, foo: 'bar', loading: false, failed: false,
        },
      });
    });

    it('adds a value to an existing object', () => {
      const previousState = {
        value: 1, loading: false, failed: false,
      };

      const state = set()(previousState, { data: { foo: 'bar' } });

      expect(state).toEqual({
        value: 1, foo: 'bar', loading: false, failed: false,
      });
    });

    it('sets partially an item into an empty map', () => {
      const state = set('y')(undefined, {
        data: {
          id: 'item', x: 1, y: 2, z: 3,
        },
      });

      expect(state).toEqual({
        item: {
          y: 2, loading: false, failed: false,
        },
      });
    });

    it('does not override existing data', () => {
      const state = set('y')({
        item: {
          id: 'item', existingValue: 'something',
        },
      }, {
        data: {
          id: 'item', x: 1, y: 2, z: 3,
        },
      });

      expect(state).toEqual({
        item: {
          id: 'item', existingValue: 'something', y: 2, loading: false, failed: false,
        },
      });
    });

    it('accepts action data = null', () => {
      const state = set()({ v1: 1, v2: 2 }, {
        data: null,
      });

      expect(state).toEqual({
        v1: 1, v2: 2, loading: false, failed: false,
      });
    });
  });

  describe('Set many into map', () => {
    it('performs a set into map for many items of a given array name', () => {
      const state = setIntoMapFromArray('items')(undefined, {
        data: {
          items: [{ id: 'item', value: 1 }],
        },
      });

      expect(state).toEqual({
        item: {
          id: 'item', value: 1, loading: false, failed: false,
        },
      });
    });
  });

  describe('fail', () => {
    it('sets an unexisting item as failed', () => {
      const state = fail(undefined, { data: { id: 'item' } });

      expect(state).toEqual({
        item: { loading: false, failed: true },
      });
    });

    it('sets an existing item as failed', () => {
      const previousState = {
        item: { v: 1, x: 2 },
      };

      const state = fail(previousState, { data: { id: 'item' } });

      expect(state).toEqual({
        item: {
          v: 1, x: 2, loading: false, failed: true,
        },
      });
    });

    it('sets the whole object as failed (no id in action)', () => {
      const state = fail(undefined, {});

      expect(state).toEqual({ loading: false, failed: true });
    });
  });

  describe('start load', () => {
    it('sets an unexisting item as loading', () => {
      const state = startLoad(undefined, { data: { id: 'item' } });

      expect(state).toEqual({
        item: { loading: true, failed: false },
      });
    });

    it('sets an existing item as loading', () => {
      const previousState = {
        item: { v: 1, x: 2 },
      };

      const state = startLoad(previousState, { data: { id: 'item' } });

      expect(state).toEqual({
        item: {
          v: 1, x: 2, loading: true, failed: false,
        },
      });
    });

    it('sets the whole object as loading (no id in action)', () => {
      const state = startLoad(undefined, {});

      expect(state).toEqual({ loading: true, failed: false });
    });
  });

  describe('Build reducer', () => {
    it('Applies correct action handler', () => {
      const reduce = buildReducer([
        ['DUPLICATE', state => state * 2],
      ]);

      const newState = reduce(19, { type: 'DUPLICATE' });

      expect(newState).toEqual(38);
    });

    it('Returns unmodified state if action is not handled', () => {
      const reduce = buildReducer([
        ['DUPLICATE', state => state * 2],
      ]);

      const newState = reduce(19, { type: 'POWER' });

      expect(newState).toEqual(19);
    });
  });
});
