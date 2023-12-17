import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Tenant {
  'id' : string,
  'occupantGender' : string,
  'houseNumber' : bigint,
  'vacancy' : boolean,
  'movedIn' : bigint,
  'complain' : string,
  'updatedAt' : [] | [bigint],
  'occupantAge' : bigint,
  'occupantName' : string,
}
export interface TenantPayload {
  'occupantGender' : string,
  'houseNumber' : bigint,
  'vacancy' : boolean,
  'movedIn' : bigint,
  'complain' : string,
  'occupantAge' : bigint,
  'occupantName' : string,
}
export type _AzleResult = { 'Ok' : Tenant } |
  { 'Err' : string };
export type _AzleResult_1 = { 'Ok' : [] | [Tenant] } |
  { 'Err' : string };
export type _AzleResult_2 = { 'Ok' : Array<Tenant> } |
  { 'Err' : string };
export interface _SERVICE {
  'addTenant' : ActorMethod<[TenantPayload], _AzleResult>,
  'deleteTenant' : ActorMethod<[string], _AzleResult_1>,
  'getTenant' : ActorMethod<[string], _AzleResult>,
  'getTenants' : ActorMethod<[], _AzleResult_2>,
  'searchTenants' : ActorMethod<[string], _AzleResult_2>,
  'setVacancy' : ActorMethod<[string], _AzleResult>,
  'updateTenant' : ActorMethod<[string, TenantPayload], _AzleResult>,
}
