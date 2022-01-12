import type { Principal } from '@dfinity/principal';
export interface Entry {
  'name' : Name,
  'email' : string,
  'phone' : Phone,
  'address1' : string,
  'address2' : string,
}
export type Name = string;
export type Phone = bigint;
export interface _SERVICE {
  'insert' : (
      arg_0: Name,
      arg_1: string,
      arg_2: string,
      arg_3: string,
      arg_4: Phone,
    ) => Promise<undefined>,
  'lookup' : (arg_0: Name) => Promise<[] | [Entry]>,
}
