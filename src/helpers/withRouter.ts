import Block from '../utils/Block.ts';
import Router from "../utils/Router.ts";

export interface BlockConstructable<P extends  Record<string, any>> {
  new(props: P): Block<P>;
  EVENTS: typeof Block.EVENTS
}
export interface PropsWithRouter {
  router: typeof Router;
}

export function withRouter<P extends PropsWithRouter>(Component: BlockConstructable<P>){
  type Props = P;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  }
}

