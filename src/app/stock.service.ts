import { Injectable, OnInit } from '@angular/core';
import * as PouchDB from 'pouchdb';
import { WarehouseStockItem } from './shared/classes/warehouse-stock-item';

@Injectable()
export class StockService {
  private _db;
  private _stockItems;

  constructor() {
  }

  test() {
    console.log(this._db);
  }

  ngOnInit() {
    this.initDB();
  }

  initDB() {
    this._db = new PouchDB('stock', {
      adapter: 'websql'
    });
  }

  addWarehouseItem(item: WarehouseStockItem) {
    return this._db.post(item);
  }

  updateWarehouseItem(item: WarehouseStockItem) {
    return this._db.put(item);
  }

  deleteWareHouseItem(item: WarehouseStockItem) {
    return this._db.remove(item);
  }

  getAll() {
    if (!this._stockItems) {
      return this._db.allDocs({ include_docs: true })
          .then(docs => {
            this._stockItems = docs.rows.map(row => {
              row.doc.Date = new Date(row.doc.Date);
              return row.doc;
            });

            // Listen for changes on the database.
            this._db.changes({
              live: true,
              since: 'now',
              include_docs: true
            }).on ('change', this.onDatabaseChange);

            return this._stockItems;
          });
    } else {
      return Promise.resolve(this._stockItems);
    }
  }
  onDatabaseChange() {
  }

}
