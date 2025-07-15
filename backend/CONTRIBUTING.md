<!-- 
TODO: Add contributing instructions & how-to's for backend specific set up. Eg: 
 - Brief overview/description of backend system
 - Ruff pre-commit linting/formatting hooks & how to set them up
 - Testing setup & procedures
 - Links to tool documentation(?)
 - Etc.
-->
# 

## Ruff pre-commit hook setup
Once you have the `.pre-commit-config.yaml` and `pyproject.toml` files in your repo, navigate to
`pink-protocol/` (the root directory) where the `.pre-commit-config.yaml` file is and run these
commands:
```bash
pip install pre-commit
pre-commit install
```
This installs the pre-commit framework then initializes it on the repo. Now every time you run a
`git commit`, Ruff will lint then format your code. For naming errors, you still have to manually
rename the functions & classes, these do not get auto-fixed.
> [!IMPORTANT]
> It's important to note that when the checks fail, the commit will be rejected with the Ruff-made
> fixes and you will have to manually fix naming errors (if any) then re-stage all new changes to
> try committing again.
