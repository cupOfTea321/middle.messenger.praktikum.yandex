import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';

import { EventBus } from './EventBus';

// private - доступен только внутри класса
// public - может быть вызван откуда угодно
// protected - доступен внутри класса и у наследников
// Нельзя создавать экземпляр данного класса
class Block<P extends Record<string, any> = any> {
  // ИМИТАЦИЯ ЖИЗНЕННЫХ ЦИКЛОВ
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"

    // НЕ ХВАТАЕТ UNMOUNT, НО МЫ НЕ ЗАБОТИМСЯ ОБ УТЕЧКАХ ПАМЯТИ
  } as const;

  public id = nanoid(6);
  protected props: P;
  public children: Record<string, Block>;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: P; };

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = "div", propsWithChildren: P) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this._meta = {
      tagName,
      props: props as P
    };

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Block>} {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as P, children };
  }

  _addEvents() {
    const {events = {}} = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    // ПОДПИСКА МЕТОДА _render НА СОБЫТИЕ RENDER
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  // СОЗДАНИЕ КОМПОНЕНТЫ ОБЁРТКИ
  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  // ИНИЦИАЛИЗИРУЮЩИЙ МЕТОД
  private _init() {
    // СОЗДАНИЕ КОМПОНЕНТА - ОБЁРТКИ
    this._createResources();

    // САМА ИНИЦИАЛИЗАЦИЯ
    this.init();

    // ВЫЗОВ ПЕРВОГО МЕТОДА
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  // ОПОВЕЩЕНИЕ О ПОЯВЛЕНИИ КОМПОНЕНТА НА СТРАНИЦЕ
  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  // НЕОБХОДИМО ВЫЗВАТЬ СНАРУЖИ, КОГДА БЛОК ПОЯВИЛСЯ
  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // ВЫЗЫВАЕТСЯ ПОСЛЕ ОБНОВЛЕНИЯ ПРОПСОВ
  protected componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }

  // ИЗМЕНЕНИЕ ВНЕШНИХ ПАРАМЕТРОВ
  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  // РЕНДЕР КОМПОНЕНТА
  private _render() {
    const fragment = this.render();

    this._element!.innerHTML = '';

    this._element!.append(fragment);

    this._addEvents();
  }

  // HANDLEBARS ПРЕОБРАЗУЕТ В HTML
  // ПЕРЕДАЧА ПРОИСХОДИТ ЧЕРЕЗ СТРОКУ,
  // ПОЭТОМУ ВАЖНО ГДЕ-ТО СОХРАНИТЬ
  // ПРИВЯЗАННЫЕ СОБЫТИЯ
  // ОБРАБОТЧИКИ ВАЖНО ПЕРЕНОСИТЬ ОТДЕЛЬНО
  // СОЕДИНЯЕТ ШАБЛОНИЗАТОР И ТРЮК С ЗАГЛУШКОЙ
  protected compile(template: string, context: any) {
    const contextAndStubs = { ...context };

    // СОЗДАЁМ ЗАГЛУШКУ, ЧТОБЫ ТУДА СРАЗУ ПЕРЕНЕСТИ ИВЕНТЫ ??
    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)){
        // случай с массивом
      }
      contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
    });

    // ПЕРЕДАЁМ ШАБЛОН
    const html = Handlebars.compile(template)(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    });

    return temp.content;
  }


  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  // ПРОКСИРОВАНИЕ ВНЕШНИХ ПАРАМЕТРОВ
  _makePropsProxy(props: P) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target }

        target[prop as keyof P] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}

export default Block;
