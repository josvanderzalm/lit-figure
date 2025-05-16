## Data Transformation Examples

### 1. Pivot (Long → Wide)

**Before:**

| year | fruit  | sales |
| ---- | ------ | ----- |
| 2020 | Apple  | 10    |
| 2020 | Banana | 12    |
| 2021 | Apple  | 14    |
| 2021 | Banana | 15    |

**After (pivot on `fruit`):**

| year | Apple | Banana |
| ---- | ----- | ------ |
| 2020 | 10    | 12     |
| 2021 | 14    | 15     |

---

### 2. Unpivot / Melt (Wide → Long)

**Before:**

| year | Apple | Banana |
| ---- | ----- | ------ |
| 2020 | 10    | 12     |
| 2021 | 14    | 15     |

**After (unpivot):**

| year | fruit  | sales |
| ---- | ------ | ----- |
| 2020 | Apple  | 10    |
| 2020 | Banana | 12    |
| 2021 | Apple  | 14    |
| 2021 | Banana | 15    |

---

### 3. Transpose (Swap rows ↔ columns)

**Before:**

| year | Apple | Banana |
| ---- | ----- | ------ |
| 2020 | 10    | 12     |
| 2021 | 14    | 15     |

**After (transposed):**

|        | 2020 | 2021 |
| ------ | ---- | ---- |
| Apple  | 10   | 14   |
| Banana | 12   | 15   |

---

### 4. Group / Aggregate

**Before:**

| year | fruit  | sales |
| ---- | ------ | ----- |
| 2020 | Apple  | 10    |
| 2020 | Banana | 12    |
| 2020 | Apple  | 5     |

**After (`group by year, fruit`, sum sales):**

| year | fruit  | total_sales |
| ---- | ------ | ----------- |
| 2020 | Apple  | 15          |
| 2020 | Banana | 12          |

---

### 5. Join / Merge

**Table A:**

| fruit  | color  |
| ------ | ------ |
| Apple  | Red    |
| Banana | Yellow |

**Table B:**

| fruit  | sales |
| ------ | ----- |
| Apple  | 10    |
| Banana | 12    |

**After (join on `fruit`):**

| fruit  | color  | sales |
| ------ | ------ | ----- |
| Apple  | Red    | 10    |
| Banana | Yellow | 12    |

---

### 6. Split / Explode

**Before:**

| year | fruits       |
| ---- | ------------ |
| 2020 | Apple,Banana |

**After (explode on `fruits`):**

| year | fruit  |
| ---- | ------ |
| 2020 | Apple  |
| 2020 | Banana |

---

### 7. Stack / Unstack (MultiIndex tables)

**Before:**

| year | fruit  | sales |
| ---- | ------ | ----- |
| 2020 | Apple  | 10    |
| 2020 | Banana | 12    |
| 2021 | Apple  | 14    |

**After (unstack `fruit`):**

| year | Apple | Banana |
| ---- | ----- | ------ |
| 2020 | 10    | 12     |
| 2021 | 14    | NaN    |
