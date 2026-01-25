import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  private readonly backendUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
  }

  async forwardToBackend(path: string, method: string, data?: any, headers?: any) {
    const url = `${this.backendUrl}${path}`;
    return this.forwardRequest(url, method, data, headers);
  }

  private async forwardRequest(url: string, method: string, data?: any, headers?: any) {
    try {
      const config: any = {
        method: method.toLowerCase(),
        url,
        headers: headers || {},
      };

      if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        config.data = data;
      }

      if (method === 'GET' && data) {
        config.params = data;
      }

      const response = await firstValueFrom(this.httpService.request(config));
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data;
      }
      throw error;
    }
  }
}
