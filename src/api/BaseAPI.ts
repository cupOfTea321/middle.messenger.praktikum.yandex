import HTTPTransport from "../utils/HTTPTransport.ts";

export default abstract class BaseAPI {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  public  create?(data: unknown): Promise<unknown>;

  public  read?(identifier?: string | number): Promise<unknown>;

  public  update?(identifier: string | number, data: unknown): Promise<unknown>;

  public  delete?(identifier: string | number): Promise<unknown>;
}
