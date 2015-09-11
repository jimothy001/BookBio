# The Book Biography Machine
*Visualize, study, and discover the provenance of books*

## Local Development

### Install Dependencies
```
npm install
```

### Spin up Mongo
You can either do this using a local mongo instance or the remote one.
#### local
```
mongod &
```

#### remote
Create a `.env` file and add the mongolab uri([?](http://docs.mongolab.com/connecting/#connect-string)). This is a local environment variables file that contains sensitive information; thus `.env` is not to be tracked remotely. If you've set this up properly you won't need to run anything else. The following line in `app.js` will automatically determine which instance of mongo to run.
```
uri = process.env.MONGOLAB_URI || 'localhost';
```

### Run it
#### local
```
node app.js
```

#### remote
```
heroku local web
```

## Production 
To push your changes to the production server, merely run:
```
git push heroku master
```
Note: Do ensure you've pulled and pushed to this repo first though.

## Debugging
To see a live log of the production server run:
```
heroku logs --tail
```
