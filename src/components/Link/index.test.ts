import { expect } from 'chai';
import sinon from 'sinon';
import { Link } from './index.ts';
import Router from '../../utils/Router.ts';
import {LinkProps} from './index.ts';

describe('Link', () => {
  it('Link component render', () => {
    new Link({ to: '/', router: Router } as LinkProps);
  });

  it('component returns span element', () => {
    const link = new Link({ to: '/', router: Router } as LinkProps);
    const element = link.element;

    expect(element).to.be.instanceof(window.HTMLSpanElement)
  });

  it('go to exact path on click', () => {
    const link = new Link({ to: '/', router: Router } as LinkProps);
    const spy = sinon.spy(Router, 'go');
    const element = link.element as HTMLSpanElement;

    console.log(spy)

    element.click();

    expect(spy.calledOnce).to.eq(true);
  });
});
