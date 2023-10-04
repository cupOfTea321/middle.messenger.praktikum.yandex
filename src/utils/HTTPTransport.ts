 export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete'
}

type Options = {
  method: Method;
  data?: any;
};
 type HTTPMethod = <R=unknown>(path: string, options?: unknown) => Promise<R>
export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get: HTTPMethod = (path = '/')  => {
    return this.request<Response>(this.endpoint + path);
  }

  public post: HTTPMethod = (path, data?) =>  {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Post,
      data,
    });
  }

  public put: HTTPMethod = (path: string, data: unknown) => {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Put,
      data,
    });
  }

  public patch<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Patch,
      data,
    });
  }

  public delete: HTTPMethod = (path, data?) => {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Delete,
      data
    });
  }

  private request<Response>(url: string, options: Options = {method: Method.Get}): Promise<Response> {
    const {method, data} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = () => {

        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({reason: 'abort'});
      xhr.onerror = () => reject({reason: 'network error'});
      xhr.ontimeout = () => reject({reason: 'timeout'});

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Method.Get || !data) {
        xhr.send();
      }else if(data instanceof FormData){
        xhr.send(data);
      }
      else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
