Renders the Gumercindo Jiménez mark from shipped assets. Set `base` to the relative path back to the design-system root so the image resolves.

```jsx
<Logo variant="lockup" tone="light" base="../.." height={48} />
<Logo variant="symbol" tone="dark" height={32} />
```

`variant`: `symbol` (GJ only) or `lockup` (GJ + wordmark). `tone`: `light` (default), `dark`/`onDark` (for deep-green backgrounds), `gold`. The symbol mark is raster from the source logo — for large hero use, request a vector.
