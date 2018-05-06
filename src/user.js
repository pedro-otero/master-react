const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const expiry = Number(localStorage.getItem('expiry'));
  const now = new Date().getTime();
  const difference = now - expiry;
  return typeof token !== 'undefined' && difference <= 0;
};
export default () => ({
  isAuthenticated,
});
