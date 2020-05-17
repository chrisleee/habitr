import { Request, Response, Status } from './deps.ts';

// TODO: Replace with database
const links = new Map<string, any>();
for (let i = 1; i < 11; i++) {
  const id = i.toString();
  links.set(id, {
    id,
    date: new Date(2020, 4, i + 5),
    numSteps: 1,
    owner: '1',
  });
}
const dateRanges = new Map<string, any>();
dateRanges.set('1', {
  id: '1',
  start: new Date(2020, 4, 6),
  end: new Date(2020, 4, 16),
  owner: '1',
});
const chains = new Map<string, any>();
chains.set('1', {
  id: '1',
  title: 'gym',
  owner: '1',
  spree: 10,
  best: 10,
  maxSteps: 1,
  links: Array.from(links.values()),
  dateRanges: Array.from(dateRanges.values()),
});
// TODO: Replace with database

const getChains = ({ response }: { response: any }) => {
  response.body = Array.from(chains.values());
};

const getChain = ({
  params,
  response,
}: {
  params: { chainId: string };
  response: Response;
}) => {
  if (params && params.chainId && chains.has(params.chainId)) {
    response.body = chains.get(params.chainId);
  }
};

const createChain = async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  const body = await request.body();
  const chain = body.value;
  chains.set(chain.id, chain);
  // TODO: Set location header
  response.headers.set('Location', request.url.toString());
  response.status = Status.Created;
};

const updateChain = async ({
  params,
  request,
  response,
}: {
  params: { chainId: string };
  request: Request;
  response: Response;
}) => {
  let chain = chains.get(params.chainId);
  if (chain) {
    const body = await request.body();
    const updateInfos = body.value;
    chain = { ...chain, ...updateInfos };
    chains.set(params.chainId, chain);
    response.status = Status.OK;
    response.body = { message: 'OK' };
  } else {
    response.status = Status.NotFound;
    response.body = { message: 'Chain not found' };
  }
};

const deleteChain = () => {};

export { getChain, getChains, createChain, updateChain, deleteChain };
