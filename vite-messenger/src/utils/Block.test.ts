import esmock from 'esmock';
import { expect } from 'chai';
import sinon from 'sinon';
import type BlockType from './Block.ts'
import {before} from "mocha";

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
}

describe('Block', async () => {
  let Block: typeof BlockType;
  let ComponentMock: typeof BlockType;


  before( async () => {
    const { default: ImportedBlock } =  await esmock('./Block', {
      './EventBus.ts': {
        EventBus: class {
          emit = eventBusMock.emit;
          on = eventBusMock.on;
        }
      }
    }) as { default: typeof BlockType };

    Block = ImportedBlock;
    ComponentMock = class extends Block {
      render(){
        const fragment: DocumentFragment = new DocumentFragment();

        fragment.append(document.createElement('div'));

        return fragment;
      }
    };
  })

  it('эмит события init ',  () => {
    new ComponentMock({});

    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });

  it('should fire CDU event on props update', () => {
    const components = new ComponentMock({});

    components.setProps({ test: 'test' });

    expect(eventBusMock.emit.calledWith('flow:component-did-update')).to.eq(true);
  });
});
