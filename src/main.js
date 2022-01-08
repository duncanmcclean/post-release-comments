const core = require('@actions/core')
const github = require('@actions/github');

exports.main = async function main() {
    try {
        const octokit = github.getOctokit(process.env.GITHUB_TOKEN)

        const version = core.getInput('version').replace(`refs/tags/`, ``)
        const changelogBody = core.getInput('changelog')

        // const issueReferenceExpression = /(?:(?<![/\w-.])\w[\w-.]+?\/\w[\w-.]+?|\B)#[1-9]\d*?\b/g // This one supports things like: doublethreedigital/runway#641
        const issueReferenceExpression = /(?<![a-zA-Z])#[1-9]\d*?\b/g // Whereas, this just supports #641

        if (issueReferenceExpression === null) {
            return core.warning(`No issue references were found in the provided changelog.`)
        }

        let referenceMatches = changelogBody.match(issueReferenceExpression)

        if (referenceMatches && referenceMatches.length) {
            referenceMatches.forEach((reference) => {
                octokit.rest.issues.createComment({
                    ...github.context.repo,
                    issue_number: reference.replace('#', ''),
                    body: `Released as part of [${version}](https://github.com/${github.context.repo.owner}/${github.context.repo.repo}/releases/tag/${version}).`,
                })
            })
        }

        core.info(`All Done!`)
    } catch (error) {
        core.setFailed(error.message)
    }
}
