import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';
import HTTPTransport from './HTTPTransport.ts';


describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });

    instance = new HTTPTransport('/auth');
  });

  afterEach(() => {
    requests = [];
  })

  it('.get() should send GET request', () => {
    instance.get('/user');

    const [request] = requests;

    expect(request.method).to.eq('Get');
  });
  it('.post()  should send POST request', () => {
    instance.post('/user');

    const [request] = requests;

    expect(request.method).to.eq('Post');
  });

  it('.put()  should send PUT request', () => {
    instance.put('/user', 1);

    const [request] = requests;

    expect(request.method).to.eq('Put');
  });

  it('.delete()  should send DELETE request', () => {
    instance.delete('/user', 1);

    const [request] = requests;

    expect(request.method).to.eq('Delete');
  });
});
