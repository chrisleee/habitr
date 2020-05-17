import { Application } from './deps.ts';
import router from './routes.ts';
import { addLogsToRequests, addResponseTimes } from './middleware.ts';

const initOak = async () => {
  const app = new Application();

  app.use(addLogsToRequests);
  app.use(addResponseTimes);
  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set('X-Response-Time', `${ms}ms`);
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  // TODO: Add auth

  const env = Deno.env.toObject();
  const HOST = env.HOST || '0.0.0.0';
  const PORT = env.PORT || '8000';
  console.log(`Listening on port ${PORT}`);
  await app.listen(`${HOST}:${PORT}`);
};

await initOak();
