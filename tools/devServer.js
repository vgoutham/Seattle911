import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

const PORT = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(PORT, function(err){
  if(err) {
    console.log(err);
  } else {
    open(`http://localhost:${PORT}`);
  }
});
