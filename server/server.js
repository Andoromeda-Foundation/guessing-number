/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 14 Jan 2018
 * Description:
 */
import Express from 'express';

const port = 8890;

const app = new express();
app.use('/',
  express.static(path.resolve(__dirname))
);

app.listen(port, (error) => {
  if (error) {
    console.error(port);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
