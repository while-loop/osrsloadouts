# Contributing

Thanks for your interest in contributing to OSRS Loadouts!

We have a very lightweight process and aim to keep it that way.
Read the sections for the piece you're interested in and go from
there.

If you need quick communication we're usually on [Discord](https://discord.gg/t5VhtF).

# New Code / Features

## Small Change

#### TLDR

1. Open PR against **master** branch with explanation
1. Participate in Github Code Review

#### Long version

For code that requires little to no discussion, please just open a pull request with some
explanation against the **master** branch. 

## Bigger Change

#### TLDR

1. Start proposal of idea in Github issue
1. After design concensus, open PR with the work against the **master** branch
1. Participate in Github Code Review

#### Long version

If however you're working on something bigger, it's usually better to check with us on the idea
before starting on a pull request, just so there's no time wasted in redoing/refactoring or being
outright rejected because the PR is at odds with the design. The best way to accomplish this is to
open an issue to discuss it. It can always start as a Discord conversation but should eventually end
up as an issue to avoid penalizing the rest of the users for not being on Discord. Once we agree on
the way to do something, then open the PR against the **master** branch and we'll commence code review
with the Github code review tools. Then it will be merged into master, and later go out in a release.

## Developer getting started

### Dev Environment
1. Go [v1.14](https://golang.org/doc/install)
1. NodeJS [v12.18](https://nodejs.org/dist/v12.18.3/)
1. MongoDB v4.2.9 (available via `make db` with Docker)

### Go Dependencies
```
make deps
```

### NodeJS Dependencies
```
cd web
npm install
```

## Development

1. Create feature
1. Test the output

```
make test
```


# Bugs

Issues should be filed on Github, simply use the template provided and fill in detail. If there's
more information you feel you should give use your best judgement and add it in, the more the better.

Bugs that have responses from contributors but no action from those who opened them after a time
will be closed with the comment: "Stale"
