<p align="center"><img  src="https://scontent.fbne4-1.fna.fbcdn.net/v/t39.30808-6/295334849_376873917925012_8136421335623490776_n.png?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=MjiUwZSEQJQQ7kNvgGuOmtv&_nc_zt=23&_nc_ht=scontent.fbne4-1.fna&_nc_gid=AqAEX2bTEGEEE8klmDe0dsL&oh=00_AYBdnXl5clhiC9VD9nngY5F0PbNoNt-Xl-2xxVeQ-p_Zcg&oe=677433F4"  width="1000"  alt="Statamic Logo" /></p>

# Visual1 Stataroid Starter Kit

1. `cd {{ project_name }}`

2. `composer install`

3. `cp .env.example .env`

4. `npm install`

5. `npm run dev`

## Open Site

Navigate to `https://{{ project_name }}.public.test` (same as your `APP_URL`).

This will show the standard starter kit home page with some panels and a contact form at the bottom.

## Control Panel User Details

To login to the Control Panel, navigate to the site URL with `/cp` on the end, e.g. `https://{{ projectname }}.public.test/cp`.

In here you can play around and set all the content for the panels, blog entries and contact form setup.

Use the following user details:

> User: support@visual1.com.au

>

> Password: Password1!

# Statamic Eloquent Driver

