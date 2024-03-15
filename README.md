# gsgcms
Google Sheet Github Community Management System (GSGCMS)

A simple Google Form, Google Sheet, and GitHub issue system for managing anything "inbound" as a GitHub issue.

## Setup

### Google Form

First, create a google form and populate it with any fields you need. The script uses 2 fields to create an issue title, and then populates the issue body with all of the fields, making this mvp scalable.

### Google Sheets

Simply enable the Google Sheet support for the Google Form and it will autocreate and associate the sheet.


### App Script

In the associated Google Sheet, open Extensions > App Script and copy the included `app_script.js` into it.

Next navigate to the App Script Triggers UI, Clock icon, and add a new trigger.

Set:
- Event: From spreadsheet - On form submit
- Function: createGitHubIssue

### GitHub

The app script requires 3 things:

- A GitHub Fine Grain Token
- A GitHub Username, this is the submission user.
- A GitHub Repo, which should match the token...

### Workflow

With your GitHub parameters in the app script, try to submit a form. Alot can go wrong with configurations here, but generally try to keep everything named consistantly and it should work.

In Google App Script UI, you can configure triggers to notify you immediately and this will include errors.

A demo form can be found here: https://forms.gle/xrE7EHwsy5HXzeoNA -- which feeds into this repositoties issues.
