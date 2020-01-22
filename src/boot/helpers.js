import { Notify } from 'quasar';

export default ({ Vue }) => {
  const notify = (message, color) => Notify.create({
    message,
    color,
  });
  const notifyError = message => notify(message, 'red-9');

  const helpers = {
    notify,
    notifyError,
  };

  Vue.prototype.$helpers = helpers;
};
