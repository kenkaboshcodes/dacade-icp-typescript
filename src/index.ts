import {
    $query,
    $update,
    Record,
    StableBTreeMap,
    Vec,
    match,
    Result,
    nat64,
    ic,
    Opt,
  } from 'azle';
  import { v4 as uuidv4 } from 'uuid';
  
  type Tenant = Record<{
    id: string;
    occupantName: string;
    occupantAge: nat64;
    occupantGender: string;
    movedIn: nat64;
    vacancy: boolean;
    complain: string;
    houseNumber: nat64;
    updatedAt: Opt<nat64>;    
  }>;
  
  type TenantPayload = Record<{
    occupantName: string;
    occupantAge: nat64;
    occupantGender: string;
    complain: string;
    houseNumber: nat64;
    movedIn: nat64;
    vacancy: boolean;
  }>;

  
  const TenantStoroccupantAge = new StableBTreeMap<string, Tenant>(0, 44, 1024);
  
  /**
  * Adds a new Tenant to the system.
  * @param payload - Information about the Tenant.
  * @returns A Result containing the new Tenant or an error message.
  */
  $update;
  export function addTenant(payload: TenantPayload): Result<Tenant, string> {
    // Validate inputs and handle incomplete or invalid data
    if (!payload.occupantName || !payload.occupantAge || !payload.occupantGender) {
        return Result.Err<Tenant, string>('Missing required fields in the Tenant object');
    }
  
    try {
        // Generate a unique ID for the Tenant
        const TenantId = uuidv4();
        // Initialize vacancy to false when adding a new Tenant
        const newTenant: Tenant = {
            id: TenantId,
            vacancy: payload.vacancy,
            movedIn: payload.movedIn,
            updatedAt: Opt.None,
            occupantName: payload.occupantName,
            occupantAge: payload.occupantAge,
            occupantGender: payload.occupantGender,
            complain: payload.complain,
            houseNumber: payload.houseNumber
        };
  
        // Add the Tenant to TenantStoroccupantAge
        TenantStoroccupantAge.insert(newTenant.id, newTenant);
  
        return Result.Ok(newTenant);
    } catch (error) {
        return Result.Err<Tenant, string>(`Error adding Tenant: ${error}`);
    }
  }
  
  /**
  * Retrieves all Tenants from the system.
  * @returns A Result containing a list of Tenants or an error message.
  */
  $query;
  export function getTenants(): Result<Vec<Tenant>, string> {
    try {
        // Retrieve all Tenants from TenantStoroccupantAge
        const Tenants = TenantStoroccupantAge.values();
        return Result.Ok(Tenants);
    } catch (error) {
        return Result.Err(`Error getting Tenants: ${error}`);
    }
  }
  
  /**
  * Retrieves a specific Tenant by ID.
  * @param id - The ID of the Tenant to retrieve.
  * @returns A Result containing the Tenant or an error message.
  */
  $query;
  export function getTenant(id: string): Result<Tenant, string> {
    // Validate ID
    if (!id) {
        return Result.Err<Tenant, string>('Invalid ID for getting a Tenant.');
    }
  
    try {
        // Retrieve a specific Tenant by ID
        return match(TenantStoroccupantAge.get(id), {
            Some: (Tenant) => Result.Ok<Tenant, string>(Tenant),
            None: () => Result.Err<Tenant, string>(`Tenant with id=${id} not found`),
        });
    } catch (error) {
        return Result.Err<Tenant, string>(`Error retrieving Tenant by ID: ${error}`);
    }
  }
  
  /**
  * Updates information for a specific Tenant.
  * @param id - The ID of the Tenant to update.
  * @param payload - Updated information about the Tenant.
  * @returns A Result containing the updated Tenant or an error message.
  */
  $update;
  export function updateTenant(id: string, payload: TenantPayload): Result<Tenant, string> {
    // Validate ID
    if (!id) {
        return Result.Err<Tenant, string>('Invalid ID for updating a Tenant.');
    }
  
    // Validate the updated Tenant object
    if (!payload.occupantName || !payload.occupantAge || !payload.occupantGender) {
        return Result.Err<Tenant, string>('Missing required fields in the Tenant object');
    }
  
    try {
        // Update a specific Tenant by ID
        return match(TenantStoroccupantAge.get(id), {
            Some: (existingTenant) => {
                // Create a new Tenant object with the updated fields
                const updatedTenant: Tenant = {
                    ...existingTenant,
                    ...payload,
                };
  
                // Update the Tenant in TenantStoroccupantAge
                TenantStoroccupantAge.insert(id, updatedTenant);
  
                return Result.Ok<Tenant, string>(updatedTenant);
            },
            None: () => Result.Err<Tenant, string>(`Tenant with id=${id} does not exist`),
        });
    } catch (error) {
        return Result.Err<Tenant, string>(`Error updating Tenant: ${error}`);
    }
  }
  
  
  
  /**
  * Searches for Tenants based on a query.
  * @param query - The search query.
  * @returns A Result containing a list of matched Tenants or an error message.
  */
  $query;
  export function searchTenants(query: string): Result<Vec<Tenant>, string> {
    try {
        // Search for Tenants based on the query
        const lowerCaseQuery = query.toLowerCase();
        const filteredTenants = TenantStoroccupantAge.values().filter(
            (Tenant) =>
                Tenant.occupantName.toLowerCase().includes(lowerCaseQuery)
        );
        return Result.Ok(filteredTenants);
    } catch (error) {
        return Result.Err(`Error searching for Tenants: ${error}`);
    }
  }
  
  /**
  * Admits a specific Tenant.
  * @param id - The ID of the Tenant.
  * @returns A Result containing the updated Tenant or an error message.
  */
  $update;
  export function setVacancy(id: string): Result<Tenant, string> {
    // Validate ID
    if (!id) {
        return Result.Err<Tenant, string>('Invalid ID for setting vacancy.');
    }
  
    try {
        // set a room vacancy with a specific ID
        return match(TenantStoroccupantAge.get(id), {
            Some: (Tenant) => {
                if (!Tenant.vacancy) {
                    const newTenant: Tenant = { ...Tenant, vacancy: true, updatedAt: Opt.Some(ic.time()) };
                    TenantStoroccupantAge.insert(id, newTenant);
  
                return Result.Ok<Tenant, string>(newTenant);
                }
                else{
                    const newTenant: Tenant = { ...Tenant, vacancy: false, updatedAt: Opt.Some(ic.time()) };
                    TenantStoroccupantAge.insert(id, newTenant);
  
                    return Result.Ok<Tenant, string>(newTenant);
                }
                
            },
            None: () => Result.Err<Tenant, string>(`Tenant with id=${id} not found`),
        });
    } catch (error) {
        return Result.Err<Tenant, string>(`Error admitting Tenant: ${error}`);
    }
  }

 
  /**
  * Deletes a specific Tenant.
  * @param id - The ID of the Tenant to delete.
  * @returns A Result containing the deleted Tenant or an error message.
  */
  $update;
  export function deleteTenant(id: string): Result<Opt<Tenant>, string> {
    try {
        // Validate the id parameter
        if (!isValidUUID(id)) {
            return Result.Err('Invalid Tenant ID');
        }
  
        // Delete a Tenant with a specific ID from TenantStoroccupantAge
        const deletedTenant = TenantStoroccupantAge.remove(id);
        if (!deletedTenant) {
            return Result.Err(`Tenant with ID ${id} does not exist`);
        }
  
        return Result.Ok(deletedTenant);
    } catch (error) {
        return Result.Err(`Error deleting Tenant: ${error}`);
    }
  }
  
  /**
  * Validates whether a given string is a valid UUID.
  * @param id - The string to validate as a UUID.
  * @returns True if the string is a valid UUID, otherwise false.
  */
  export function isValidUUID(id: string): boolean {
    // Validate if the provided ID is a valid UUID
    return /^[\da-f]{8}-([\da-f]{4}-){3}[\da-f]{12}$/i.test(id);
  }
  
  // A workaround to make the uuid package work with Azle
  globalThis.crypto = {
    // @ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32);
  
        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }
  
        return array;
    },
  };
  