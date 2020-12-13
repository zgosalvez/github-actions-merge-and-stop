const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const method = core.getInput('method', { required: false });
    const reference = core.getInput('reference', { required: false });

    let mergeArgs = ['merge'];

    switch (method) {
      case '':
        mergeArgs = ['--no-squash']
        break;

      case 'squash':
        mergeArgs = ['--squash']
        break;

      default:
        core.warning(`The "$method" method is not supported.`);
    }

    mergeArgs.push(reference);

    await exec.exec('git', mergeArgs);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();