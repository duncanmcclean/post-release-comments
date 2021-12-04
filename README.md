# Post Release Comments

A GitHub Action which comments on Issues and Pull Requests when they've been addresses within a release.

## Example

1. User opens GitHub Issue #123 with a bug
2. Maintainer fixes #123 & closes issue
3. Maintainer tags a new release containing the fix
4. This action will leave a comment on Issue #123: `Released as part of v1.2.3`

## Usage

This action assumes you keep a `CHANGELOG.md` and you have some way of getting the latest release from that changelog. I often use [`statamic/changelog-action`](https://github.com/statamic/changelog-action) for this.

Anyways, this is how you'd implement this in an Actions workflow:

```yaml
- name: Comment on related issues
  uses: duncanmcclean/post-release-comments@v1.0.3
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
    version: ${{ github.ref }}
    changelog: ${{ steps.changelog.outputs.text }}
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
