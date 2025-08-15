---
name: "🐛 Bug Report"
description: "Report a bug or unexpected behavior in DevKit Tools"
title: "[BUG] "
labels: ["bug"]
assignees: []
---

body:

- type: markdown
  attributes:
  value: | ## Describe the bug
  A clear and concise description of what the bug is.

- type: input
  id: steps
  attributes:
  label: "Steps to Reproduce"
  description: "Steps to reproduce the behavior"
  placeholder: "1. Go to ...\n2. Click on ...\n3. See error"

- type: input
  id: expected
  attributes:
  label: "Expected behavior"
  description: "Describe what you expected to happen"

- type: input
  id: actual
  attributes:
  label: "Actual behavior"
  description: "What actually happened"

- type: textarea
  id: screenshots
  attributes:
  label: "Screenshots"
  description: "Add screenshots to help explain your problem"

- type: dropdown
  id: severity
  attributes:
  label: "Severity"
  description: "How severe is the bug?"
  options: - Low - Medium - High - Critical
