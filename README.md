# GitHub Action — Merge and Stop

This GitHub Action (written in JavaScript) allows you to leverage GitHub Actions to merge the current branch into another branch without committing and pushing. This is very useful when you want to run assertions assuming the pull-request was merged using the defined method.

## Usage
### Pre-requisites
Create a workflow `.yml` file in your `.github/workflows` directory. An [example workflow](#common-workflow) is available below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs
All of these inputs are required. For more information on these inputs, see the [Workflow syntax for GitHub Actions](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepswith)

- `method`: The merging method to use. Currently supports `''` and `squash`. Optional. Default: `''`
- `reference`: The branch/commit reference to merge into the current branch. For example, `origin/${{ github.head_ref }}`

### Outputs
None.

### Common workflow

Ideally, set this up as an initial job for your workflows. For example:
```yaml
on: pull_request

name: Continuous Integration

jobs:
  build:
    name: Example
    runs-on: ubuntu-latest
    steps:
      - name: Clone the repository
        uses: actions/checkout@v2
        with:
          ref: ${{ github.base_ref }}
          fetch-depth: 0
      - name: Merge and stop
        uses: zgosalvez/github-actions-merge-and-stop@v1
        with:
          method: squash
          reference: origin/${{ github.base_ref }}
```

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)