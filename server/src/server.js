import path             from 'path';
import compression      from 'compression';
import express          from 'express';
import morgan           from 'morgan';
import helmet           from 'helmet';

const app               = express();

if (process.env.PORT !== 'test') app.use(morgan('short'));
app.use(helmet.hidePoweredBy({ setTo: 'JustForFun' }));
app.use(compression());
app.use(
  express.static(
    path.join(__dirname, '../../public'),
    {
      dotfiles: 'ignore',
    }
  )
);

// send all requests to index.html so browserHistory in React Router works
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../../public/') });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Production Express server running at localhost: ${port}`); // eslint-disable-line
});
