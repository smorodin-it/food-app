import { AxiosResponse } from 'axios';
import {
  IngredientAddEditModel,
  IngredientListModel,
  IngredientModel,
} from '../model';
import {
  RequestIsDeletedModel,
  ResponseAdd,
  ResponsePaginated,
  ResponseStatus,
} from '@food-app/core';
import { $api } from '@food-app/frontend/data-access/auth';

export class IngredientService {
  static async list(
    controller: AbortController
  ): Promise<AxiosResponse<ResponsePaginated<IngredientListModel>>> {
    return $api.get<ResponsePaginated<IngredientListModel>>('/ingredient', {
      signal: controller.signal,
    });
  }

  static async retrieve(
    ingredientId: string,
    controller: AbortController
  ): Promise<AxiosResponse<IngredientModel>> {
    return $api.get<IngredientModel>(`/ingredient/${ingredientId}`, {
      signal: controller.signal,
    });
  }

  static async create(
    submitObject: IngredientAddEditModel,
    controller: AbortController
  ): Promise<AxiosResponse<ResponseAdd>> {
    return $api.post<ResponseAdd>('/ingredient', submitObject, {
      signal: controller.signal,
    });
  }

  static async update(
    ingredientId: string,
    submitObject: IngredientAddEditModel,
    controller: AbortController
  ): Promise<AxiosResponse<ResponseStatus>> {
    return $api.put<ResponseStatus>(
      `/ingredient/${ingredientId}`,
      submitObject,
      { signal: controller.signal }
    );
  }

  static async delete(
    ingredientId: string,
    submitObject: RequestIsDeletedModel,
    controller: AbortController
  ): Promise<AxiosResponse<ResponseStatus>> {
    return $api.patch<ResponseStatus>(
      `/ingredient/delete/${ingredientId}`,
      submitObject,
      { signal: controller.signal }
    );
  }
}
