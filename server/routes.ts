import { Router } from './deps.ts';
import * as chains from './controller.ts';

const router = new Router();
router
  .get('/chains', chains.getChains)
  .get('/chains/:chainId', chains.getChain)
  .post('/chains', chains.createChain)
  .put('/chains/:chainId', chains.updateChain)
  .delete('/chains/:chainId', chains.deleteChain);

export default router;
