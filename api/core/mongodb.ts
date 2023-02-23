import {
  MongoClient,
  Db,
  MongoClientOptions,
  ConnectionClosedEvent,
  ConnectionReadyEvent,
} from "mongodb";

interface Config {
  url: string;
  db: string;
}

const errorMessageMongodbClassDbNull = "MongoDB class _db is null";

const connectionClosedEventListener = (event: ConnectionClosedEvent) => {
  console.log(event, "Mongodb connection closed");
};
const connectionReadyEventListener = (event: ConnectionReadyEvent) => {
  console.log(event, "Mongodb connection is ready");
};

class MongoDB {
  private _db: Db | null = null;

  client: MongoClient;

  config: Config;

  get db() {
    const result = this._db;
    if (!result) {
      console.error(errorMessageMongodbClassDbNull);
      throw new Error(errorMessageMongodbClassDbNull);
    }

    return result;
  }

  set db(iDb) {
    this._db = iDb;
  }

  constructor(config: any) {
    this.config = config;
    const options: MongoClientOptions = {
      maxPoolSize: 20,
    };
    this.client = new MongoClient(this.config.url, options);
    this.connect = this.connect.bind(this);
    this.collection = this.collection.bind(this);
  }

  connect() {
    this.client.once("connectionClosed", connectionClosedEventListener);
    this.client.once("connectionReady", connectionReadyEventListener);

    return this.client
      .connect()
      .then(() => {
        this.db = this.client.db(this.config.db);
      })
      .catch((e: any) => {
        console.error(e, "Error in connecting to mongo db");
        throw e;
      });
  }

  collection(name: string) {
    return {
      name,
      db: this.db,
    };
  }
}

export default MongoDB;
