import { $api } from '@food-app/frontend/data-access/https';
import { AxiosResponse } from 'axios';
import {
  IngredientAddEditModel,
  IngredientListModel,
  IngredientModel,
} from '../model/IngredientModel';
import {
  RequestIsDeletedModel,
  ResponseAdd,
  ResponsePaginated,
  ResponseStatus,
} from '@food-app/core';

export class IngredientService {
  static async list(): Promise<
    AxiosResponse<ResponsePaginated<IngredientListModel>>
  > {
    return $api.get<ResponsePaginated<IngredientListModel>>('/ingredient');
  }

  static async retrieve(
    ingredientId: string
  ): Promise<AxiosResponse<IngredientModel>> {
    return $api.get<IngredientModel>(`/ingredient/${ingredientId}`);
  }

  static async create(
    submitObject: IngredientAddEditModel
  ): Promise<AxiosResponse<ResponseAdd>> {
    return $api.post<ResponseAdd>('/ingredient', submitObject);
  }

  static async update(
    ingredientId: string,
    submitObject: IngredientAddEditModel
  ): Promise<AxiosResponse<ResponseStatus>> {
    return $api.put<ResponseStatus>(
      `/ingredient/${ingredientId}`,
      submitObject
    );
  }

  static async delete(
    ingredientId: string,
    submitObject: RequestIsDeletedModel
  ): Promise<AxiosResponse<ResponseStatus>> {
    return $api.patch<ResponseStatus>(
      `/ingredient/delete/${ingredientId}`,
      submitObject
    );
  }
}
