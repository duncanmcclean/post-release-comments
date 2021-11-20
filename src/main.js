const core = require('@actions/core')
const { GitHub } = require('@actions/github');

exports.main = async function main() {
    try {
        core.warning(process.env.GITHUB_TOKEN)

        const octokit = new GitHub(process.env.GITHUB_TOKEN)

        const version = core.getInput('version')
        const changelogBody = core.getInput('changelog')

        // const issueReferenceExpression = /(?:(?<![/\w-.])\w[\w-.]+?\/\w[\w-.]+?|\B)#[1-9]\d*?\b/g // This one supports things like: doublethreedigital/runway#641
        const issueReferenceExpression = /(?<![a-zA-Z])#[1-9]\d*?\b/g // Whereas, this just supports #641

        let references = changelogBody.match(issueReferenceExpression)

        references.forEach((reference) => {
            octokit.rest.issues.createComment({
                owner: 'doublethreedigital',
                repo: 'gh-actions-release-workflow-test',
                issue_number: reference.replace('#', ''),
                body: `Released as part of ${version}. Hope you have a great rest of your day!`,
            })
        })

        core.info("Done all the things by this point.")
    } catch (error) {
        core.setFailed(error.message)
    }
}
