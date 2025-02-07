import type { Component } from 'vue';

export const AutoCompleteContextKey = Symbol('AutoComplete');
export interface Option<T> {
  icon?: Component;
  label: string;
  value: T;
}
export interface AutoCompleteProps<T> {
  open: boolean;
  options: Option<T>[];
}
