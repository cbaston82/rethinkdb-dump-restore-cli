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

![rtkdb dump db screenshot 1](https://res.cloudinary.com/imagine-design-develop/image/upload/v1537291548/Screenshot_from_2018-09-18_10-23-16.png)

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

- [ ] Add option to dump specified tables.
- [x] Add option to restore spedicified tables.
- [x] Add option to list out all dumps.
- [x] Add option to view rtkdbconfig.json.
- [ ] Add option to configure rtkdbconfig.json from cli.
- [ ] Add option to change rtkdb home directory. defatul is `$HOME/.rtkdb`
