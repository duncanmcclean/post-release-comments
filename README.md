# Post Release Comments

**This action is still a work in progress. I'm blocked right now on [an issue](https://github.com/actions/toolkit/issues/938), once I have that sorted, we should be all good!**

A GitHub action to automate the process of commenting on issues/PRs when the related fix has been released.

## Example

1. User opens GitHub Issue #123 with a bug
2. Maintainer fixes #123 & closes issue
3. Maintainer tags a new release containing the fix
4. This action will leave a comment on Issue #123: `Released as part of v1.2.3`

## Usage

This action assumes you keep a `CHANGELOG.md` and you have some way of getting the latest release from that changelog. I often use the [`statamic/changelog-action`](https://github.com/statamic/changelog-action) for this.

Anyways, this is how you'd implement this in an Actions workflow:

```yaml
TODO
```

## Sponsor me!

If you use this Action in one of your workflows, I'd appreciate it if you could [sponsor me](https://github.com/sponsors/duncanmcclean)! I build ad-hock things like this but I also [build addons](https://github.com/doublethreedigital) for a CMS called Statamic.

## Notes to self

### Steps to release

```
npm run prepare
git add dist
git push
git tag v1.x.x
git push --tags
```
