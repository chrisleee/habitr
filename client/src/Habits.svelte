<script lang="ts">
  import { onMount } from 'svelte';
  import type { HabitData } from './types/Habit';
  import Habit from './Habit.svelte';

  let habits: HabitData[];

  const AUTH_TOKEN = '';

  const url = 'http://localhost:8010/habits';

  async function fetcher(): Promise<void> {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });

    habits = await res.json();
  }

  onMount(fetcher);
</script>

<style>
  .loading {
    opacity: 0;
    animation: 0.4s 0.8s forwards fade-in;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

{#if habits}
  {#each habits as habit}
    <ul>
      <li>
        <Habit {habit} />
      </li>
    </ul>
  {/each}
{:else}
  <p class="loading">loading...</p>
{/if}
