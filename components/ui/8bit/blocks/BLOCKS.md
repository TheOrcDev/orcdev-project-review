# 8bit Gaming Blocks

Retro-styled gaming UI blocks built with the 8bit component library. These blocks use the "Press Start 2P" font and pixelated border styling for an authentic retro gaming aesthetic.

## Available Blocks

- [Main Menu](#main-menu)
- [Combo Counter](#combo-counter)

---

## Main Menu

A navigation menu block displaying menu items with retro button styling.

**Location**: `components/ui/8bit/blocks/main-menu.tsx`

### Usage

```tsx
import MainMenu from "@/components/ui/8bit/blocks/main-menu";

<MainMenu />
<MainMenu className="w-80" />
```

### Props

| Prop        | Type     | Default | Description              |
|-------------|----------|---------|--------------------------|
| `className` | `string` | -       | Additional CSS classes   |

### Notes

Menu items are configured in `config/nav-items.ts`.

---

## Combo Counter

Interactive combo/streak counter with multiplier display. Features animated visual feedback when combos increase, including pulse effects and color-coded multiplier tiers.

**Location**: `components/ui/8bit/blocks/combo-counter.tsx`

### Usage

```tsx
import ComboCounter from "@/components/ui/8bit/blocks/combo-counter";

<ComboCounter />
<ComboCounter initialCombo={10} />
<ComboCounter className="w-64" />
```

### Props

| Prop           | Type     | Default | Description              |
|----------------|----------|---------|--------------------------|
| `initialCombo` | `number` | `0`     | Starting combo value     |
| `className`    | `string` | -       | Additional CSS classes   |

### Multiplier Tiers

The multiplier increases based on the current combo count:

| Combo Range | Multiplier | Badge Color |
|-------------|------------|-------------|
| 0-4         | x1         | Green       |
| 5-9         | x2         | Yellow      |
| 10-19       | x3         | Orange      |
| 20-49       | x4         | Red         |
| 50+         | x5         | Purple      |

### Features

- **Pulse Animation**: Combo number scales up briefly when incremented
- **Color Transitions**: Multiplier badge color changes based on tier
- **Glow Effect**: Subtle purple glow that intensifies with higher combos
- **Interactive Controls**: +1 and Reset buttons for demo/testing
