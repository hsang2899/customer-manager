

export default function reducer(state, action) {
  switch (action.type) {
    case 'filter':
      return {count: state.count + 1};
    case '':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}