[](https://github.com/statamic/eloquent-driver#statamic-eloquent-driver)

> Provides support for storing your Statamic data in a database, rather than flat files.

## Installation & Usage

[](https://github.com/statamic/eloquent-driver#installation--usage)

You can install and configure the Eloquent Driver using a single command:

```
php please install:eloquent-driver

```

The command will install the `statamic/eloquent-driver` package, publish the config file, then prompt you to select which repositories you wish to move to the database. The command will then publish the relevant migrations and run `php artisan migrate` behind the scenes.

The command will also give you the opportunity to indicate whether you'd like existing data to be imported.

### Importing flat-file content

[](https://github.com/statamic/eloquent-driver#importing-flat-file-content)

If you originally opt-out of importing existing content, then later change your mind, you can import existing content by running the relevant commands:

-   Assets: `php please eloquent:import-assets`
-   Blueprints and Fieldsets: `php please eloquent:import-blueprints`
-   Collections: `php please eloquent:import-collections`
-   Entries: `php please eloquent:import-entries`
-   Forms: `php please eloquent:import-forms`
-   Globals: `php please eloquent:import-globals`
-   Navs: `php please eloquent:import-navs`
-   Revisions: `php please eloquent:import-revisions`
-   Taxonomies: `php please eloquent:import-taxonomies`
-   Sites: `php please eloquent:import-sites`

### Assets

[](https://github.com/statamic/eloquent-driver#assets)

#### Empty Folders

[](https://github.com/statamic/eloquent-driver#empty-folders)

If your assets are being driven by the Eloquent driver then the database is used as the source of truth for the folder listing, so if no file is present inside a folder then it will not be shown.

#### Syncing

[](https://github.com/statamic/eloquent-driver#syncing)

If your assets are being driven by the Eloquent Driver and you're managing your assets outside of Statamic (eg. directly in the filesystem), you should run the `php please eloquent:sync-assets` command to add any missing files to the database, and remove files that no longer exist on the filesystem.

### Exporting to flat files

[](https://github.com/statamic/eloquent-driver#exporting-to-flat-files)

If you wish to move back to flat-files, you may use the following commands to export your content out of the database:

-   Assets: `php please eloquent:export-assets`
-   Blueprints and Fieldsets: `php please eloquent:export-blueprints`
-   Collections: `php please eloquent:export-collections`
-   Entries: `php please eloquent:export-entries`
-   Forms: `php please eloquent:export-forms`
-   Globals: `php please eloquent:export-globals`
-   Navs: `php please eloquent:export-navs`
-   Revisions: `php please eloquent:export-revisions`
-   Taxonomies: `php please eloquent:export-taxonomies`
-   Sites: `php please eloquent:export-sites`

## Configuration

[](https://github.com/statamic/eloquent-driver#configuration)

The configuration file, found in `config/statamic/eloquent-driver.php` is automatically published when you install the Eloquent Driver.

For each of the repositories, it allows you to determine if they should be driven by flat-files (`file`) or Eloquent (`eloquent`). Some repositories also have additional options, like the ability to override the model used.

### Using dedicated columns for data

[](https://github.com/statamic/eloquent-driver#using-dedicated-columns-for-data)

> Note: This feature is currently only available for Entries.

By default, the Eloquent Driver stores all data in a single `data` column. However, it is possible to store fields in their own columns.

1.  First, you'll need to enable the `map_data_to_columns` option in the `entries` section of the configuration file:

    // config/statamic/eloquent-driver.php

    'entries' => [
    'driver' => 'file',
    'model' => \Statamic\Eloquent\Entries\EntryModel::class,
    'entry' => \Statamic\Eloquent\Entries\Entry::class,
    'map_data_to_columns' => false,
    ],

2.  Create a new migration to add the columns to the `entries` table:

    php artisan make:migration add_columns_to_entries_table

    public function up()
    {
    Schema::create('entries', function (Blueprint $table) {
    $table->string('description')->nullable();
    $table->json('featured_images')->nullable();
    });
    }

    You should ensure that the column names match the field handles in your blueprints. You should also ensure the column type matches that of the fieldtype. As a general rule of thumb, here are some common mappings:

    -   Text fields should be stored as `string` columns.
    -   Relationship fields should be stored as `json` columns. (Unless `max_items` is set to `1`, in which case it should be stored as a `string` column.)
    -   Number fields should be stored as `integer` or `decimal` columns.

3.  Run the migration:

    php artisan migrate

4.  If you're adding `json` or `integer` columns, you will need to provide your own `Entry` model in order to set the appropriate casts. You can do this by creating a new model which extends the default `Entry` model:

    <?php
    
    namespace App\Models;
    
    class Entry extends \Statamic\Eloquent\Entries\EntryModel
    {
        protected $casts = [
            // The casts from Statamic's base model...
            'date'      => 'datetime',
            'data'      => 'json',
            'published' => 'boolean',
    
            // Your custom casts...
            'featured_images' => 'json',
        ];
    }
    
    If you're using UUIDs as your entry IDs (which is the default if you imported existing entries into the database), you should extend the  `Statamic\Eloquent\Entries\UuidEntryModel`  class instead:
    
    class Entry extends \Statamic\Eloquent\Entries\UuidEntryModel


5.  If you have existing entries, you will need to re-save them to populate the new columns. You can do this by pasting the following snippet into `php artisan tinker`:

    \Statamic\Facades\Entry::all()->each->save();

6.  And that's it! Statamic will now read and write data to the new columns in the `entries` table, rather than the `data` column.

## Upgrading

[](https://github.com/statamic/eloquent-driver#upgrading)

After updating to a new version of the Eloquent Driver, please ensure you run `php artisan migrate` to update your database to the latest schema.

## Questions

[](https://github.com/statamic/eloquent-driver#questions)

### Can I store users in the database too?

[](https://github.com/statamic/eloquent-driver#can-i-store-users-in-the-database-too)

By default, Statamic users live in the `users` directory of your project. If you wish to move them to the database, please [follow this guide](https://statamic.dev/tips/storing-users-in-a-database).

### Can I store some collections in the database, while keeping others in flat-files?

[](https://github.com/statamic/eloquent-driver#can-i-store-some-collections-in-the-database-while-keeping-others-in-flat-files)

This driver **does not** make it possible to have some collections flat-file driven and others Eloquent driven. If you're looking for that, you may want to checkout the [Runway](https://statamic.com/addons/rad-pack/runway) addon, which is part of The Rad Pack.
