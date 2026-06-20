# Missing Patterns

![Logo](images/logo.png)

Find lines from a **patterns** tab that do **not** appear anywhere in a **target** tab — the VS Code equivalent of:

```sh
grep -qF "$pattern" target.txt
```

## Usage

1. Open two tabs in VS Code:
   - A **patterns** tab — one pattern per line (e.g. a list of expected strings, IDs, or keywords).
   - A **target** tab — the text to search through.

2. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and run:

   > **Find patterns not contained in target tab**

3. A two-step picker appears:
   - **Step 1/2** — select the patterns tab.
   - **Step 2/2** — select the target tab.

4. A new untitled tab opens with every pattern line that was **not found** as a substring anywhere in the target text.

## Example

**patterns tab**
```
apple
banana
mango
```

**target tab**
```
I like apple pie.
A mango smoothie sounds great.
```

**Result**
```
banana
```

`banana` does not appear anywhere in the target text, so it is the only line returned.

## Notes

- Matching is **case-sensitive** substring search (mirrors `grep -F`).
- Empty lines in the patterns tab are excluded from results (an empty string matches everything).
- The result opens in a new unsaved tab — save it with `Ctrl+S` / `Cmd+S` if needed.
