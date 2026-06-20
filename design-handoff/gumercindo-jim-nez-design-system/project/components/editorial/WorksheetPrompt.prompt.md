The core journaling unit of Gumercindo's workbooks & diarios.

```jsx
<WorksheetPrompt variant="card" lines={3}
  example="Me quejo de que nunca tengo tiempo para lo importante.">
  ¿Qué queja recurrente tenés sobre tu trabajo?
</WorksheetPrompt>

<WorksheetPrompt variant="plain" number={1}>
  ¿Qué 'bar' de lo conocido te está costando más caro hoy?
</WorksheetPrompt>
```

`variant="card"` = the diario's filled question-card (uses `--editorial-band`, so it's green in a workbook, violet in the Mata diario). `variant="plain"` = the workbook's numbered serif question. Set `lines` for ruled answer space and `example` for a worked hint.
