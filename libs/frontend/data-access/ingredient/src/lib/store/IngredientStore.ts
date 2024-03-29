import { ResponsePaginated } from '@food-app/core';
import { IngredientListModel } from '../model';
import { makeAutoObservable } from 'mobx';

class Ingredient {
  data: ResponsePaginated<IngredientListModel> = {
    list: [],
    total: 0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  initData(data: ResponsePaginated<IngredientListModel>): void {
    this.data = data;
  }

  clear(): void {
    this.initData({
      list: [],
      total: 0,
    });
  }
}

export const IngredientStore = new Ingredient();
