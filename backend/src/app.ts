import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

const app = express();

app.set('port', Number(process.env.PORT) || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === 'production' ? undefined : false,
  })
);

export default app;
