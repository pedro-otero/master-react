export function setter(type, getPayload) {
  return function (payload) {
    return {
      type,
      data: getPayload(payload),
    };
  };
}

export function notifier(type) {
  return function (id) {
    const complement = id ? { data: { id } } : {};
    return {
      type,
      ...complement,
    };
  };
}
