import { ResponsePaginated } from '@food-app/core';
import { ReactElement } from 'react';

export interface MinimalDataModel extends Record<string, unknown> {
  id: string;
}

interface Action<DataModel> {
  /**
   * Типы действий (добавляют нужные кнопки/компоненты)
   */
  type: 'add' | 'edit' | 'delete' | 'details' | string;

  /**
   * Компонент кнопки
   */
  renderRowComponent?: (object: DataModel) => ReactElement;

  /**
   * Компонент кнопки
   */
  renderAddComponent?: () => ReactElement;
}

interface Field<DataModel> {
  /**
   * Заголовок колонки в таблице
   */
  header: string;

  /**
   * Название поля в котором данные возвращаются с API
   */
  name: keyof DataModel | '';

  /**
   * Функиця которая отрисовывает элемент в ячейке таблицы
   * @param object - Объект с данными который возвращает API
   */
  render: (object: DataModel) => ReactElement;
}

export interface CrudTableSettings<DataModel> {
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
   * Отображать фильтр? Если включен, нужно передать компоненту объект настроек в props filterSettings
   */
  withFilter?: boolean;

  /**
   * Отображать пагинацию?
   */
  withPagination?: boolean;

  /**
   * Отображать нижнюю пагинацию?
   */
  withBottomPagination?: boolean;

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

  customFilter?: JSX.Element;
  currentPage: number;
}
