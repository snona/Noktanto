import { Dispatcher } from 'flux';

/**
 * React Flux のDispatcher
 * @extends {Dispatcher}
 */
class AppDispatcher extends Dispatcher {
  dispatch(action = {}) {
    console.log(action);
    super.dispatch(action);
  }
}

export default new AppDispatcher();