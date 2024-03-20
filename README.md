# gsgcms
Google Sheet Github Community Management System (GSGCMS)

A simple Google Form, Google Sheet, and GitHub issue system for managing anything "inbound" as a GitHub issue.

## Setup

### Google Form

First, create a google form and populate it with any fields you need. The script uses 2 fields to create an issue title, and then populates the issue body with all of the fields, making this mvp scalable. It is a good idea to enable restrictions and/or input validation where needed.

### Google Sheets

Simply enable the Google Sheet support for the Google Form and it will autocreate and associate the sheet.

Later, if checking the sheet, take note that we call the sheet, not the spreadsheet:

`var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1");`


### App Script

There are two version, a very basic "allow all" script, `app_script_nocheck.js` and a slightly more advanced version that checks against a limited number (5) of unique values for a given field, preventing additional github issues from being created, while still logging the form submissions in the sheet. That script is `app_script_check.js`.

In the associated Google Sheet, open Extensions > App Script and copy/paste `app_script_` into it.

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

When using `app_script_check.js`, the script will keep track of the submission number and append labels to the git issue, `submission: 1`, `submission: 2`, etc.

There is no error for end-users submitting more than 5 submissions... Copy should be provided in the form intro and success message to warn them of this limitation.

In Google App Script UI, you can configure triggers to notify you immediately and this will include errors.

Demo issues can be seen in the /issues section of this repo.

Lastly, the point of keeping all form submissions in the spreadsheet is for auditing against the git issues and if needed, elevating missed submissions.

An improvement could be to pass the git issue id back to the row in the spreadsheet for later validation.
