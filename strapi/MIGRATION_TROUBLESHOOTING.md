# Migration Troubleshooting Guide

## Issue: "value too long for type character varying(255)"

This error occurs when a string field in your portfolio content type has data exceeding 255 characters, but the schema in Strapi Cloud has the default 255 character limit.

### Root Cause

- **Local database**: May be using SQLite (more lenient) or has different constraints
- **Strapi Cloud**: Uses PostgreSQL with default 255 character limit for string fields
- **Schema mismatch**: Your local schema might not have explicit `maxLength` set, allowing longer values

### Solution Options

#### Option 1: Fix Data Before Migration (Recommended)

1. **Identify problematic entries**:
   - Open your local Strapi admin: `http://localhost:1337/admin`
   - Go to Content Manager → Portfolio
   - Check entries where `title` or `shortDescription` might be longer than 255 characters
   - Look for entries with very long text

2. **Truncate or edit the data**:
   - Edit portfolio entries with fields > 255 characters
   - Shorten `title` to under 255 characters
   - Shorten `shortDescription` to under 255 characters (if it exists)
   - Save the changes

3. **Re-run the migration**:
   ```bash
   cd strapi
   yarn strapi transfer --to https://your-strapi-cloud-url.strapiapp.com/admin --to-token YOUR_TOKEN
   ```

#### Option 2: Update Schema to Allow Longer Strings

If you need to keep longer text, update the schema:

1. **Update local schema** (strapi/src/api/portfolio/content-types/portfolio/schema.json):
   ```json
   {
     "attributes": {
       "title": {
         "type": "string",
         "maxLength": 500  // or whatever length you need
       },
       "shortDescription": {
         "type": "string",
         "maxLength": 1000  // adjust as needed
       }
     }
   }
   ```

2. **Update Strapi Cloud schema**:
   - You'll need to update the schema in Strapi Cloud admin panel as well
   - Go to Content-Type Builder → Portfolio → Edit the fields
   - Set appropriate max lengths

3. **Re-run migration**

#### Option 3: Use Text Field Instead of String

For fields that need to store longer content:

1. **Change field type from "string" to "text"** in the schema
2. **Update both local and Strapi Cloud schemas** to match
3. **Re-run migration**

### Quick Fix Script

A helper script has been created to identify problematic entries:

```bash
# From the strapi directory
cd strapi
node check-long-fields.js
```

This will list all portfolio entries with fields exceeding 255 characters, making it easy to identify which entries need to be fixed.

### Identifying the Problem Field

The error message shows it's in the `portfolios` table. Based on your schema, the likely culprits are:
- `title` (type: string, default max: 255)
- `shortDescription` (type: string, default max: 255)

Check these fields in your local Strapi admin panel for entries with very long text.

## Issue: WebSocket Connection Closed

This error typically occurs **after** the first error (schema mismatch). The WebSocket closes because the transfer process fails when it encounters the database error.

**Solution**: Fix the schema/data issue first, and the WebSocket errors should resolve automatically on retry.

### If WebSocket errors persist:

1. **Check your internet connection**
2. **Verify Strapi Cloud is accessible**
3. **Try the transfer again after fixing the data issue**
4. **Check for firewall/proxy issues**

## Step-by-Step Fix Process

1. ✅ **Identify the problem**: 
   ```bash
   cd strapi
   node check-long-fields.js
   ```
   This will show you which portfolio entries have fields exceeding 255 characters.

2. ✅ **Fix the data**: 
   - Open Strapi admin: `http://localhost:1337/admin`
   - Go to Content Manager → Portfolio
   - Edit each problematic entry identified in step 1
   - Shorten `title` and/or `shortDescription` to under 255 characters
   - Save each entry

3. ✅ **Verify locally**: 
   - Ensure your local Strapi still works correctly
   - Verify the entries display properly

4. ✅ **Re-run migration**: 
   ```bash
   yarn strapi transfer --to https://your-strapi-cloud-url.strapiapp.com/admin --to-token YOUR_TOKEN
   ```

5. ✅ **Monitor the output**: Watch for any new errors

## Prevention for Future

To prevent this in the future:

1. **Set explicit maxLength** in your schemas for string fields
2. **Validate data** before creating entries (use Strapi's validation features)
3. **Use "text" type** instead of "string" for fields that might exceed 255 characters
4. **Document field limits** in your content type setup guides

## Alternative: Export/Import Specific Content Types

If the issue persists, you can try exporting only specific content types:

```bash
# This feature might not be directly available, but you could:
# 1. Export all data
yarn strapi transfer export

# 2. Manually edit the export file to remove problematic entries
# 3. Import the cleaned data
yarn strapi transfer import <cleaned-export-file>
```

Note: The export/import method requires manual intervention and is more complex.


