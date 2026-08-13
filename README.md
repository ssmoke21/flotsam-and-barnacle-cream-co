# 🍦 Flotsam & Barnacle Cream Co.

A fast-paced, top-down pixel-art arcade game set on the beaches of **Long Beach Island, NJ**.
Crazy Taxi urgency meets Paperboy drive-by delivery — you're a seafood ice cream runner
sprinting north up the shoreline before your inventory melts.

**[🍦 Visit the shop](https://ssmoke21.github.io/flotsam-and-barnacle-cream-co/)** ·
**[▶ Beach Blitz](https://ssmoke21.github.io/flotsam-and-barnacle-cream-co/game.html)** ·
**[🏪 Cone Zone](https://ssmoke21.github.io/flotsam-and-barnacle-cream-co/shop.html)**

Two games share the island. **Beach Blitz** (`game.html`) is the delivery run described below.
**Cone Zone** (`shop.html`) is the other side of the counter — see [Cone Zone](#-cone-zone).

No install, no dependencies, no image files — each game is one self-contained HTML file,
and every drawing on the site is pixel art rendered from code.

| File | What it is |
| --- | --- |
| `index.html` | The storefront — arcade, menu, lore, merch |
| `game.html` | **Beach Blitz** — the delivery run, standalone and embeddable |
| `shop.html` | **Cone Zone** — the shop management game, standalone and embeddable |
| `assets/sprites.js` | Hero-scale pixel art shared across the site |
| `assets/site.css` | Storefront styles |
| `.claude/simbot.js` | Dev-only autoplayer for balancing `shop.html` |

## 🏖 Beach Blitz

The delivery run. Sprint north up the island before your inventory melts.

### How to play

| Key | Action |
| --- | --- |
| `W` `A` `S` `D` | Run the beach (left hand) |
| `←` `→` or `J` `L` | Throw a scoop — **hold to throw farther** (right hand) |
| `P` | Pause |
| `Space` | Start / restart |

**You lose when the MELT bar empties — that's the only way to die.** It drains constantly,
faster in dry sand. Landing deliveries refills a little; Barnacle Refill walkways and the
Skipper Dipper refill a lot.

### The run

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

### Landmarks

| Street | Landmark | Effect |
| --- | --- | --- |
| 6th | **Fantasy Island** | Carnival crowd — a dense score rush |
| 20th | **Skipper Dipper** | Full restock + 8-second melt freeze |
| 51st | **Grandma's Beach House** | Land a triple scoop for +5000 and invincibility |
| 58th | **Ship Bottom Shellfish** | Chowder Rush — 3× score for ten streets |

### Town bosses

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

## 🏪 Cone Zone

The second game. Same company, other side of the counter: you work the store in Ship Bottom,
one person covering three stations, until you can afford not to.

| Key | Action |
| --- | --- |
| `W` `A` `S` `D` | Walk the shop (left hand) |
| `J` | Work the station — cast and hook at the dock, hold to churn, scoop at the counter |
| `L` | Load a fish into a machine (or shuffle your basket) |
| `K` | Dump a tub, toss a fish, or turn a customer away |
| `P` | Pause |

**The chain, four steps in one room:**

1. **Dock** — `J` casts, `J` again the moment the bobber dips. One fish is one churn.
2. **Machine** — `L` loads the fish, and the species sets that machine's flavor.
3. **Churn** — hold `J` and let go inside the green band: a full batch is **6 scoops**, about
   three two-scoop cones. Let go early and you get a thin 3; hold too long and the barrel spills.
4. **Counter** — **there is no separate assembly station.** You build the order *at the customer*:
   stand at their spot behind the counter and press `J` once per scoop. The cone sits on the
   counter in front of them and fills as you go — solid scoops are built, hollow ones are still
   owed, and the next one pulses. It hands over on its own when the last scoop lands.

The first shift names the current step on screen until you've got the rhythm.

**The board is the menu.** A machine can only hold one flavor, and the wall board lists
exactly what your machines are set to — so **customers can only order what you have chosen to
make**. Setting the board is the strategic heart of the shift: you are not just keeping stock,
you are deciding what this shop sells today.

**Everyone came in wanting something.** Each customer has one favourite flavor, shown as an icon
over their head while they wait in line. Find it on the board and they are patient and tip
heavily; miss it and they will settle for something else on base pay with a shorter fuse.
Nobody walks out purely over flavor — but a badly chosen board is a thin day.

**The line is your forecast.** People queue out the door when the counter is full, and each one
shows what they want before they reach you. Read the line, churn accordingly.

**Reading the flavors.** Every flavor has a pixel glyph of the thing it is made of — a curled
shrimp, a kelp frond, a clam shell, and the Barnegat lighthouse for the one flavor with no
seafood in it. The glyph appears everywhere the flavor does: the board, the machine plates, the
fish in your basket, and every band of every cone. The board spells the names out in full, so it
teaches the glyphs as you play.

**A line forms when the counter is full.** You open with three spots at the pass; a Longer
Counter and a Second Register take that to six, which is where late-season money goes. Anyone
arriving to a full line gives up at the door — that shows on the night's ledger.

**Rent comes due every night.** Take what's left to the supply-and-payroll screen between
shifts and spend it on equipment or on LBI locals — you name anyone you hire — who will cover
a station while you run somewhere else.

### Saving

Three save slots, and you never have to think about them. A shop **writes itself down at
closing time** — once rent is paid and the season has rolled — and again after anything you
buy, so a hire keeps their name even if you wander off mid-shopping. Picking a shop from the
title screen drops you back at the next morning's buy screen.

The live shift is deliberately not saved: the day is the unit of commitment. Walking out
mid-shift (`P`, then `Q`) costs you that day's takings but leaves the shop standing as of last
night. Failing to make rent is the one thing that clears a slot — that shop is closed for good.
`X` on the picker tears a shop down yourself.

### The seasons

| Season | Days | Weather |
| --- | --- | --- |
| **Early Summer** | 3 | Clear. A quiet boardwalk to learn on. |
| **July Rush** | 4 | **Heat wave** — open tubs melt while they sit. |
| **August Peak** | 5 | **Sea fog** — patience runs short and crowds arrive in bunches. |
| **Labor Day** | 3 | **Nor'easter** — squalls shut the dock; fish hard in the gaps. |
| **Offseason** | ∞ | Locals only. Fewer customers, bigger orders, merch money. |

Survive Labor Day and the shop is yours; the offseason runs forever for score.

### The cast, on the other side of the glass

The first game's bosses come back as customers. The **Shellfish Kraken** orders six at once,
the **Mutant Surfer** won't wait, the **Sandcastle Golem** waits all day, **Grandma** tips like
a legend, and the **Deep Sea Dragon** pays triple. **Flotsam & Barnacle** themselves turn up in
the offseason wanting the Leviathan. The **Seagull King** isn't a customer — he raids a tub, and
standing at the machine is what shoos him off.

Buy the Merch Rack late and some customers stop wanting ice cream altogether: a tee, a cap, a
tote, a sticker — pure margin, sold at the rack.

## Running locally

```bash
node .claude/serve.js
```

Then visit `http://localhost:8123`. (Serve it rather than opening the file directly — the
site loads `assets/` and embeds the game in an iframe.)

## Tuning

Every balance knob lives in the `CONFIG` object at the top of `game.html` — speeds, melt
rates, hazard density, boss belly sizes, landmark streets. Change a number, reload, play.

`shop.html` works the same way: `CONFIG` holds the shift clock, churn timing and sweet spot,
patience, prices and walkout costs; `SEASONS` holds each season's length, rent, spawn rate and
weather; `UPGRADES` holds the store. To check a change without playing fifteen shifts, load the
autoplayer in the console and run whole seasons headlessly:

```javascript
var s=document.createElement('script'); s.src='/.claude/simbot.js'; document.head.appendChild(s);
// then: __sim()  — day-by-day ledger for one run
//       __simN(6) — win rate over six runs
//       __bench(2) — marginal value of every upgrade in a given season
```
