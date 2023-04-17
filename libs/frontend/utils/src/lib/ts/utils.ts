export type ExcludeNullsAndArrays<T> = T extends Record<any, any>
  ? {
      [K in keyof T]: Exclude<T[K], null | Array<any>>;
    }
  : T;

/**
 * Позволяет строить путь из вложенных объектов
 */
export type NestedKeyOf<T extends Record<string, any>> = keyof {
  [K in keyof T as T[K] extends string | number | boolean
    ? K
    : T[K] extends Record<string, any>
    ? `${K & string}.${NestedKeyOf<ExcludeNullsAndArrays<T[K]>> &
        (string | number | boolean)}`
    : never]: any;
};
