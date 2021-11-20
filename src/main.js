const core = require('@actions/core')
const { GitHub } = require('@actions/github');

exports.main = async function main() {
    try {
        const octokit = new GitHub(core.getInput('myToken'))

        const version = core.getInput('version')
        const changelogBody = core.getInput('changelog')

        // const issueReferenceExpression = /(?:(?<![/\w-.])\w[\w-.]+?\/\w[\w-.]+?|\B)#[1-9]\d*?\b/g // This one supports things like: doublethreedigital/runway#641
        const issueReferenceExpression = /(?<![a-zA-Z])#[1-9]\d*?\b/g // Whereas, this just supports #641

        changelogBody.match(issueReferenceExpression).forEach((reference) => {
            octokit.rest.issues.createComment({
                ...github.context.repo,
                issue_number: reference.replace('#', ''),
                body: `Released as part of [${version}](https://github.com/${github.context.repo.owner}/${github.context.repo.repo}/releases/tag/${version}).`,
            })
        })

        core.info("All Done!")
    } catch (error) {
        core.setFailed(error.message)
    }
}
