import type { Component } from "vue";

export const AutoCompleteContextKey = Symbol();
export type Option<T> = {
  icon?: Component,
  label: string,
  value: T
}
export type AutoCompleteProps<T> = {
  open: boolean;
  options: Option<T>[];
}