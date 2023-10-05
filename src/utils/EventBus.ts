type Handler<A extends any[] = unknown[]> = (...args: A) => void;
type MapInterface<P> = P[keyof P]

export class EventBus<
  E extends Record<string, string> = Record<string, string>,
  Args extends Record<MapInterface<E>, any[]> = Record<string, any[]>
> {
  private readonly listeners: {
    [K in MapInterface<E>]?: Handler<Args[K]>[]
  } = {};

  on<Event extends MapInterface<E>>(event: Event, callback: Handler<Args[Event]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }


    this.listeners[event]?.push(callback);
  }

  off<Event extends MapInterface<E>>(event: Event, callback: Handler<Args[Event]>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]!.filter(
      listener => listener !== callback
    );
  }

  // АНАЛОГ DISPATCH ИЗ REDUX
  emit<Event extends MapInterface<E>>(event: Event, ...args: Args[Event]) {
    if (!this.listeners[event]) {
      // throw new Event(`Нет события: ${event}`);
      return
    }

    this.listeners[event]!.forEach(listener => {
      listener(...args);
    });
  }
}

// const eventBus = new EventBus()
// eventBus.on('event', (data) => {
//   console.log(data)
// })
// eventBus.on('event', (data) => {
//   console.log('second handler ', data)
// })
// // eventBus.emit('event', {property: 'value'})
// window.eventBus = eventBus

// ДАННЫЙ ПАТТЕРН ИСПОЛЬЗУЮТ ДЛЯ УМЕНЬШЕНИЯ СВЯЗНОСТИ
// КОДА. ОТПРАВКА СОБЫТИЙ ПРОИСХОДИТ ЧЕРЕЗ ШИНУ
