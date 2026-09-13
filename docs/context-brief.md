# Context brief

Reread this before starting any task. If a task conflicts with it, the brief wins until it's changed on purpose.

## What is being built?

A static proof of concept demonstrator for trade sales assistants at SELCO. The assistant enters a job as the customer describes it at the counter. The tool returns every material that job needs, in the units the merchant sells, with wastage shown as its own line rather than folded into the totals.

There are four tools, built in this order:

1. Masonry
2. Conversion
3. Concrete
4. Hardcore

Masonry, concrete and hardcore are the job-type calculators. Conversion isn't a job type. It's a measure and unit converter: length, area and volume across millimetres, metres, feet and inches, plus coverage arithmetic from a pack or bag figure to whole units. It's also the tool that serves EC7, where the same wall entered in three unit systems has to return the same result. The domain is defined in [conversion-domain.md](conversion-domain.md).

All four share one calculation engine.

## How is it built and served?

- Astro with React islands, in strict TypeScript.
- Node runs at build time only. Nothing runs on a server once it's deployed.
- The output is static files, served from a subdomain.
- A push to the main branch triggers the deploy.

## What does it refuse to do?

- No server and no accounts.
- No personal data is collected or stored.
- No stock levels and no pricing.
- No analytics or tracking of any kind.

A task that needs any of these is out of scope, however small it looks.

## What rules apply to every figure?

Every constant carries four things: a **value**, a **unit**, a **source** and a **date**. A constant without all four doesn't go in.

Every figure the tool shows must be reproducible by hand, from the job's inputs and the listed constants, with a calculator and nothing else. If a result can't be checked that way, it's a defect.

## Where does the arithmetic live?

The engine never imports interface code. The interface never contains arithmetic.

The engine takes inputs and returns quantities. The interface collects inputs and shows what the engine returned. Rounding to merchant units and wastage lines are engine concerns, so they live in the engine too.
