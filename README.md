# Tenant Management System Canister

This document provides comprehensive documentation for the Tenant Management System Canister; a repository containing the source code for a Tenant management system canister on the Internet Computer (IC).

## Table of Contents

- [Functionality](#functionality)
  - [Tenant Management](#Tenant-management)
  - [Helper Functions](#helper-functions)
  - [UUID Package Workaround](#uuid-package-workaround)
- [Deployment on Local Machine](#deployment-on-local-machine)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [GitHub Repository](#github-repository)

## Functionality

The Tenant Management System Canister offers a range of functionalities related to managing Tenant records. These include searching; adding; updating; and deleting Tenants.

### Tenant Management

- **Search Tenants (`searchTenants`):** This function allows users to search for Tenants based on a given query. It returns a list of Tenants matching the query.
  
- **Admit Tenant (`setVAcancy`):** sets a room vacancy, updates the Tenant's status; 


- **Add Tenant (`addTenant`):** Adds a new Tenant to the system. This function generates a unique ID for the Tenant; validates the Tenant object; and adds it to the Tenant storage.

- **Update Tenant (`updateTenant`):** Updates information about an existing Tenant. It validates the updated Tenant object; creates a new Tenant object with the updated fields; and updates the Tenant in the storage.

- **Get Tenants (`getTenants`):** Retrieves information about all Tenants in the system. It returns a list of Tenant records.

- **Get Tenant (`getTenant`):** Retrieves information about a specific Tenant based on the provided Tenant ID.

- **Delete Tenant (`deleteTenant`):** Deletes a Tenant from the system. It validates the Tenant ID; removes the Tenant from the storage; and returns the deleted Tenant record.

### Helper Functions

- **isValidUUID(`isValidUUID`):** This helper function validates whether a given string is a valid UUID.

### UUID Package Workaround

- A workaround is implemented to make the UUID package work with Azle by providing a global implementation of the `crypto` object.

## Deployment on Local Machine

To deploy the Tenant Management System Canister locally; follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/kenkaboshcodes/dacade-icp-typescript.git
   cd dacade-icp-typescript
   ```
2. **Start the Canister:**
   ```bash
   dfx start
   ```
3. **Build the Canister:**
   ```bash
   dfx build
   ```

4. **Deploy the Canister:**
   ```bash
   dfx deploy
   ```

5. **Use the Generated Canister Identifier:**
   The deployment process will provide you with a canister identifier. Use this identifier to interact with the deployed canister.

For additional deployment options and configurations; refer to the [Internet Computer SDK documentation](https://sdk.dfinity.org/docs/quickstart/local-quickstart.html).

## Testing

To run tests; use the following command:

```bash
cargo test
```

## Contributing

Feel free to contribute to the project by submitting issues or pull requests. Follow the standard GitHub flow for contributing.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

