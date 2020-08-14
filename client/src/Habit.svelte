<script lang="ts">
  import type { HabitData } from './types/Habit';
  export let habit: HabitData;
</script>

<article>
  <h1>{habit.title}</h1>
  <ul>
    {#each habit.sprees as spree}
      <li>
        <p>{spree.start}</p>
        <p>{spree.end}</p>
      </li>
    {/each}
  </ul>
</article>
