import express from 'express';
import path from 'path';
import open from 'open';

const PORT = 3000;
const app = express();

app.use(express.static('dist'));

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, function(err){
  if(err) {
    console.log(err);
  } else {
    open(`http://localhost:${PORT}`);
  }
});
