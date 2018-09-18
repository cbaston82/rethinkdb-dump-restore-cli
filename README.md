# RethinkDB Dump & Restore CLI
This utility helps dump and restore your rethinkdb database.

## Installation
Using NPM
```
  npm install -g rethinkdb_dump_restore_cli
```

You now have access to `rtkdb` globally.

## Run the utility.
```
  rtkdb
```

![rtkdb dump db screenshot 1](https://res.cloudinary.com/imagine-design-develop/image/upload/v1536721671/screenshots/Screen_Shot_2018-09-11_at_8.07.01_PM.png)

## Locating the dumped files.
All dumps are located in `$HOME/.rtkdb/dumps`. This is automatically created when you first run the `rtkdb` command.

## Overriding the defaults settings.
Create the following JSON file `$HOME/.rtkdb/rtkdbconfig.json`
``` json
  {
    "hostname": "localhost",
    "portnumber": 28015,
    "db": "ayy"
  }

```

# Todo.
- Ability to dump only tables selected.
- Ability to restore only tables selected.
