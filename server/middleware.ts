import { Context } from './deps.ts';

const addLogsToRequests = async (
  ctx: Context<Record<string, any>>,
  next: () => Promise<void>,
) => {
  await next();
  const rt = ctx.response.headers.get('X-Response-Time');
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
};

const addResponseTimes = async (
  ctx: Context<Record<string, any>>,
  next: () => Promise<void>,
) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set('X-Response-Time', `${ms}ms`);
};

export { addLogsToRequests, addResponseTimes };
