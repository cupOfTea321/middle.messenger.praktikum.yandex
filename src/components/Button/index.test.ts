import sinon from 'sinon';
import { Button } from './index.ts';

describe('Button', () => {
  it('Button on click function', () => {
    const onClickFake = sinon.fake();
    const button = new Button({
      label: 'btn',
      buttonType: 'button',
      typeDiv: true,
      onClick: onClickFake,
    });

    const element = button.element as HTMLButtonElement;

    element.click();

    sinon.assert.calledOnce(onClickFake);
  });
});
