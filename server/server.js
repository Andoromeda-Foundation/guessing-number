/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 14 Jan 2018
 * Description:
 */
const Express = require('express');
const path = require('path');

const port = 8890;

const app = new Express();
app.use('/backend',
  Express.static(path.resolve(__dirname))
);

app.listen(port, (error) => {
  if (error) {
    console.error(port);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
