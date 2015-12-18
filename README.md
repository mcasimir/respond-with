# respond-with

## Install

```
npm i --save respond-with
```

## Usage

``` js
var respondWith = require('respond-with');

module.exports = function(app) {
  app.post('/myendpoint', function(req, res) {
    respondWith(
      req,
      res,
      doSomethingThatReturnsAPromise()
    );
  });
};
```

### Configuration

``` js
respondWith.configure(function(config){
  config.responders.shift(
    {
      status: 'resolved',
      name: '404OnVoidGet',
      when: function(req, object){
        return req.method === 'GET' && (object === null || object === undefined)
      },
      respond: function(req, res){
        return res.status(404).json();
      }
    }
  );
});
```
