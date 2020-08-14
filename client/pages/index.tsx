import { useEffect, useState } from 'react';
import useSwr from 'swr';

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export default function Home(): JSX.Element {
  const mounted = useMounted();
  const queryString = '/api/habits';
  const { data, error } = useSwr(() => (mounted ? queryString : null), fetcher);

  async function handleClick(e: MouseEvent) {
    e.preventDefault();
    const newHabit: CreateNewHabitDto = {
      title: Math.random().toString(36),
      description: 'some desc',
      periodType: 'weekly',
      periodFreq: '2',
    };
    await createHabit(newHabit);
  }

  async function createHabit(newHabit: CreateNewHabitDto) {
    let res = null;
    try {
      res = await fetch('/api/habits', {
        method: 'POST',
        // mode: 'cors',
        // cache: 'no-cache',
        headers: {
          Authorization: AUTH_TOKEN,
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(newHabit),
      });
    } catch (error) {
      console.error(`Failed to create habit with error: ${error}`);
      return;
    }

    if (res.status >= 400) {
      console.error(`ERROR ${res.status}`);
    }

    return res.json();
  }

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-4 shadow rounded bg-white">
      <section>
        <h2 className="text-purple-500 leading-normal">Habitr</h2>
        <div className="flex flex-row">
          <ul className="flex flex-row">
            {data.map(({ id, title, sprees }) => (
              <li key={id} className="px-4 py-2 m-2">
                <p className="text-gray-500">{title}</p>
                <ul>
                  {sprees.map(({ id, start, end }) => (
                    <li key={id}>
                      <p className="text-gray-500">{start}</p>
                      <p className="text-gray-500">{end}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <button onClick={handleClick}>New Habit</button>
        </div>
      </section>
    </div>
  );
}
