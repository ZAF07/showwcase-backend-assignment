// This module inits an Axios client. It is used by the adapters/http/external adapters
import axios, { AxiosInstance } from "axios";

// Creates and return an Axios Class. It can perform modification to the Axios instance during runtim. Can be used by any services
export default class AxiosClient {
  public axiosInstance: AxiosInstance;
  constructor(
    private baseURL: string,
    private path: string,
    private accept: string,
    private timeout: number
  ) {
    this.baseURL = baseURL;
    this.path = path;
    this.accept = accept;
    this.timeout = timeout;

    this.createInstance();
  }

  // Expose a public method to switch hosts. This is the interface that all API client will implement.
  public swithcHost(): void {}

  private createInstance() {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {
        Accept: this.accept,
      },
    });
  }

  // public async executeGet(): Promise<any> {
  //   const response = await this.axiosInstance.get(this.path);
  //   return response;
  // }
  // public async executeGetAll(): Promise<any> {
  //   const res = await this.axiosInstance.get("/all");
  // }
}
