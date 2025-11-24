import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IResponse } from '../../core/api/http.interfaces';

@Injectable({
  providedIn: 'root',
})
export class IonApiService {
  list(): Observable<
    IResponse<{ id: string; nome: string; data_criacao: string }>
  > {
    const page1 = [
      {
        id: '0ad3d3fb-b91a-4251-9b9b-b720c23505e9',
        data_criacao: '2023-07-28T10:26:02.482746-03:00',
        nome: 'Blogs',
      },
      {
        id: '0f95ab25-e31f-4b93-ba7d-081a7a2c02de',
        data_criacao: '2023-07-28T10:26:02.482746-03:00',
        nome: 'Governos',
      },
      {
        id: '1257aa0d-ef45-4b7f-af6b-16955048ca68',
        data_criacao: '2023-07-28T10:26:02.482746-03:00',
        nome: 'Hospedagem',
      },
      {
        id: '21948767-7104-499a-926a-d421cb01f579',
        data_criacao: '2023-07-28T10:26:02.482746-03:00',
        nome: 'Encurtador',
      },
      {
        id: '2ed4be3c-b9a8-4a6e-a6c5-942d3d4dd9b6',
        data_criacao: '2023-07-28T10:26:02.482746-03:00',
        nome: 'OnlineVideo',
      },
      {
        id: '67e2eeff-bdcb-4cf9-aa52-ff6ef7891d54',
        data_criacao: '2023-07-28T10:26:02.482746-03:00',
        nome: 'Bancos',
      },
      {
        id: '7d0e8e19-a19b-419a-b683-0eaa2a012120',
        data_criacao: '2023-07-28T10:26:02.482746-03:00',
        nome: 'Governo',
      },
      {
        id: '879a39f2-0bd1-45c7-b673-3126286f0e9e',
        data_criacao: '2023-07-28T10:26:02.482746-03:00',
        nome: 'Compras',
      },
      {
        id: 'b089f543-c222-42f3-8e66-50ec3a067c33',
        data_criacao: '2023-07-28T10:26:02.482746-03:00',
        nome: 'Adulto',
      },
      {
        id: 'b1870d8e-e7fe-44fe-9197-44b9a63d1a31',
        data_criacao: '2023-07-28T10:26:02.482746-03:00',
        nome: 'Noticias',
      },
      {
        id: 'cff103bd-0bf3-4616-9921-16988288e3df',
        data_criacao: '2023-07-28T10:26:02.482746-03:00',
        nome: 'Buscador',
      },
      {
        id: 'deeca719-e40d-4798-8172-564cc0675f5d',
        data_criacao: '2023-07-28T10:26:02.482746-03:00',
        nome: 'RedeSocial',
      },
      {
        id: 'e12b6d24-5e03-41d3-af2f-3de7ee93f404',
        data_criacao: '2023-07-28T10:26:02.482746-03:00',
        nome: 'Imagens',
      },
      {
        id: 'f01d0bf8-027e-4bc4-96ea-8216998f230d',
        data_criacao: '2023-07-28T10:26:02.482746-03:00',
        nome: 'Música',
      },
      {
        id: 'f155d244-6c07-43de-9e16-5c147ae3a08a',
        data_criacao: '2023-07-28T10:26:02.482746-03:00',
        nome: 'Videos',
      },
      {
        id: 'fb276a2e-5d1e-4967-a4f8-7e13e32396ac',
        data_criacao: '2023-07-28T10:26:02.482746-03:00',
        nome: 'Video',
      },
    ];
    return of({
      data: page1,
      total: page1.length,
    });
  }
}
