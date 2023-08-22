import { ResponsePaginated } from '@food-app/core';
import { ReactNode } from 'react';
import { CrudTableActionsType } from './constants';

export interface MinimalDataModel extends Record<string, unknown> {
  id: string;
}

interface Action<DataModel extends MinimalDataModel> {
  /**
   * Типы действий (добавляют нужные кнопки/компоненты)
   */
  type: CrudTableActionsType | (string & NonNullable<unknown>);

  /**
   * Компонент кнопки
   */
  renderComponent: (
    object?: Action<DataModel>['type'] extends 'top' ? never : DataModel
  ) => ReactNode;

  /**
   * Проверяет есть ли доступ к этому действию у пользователя.
   * @default true
   */
  access?: boolean;
}

interface Field<DataModel extends MinimalDataModel> {
  /**
   * Заголовок колонки в таблице
   */
  header: string;

  /**
   * Функиця которая отрисовывает элемент в ячейке таблицы
   * @param object - Объект с данными который возвращает API
   */
  render: (object: DataModel) => ReactNode;
}

export interface CrudTableSettings<DataModel extends MinimalDataModel> {
  /**
   * Дейсвия которые можно осуществлять с данными в таблице (добавление, редактирование, детальный просмотр, удаление)
   */
  actions: Action<DataModel>[];

  /**
   * Поля таблицы
   */
  fields: Field<DataModel>[];
}

export interface CrudTableProps<DataModel extends MinimalDataModel> {
  currentPage: number;

  /**
   * Настройки таблицы
   */
  settings: CrudTableSettings<DataModel>;

  /**
   * Store с которым будет работать таблица
   */
  storeData: ResponsePaginated<DataModel>;

  /**
   * Показывает лоадер вместо контента
   */
  loading?: boolean;

  /**
   * Название поля в котором в store хранится массив с данными
   * TODO: Добавить более строгую типизацию
   */
  storeFieldWithData?: string;

  /**
   * Отображать пагинацию?
   */
  withPagination?: boolean;

  /**
   * Количество записей на странице
   */
  perPage?: number;

  /**
   * Отображать селектор количества записей на странице
   */
  withRowsPerPage?: boolean;

  /**
   * Функция для работы с пагинацией
   */
  handlePaginationChange?: (page: number) => void;

  /**
   * Добавить колонку с нумирацией строк
   */
  addNumberingColumn?: boolean;
}
