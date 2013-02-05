dummy
=====

dummy server provided by node.js

this dummy server provides simulation of all http status code

### Requires
  * node

### Install
``` bash
git clone git://github.com/tomowang/dummy.git
cd dummy
npm install
node main.js # you can also use [supervisor](https://github.com/isaacs/node-supervisor)
```

### APIs
  * '/'     -> demo root, return 'Hello, world!'
  * '/{status_code}'  -> status code simulation, return status_code in http header and content
  * '/default?code={code}&delay={delay}&length={length}'  -> return specified status code, delay {delay}ms and random content with {length}

### License
Copyright(c) 2013 Tomo Wang

Your License
