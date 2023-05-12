import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class HttpRequestService {
  constructor(private httpService: HttpService) {}

  async get<T = any>(url: string, headers?: any): Promise<T> {
    const response = await this.httpService
      .get<T>(url, { headers })
      .toPromise();
    return response.data;
  }

  async post<T = any>(url: string, data: any, headers?: any): Promise<T> {
    const response = await this.httpService
      .post<T>(url, data, { headers })
      .toPromise();
    return response.data;
  }
}
