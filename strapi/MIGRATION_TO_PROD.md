# Data Migration to Strapi Cloud - Production Guide

This guide will help you migrate your local Strapi data to your Strapi Cloud production environment.

## Prerequisites

1. **Strapi Version**: Ensure you're running Strapi v5.31.2 or higher (you're currently on v5.31.2 ✅)
2. **Strapi Cloud Account**: You should have a Strapi Cloud account and a deployed project
3. **Local Strapi Running**: Your local Strapi instance should have all the data you want to migrate
4. **Strapi CLI**: Make sure Strapi CLI is available (comes with the package)

## Step-by-Step Migration Process

### Step 1: Prepare Your Strapi Cloud Project

1. **Log in to Strapi Cloud**
   - Go to [https://cloud.strapi.io](https://cloud.strapi.io)
   - Navigate to your deployed project

2. **Access the Admin Panel**
   - Open your Strapi Cloud admin panel URL (typically `https://your-project.strapiapp.com/admin`)

### Step 2: Create a Transfer Token

1. **Navigate to Transfer Tokens**
   - In the Strapi Cloud admin panel, go to **Settings** → **Global settings** → **Transfer Tokens**

2. **Create New Transfer Token**
   - Click **Create new Transfer Token**
   - Provide:
     - **Name**: e.g., "Production Migration Token"
     - **Description**: Brief description of the token's purpose
     - **Token duration**: Choose appropriate duration (7, 30, 90 days, or Unlimited)
     - **Token type**: Select **Push** (allows transfers FROM local TO cloud)
   - Click **Save**

3. **Copy the Token**
   - ⚠️ **IMPORTANT**: Copy the token immediately! It will only be displayed once and won't be visible after you navigate away or refresh the page.
   - Save it securely (you'll need it in the next step)

### Step 3: Prepare Your Local Environment

1. **Navigate to Strapi Directory**
   ```bash
   cd strapi
   ```

2. **Ensure Strapi is Running (Optional but Recommended)**
   ```bash
   yarn develop
   ```
   - This ensures your local data is up-to-date
   - You can stop it before running the transfer command if needed

### Step 4: Run the Transfer Command

1. **From the Strapi directory**, run the transfer command:
   ```bash
   yarn strapi transfer --to https://your-strapi-cloud-url.strapiapp.com/admin --to-token YOUR_TRANSFER_TOKEN
   ```
   
   **Replace:**
   - `https://your-strapi-cloud-url.strapiapp.com/admin` with your actual Strapi Cloud admin URL (must include `/admin`)
   - `YOUR_TRANSFER_TOKEN` with the token you copied in Step 2

   **Example:**
   ```bash
   yarn strapi transfer --to https://myportfolio-abc123.strapiapp.com/admin --to-token abc123xyz789token456
   ```

2. **Confirm the Transfer**
   - The command will warn you that this will **overwrite all existing data** in the destination
   - Type `yes` to confirm and proceed
   - The transfer process will begin (this may take several minutes depending on your data size)

### Step 5: Verify the Migration

1. **Check Strapi Cloud Admin Panel**
   - Navigate to your content types in Strapi Cloud
   - Verify that all your data (Portfolio, Experience, Certificates, etc.) has been migrated

2. **Verify Assets**
   - Check that all uploaded images and media files are present
   - Verify they're displaying correctly

3. **Test API Endpoints**
   - Test your API endpoints to ensure data is accessible
   - Verify permissions are set correctly (Settings → Users & Permissions Plugin → Roles → Public)

## Important Warnings

⚠️ **Data Overwrite**: Transferring data to Strapi Cloud will **permanently delete** all existing data in the destination environment. Make sure you:

- Have backups of any existing production data (if this matters)
- Have tested the migration process in a staging environment first (if available)
- Are certain you want to overwrite the current production data

## Alternative: Manual Data Export/Import

If you prefer a more controlled approach or want to migrate specific content types:

### Export Data from Local

```bash
cd strapi
yarn strapi transfer export
```

This creates an export file in your Strapi directory.

### Import Data to Strapi Cloud

You can then use the Strapi Cloud admin panel to import this file, or use:

```bash
yarn strapi transfer import <path-to-export-file>
```

## Troubleshooting

### Common Issues

If you encounter errors during migration, see **[MIGRATION_TROUBLESHOOTING.md](./MIGRATION_TROUBLESHOOTING.md)** for detailed solutions to common problems including:

- **"value too long for type character varying(255)"** - Schema/data mismatch issues
- **WebSocket connection errors** - Connection problems
- **Data validation errors** - Field constraints and limits

### Issue: Transfer Token Not Working
- Ensure the token type is set to **Push**
- Verify the token hasn't expired
- Check that you're using the correct admin URL (must include `/admin`)

### Issue: Connection Timeout
- Check your internet connection
- Verify the Strapi Cloud URL is correct
- Try again - large datasets may take time

### Issue: Permission Errors
- Ensure your Strapi Cloud project is properly configured
- Verify you have the necessary permissions in Strapi Cloud
- Check that the `transfer.token.salt` is configured in Strapi Cloud (usually automatic)

### Issue: Assets Not Migrating
- Large assets may take additional time
- Verify your Strapi Cloud plan has sufficient storage
- Check the transfer logs for any errors related to specific assets

## Post-Migration Checklist

- [ ] All content types have been migrated
- [ ] All media files/assets are present and accessible
- [ ] API permissions are configured correctly
- [ ] API endpoints are returning correct data
- [ ] Frontend application can connect to Strapi Cloud API
- [ ] Update `NEXT_PUBLIC_STRAPI_API_URL` in your frontend production environment
- [ ] Test the frontend with production Strapi Cloud data

## Next Steps

After successful migration:

1. **Update Frontend Environment Variables**
   - Update `NEXT_PUBLIC_STRAPI_API_URL` in your production environment to point to Strapi Cloud
   - Update `NEXT_PUBLIC_STRAPI_API_TOKEN` if needed

2. **Configure CORS** (if not already done)
   - In Strapi Cloud, ensure CORS is configured to allow your frontend domain
   - Settings → Global settings → CORS

3. **Set Up API Tokens**
   - Create appropriate API tokens for your frontend application
   - Settings → Global settings → API Tokens

4. **Review Permissions**
   - Ensure public role has correct permissions for all content types
   - Settings → Users & Permissions Plugin → Roles → Public

## References

- [Strapi Cloud Documentation](https://docs.strapi.io/cloud)
- [Strapi Data Transfer Documentation](https://docs.strapi.io/cms/data-management/transfer)
- [Strapi Transfer Tokens Guide](https://docs.strapi.io/user-docs/settings/transfer-tokens)


