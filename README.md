# 🍦 Flotsam & Barnacle Cream Co.

A fast-paced, top-down pixel-art arcade game set on the beaches of **Long Beach Island, NJ**.
Crazy Taxi urgency meets Paperboy drive-by delivery — you're a seafood ice cream runner
sprinting north up the shoreline before your inventory melts.

**[▶ Play it here](https://ssmoke21.github.io/flotsam-and-barnacle-cream-co/)**

No install, no dependencies — the whole game is one self-contained HTML file.

## How to play

| Key | Action |
| --- | --- |
| `W` `A` `S` `D` | Run the beach (left hand) |
| `←` `→` or `J` `L` | Throw a scoop — **hold to throw farther** (right hand) |
| `P` | Pause |
| `Space` | Start / restart |

**You lose when the MELT bar empties — that's the only way to die.** It drains constantly,
faster in dry sand. Landing deliveries refills a little; Barnacle Refill walkways and the
Skipper Dipper refill a lot.

## The run

Sprint north through six LBI towns — **Beach Haven → Brant Beach → Ship Bottom → Surf City
→ Harvey Cedars → Barnegat Light** — across 120 streets.

- **Pick your lane.** Wet sand at the shoreline is 50% faster but crawling with crabs, rogue
  waves, and sea dragons. Dry sand is slow and melts your stock twice as fast. The damp
  middle is the safe compromise.
- **Deliver on the move.** Every sunbather wants a scoop. Tap for a short toss, hold to lob
  farther, and watch the shadow to read where it lands.
- **Chain your hits.** Six deliveries in a row triggers a **Brain Freeze Rush** — melt freezes,
  speed spikes, throws are free.
- **Keep it fresh.** Scoops are FRESH (2× points), DRIPPY, or SOUP depending on your melt
  level. Soup is worthless to sunbathers but bosses will still slurp it.

## Landmarks

| Street | Landmark | Effect |
| --- | --- | --- |
| 6th | **Fantasy Island** | Carnival crowd — a dense score rush |
| 20th | **Skipper Dipper** | Full restock + 8-second melt freeze |
| 51st | **Grandma's Beach House** | Land a triple scoop for +5000 and invincibility |
| 58th | **Ship Bottom Shellfish** | Chowder Rush — 3× score for ten streets |

## Town bosses

Every town line is blocked by a boss. Bosses take **no damage** — you defeat them by filling
their belly with ice cream until they fall asleep satisfied. Lobs fly straight up, so stand
under the mouth and hold to set your height. Running closer makes the shot much easier, and
a crate washes up whenever you're low on scoops.

They fight back by marking a spot on the sand and striking it — **move off the mark** or
lose melt.

1. **The Seagull King** — hovers and dive-bombs to steal scoops
2. **Sandcastle Golem** — mouth opens and shuts; time your lob
3. **Shellfish Kraken** — three tentacles, each with its own belly
4. **Mutant Surfer Dude** — zig-zags fast; lead your throw
5. **Deep Sea Dragon** — only feedable during his lunge window
6. **Flotsam & Barnacle** — twin heads at the lighthouse; sate both at once to win

## Running locally

Just open `index.html` in a browser. Or serve it:

```bash
node .claude/serve.js
```

Then visit `http://localhost:8123`.

## Tuning

Every balance knob lives in the `CONFIG` object at the top of `index.html` — speeds, melt
rates, hazard density, boss belly sizes, landmark streets. Change a number, reload, play.
