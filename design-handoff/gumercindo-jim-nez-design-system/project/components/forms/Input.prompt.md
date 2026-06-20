Text field for lead-capture forms ("Solicitar una auditoría").

```jsx
<Input label="Email" type="email" placeholder="tu@empresa.com" required
       value={email} onChange={e => setEmail(e.target.value)} />
<Input label="Negocio" hint="¿A qué te dedicás?" />
```

Pass `error` to show a danger state and message. `adornment` renders a leading icon.
