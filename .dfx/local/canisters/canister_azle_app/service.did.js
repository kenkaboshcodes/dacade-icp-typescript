export const idlFactory = ({ IDL }) => {
  const TenantPayload = IDL.Record({
    'occupantGender' : IDL.Text,
    'houseNumber' : IDL.Nat64,
    'vacancy' : IDL.Bool,
    'movedIn' : IDL.Nat64,
    'complain' : IDL.Text,
    'occupantAge' : IDL.Nat64,
    'occupantName' : IDL.Text,
  });
  const Tenant = IDL.Record({
    'id' : IDL.Text,
    'occupantGender' : IDL.Text,
    'houseNumber' : IDL.Nat64,
    'vacancy' : IDL.Bool,
    'movedIn' : IDL.Nat64,
    'complain' : IDL.Text,
    'updatedAt' : IDL.Opt(IDL.Nat64),
    'occupantAge' : IDL.Nat64,
    'occupantName' : IDL.Text,
  });
  const _AzleResult = IDL.Variant({ 'Ok' : Tenant, 'Err' : IDL.Text });
  const _AzleResult_1 = IDL.Variant({
    'Ok' : IDL.Opt(Tenant),
    'Err' : IDL.Text,
  });
  const _AzleResult_2 = IDL.Variant({
    'Ok' : IDL.Vec(Tenant),
    'Err' : IDL.Text,
  });
  return IDL.Service({
    'addTenant' : IDL.Func([TenantPayload], [_AzleResult], []),
    'deleteTenant' : IDL.Func([IDL.Text], [_AzleResult_1], []),
    'getTenant' : IDL.Func([IDL.Text], [_AzleResult], ['query']),
    'getTenants' : IDL.Func([], [_AzleResult_2], ['query']),
    'searchTenants' : IDL.Func([IDL.Text], [_AzleResult_2], ['query']),
    'setVacancy' : IDL.Func([IDL.Text], [_AzleResult], []),
    'updateTenant' : IDL.Func([IDL.Text, TenantPayload], [_AzleResult], []),
  });
};
export const init = ({ IDL }) => { return []; };
