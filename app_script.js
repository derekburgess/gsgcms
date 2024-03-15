var GITHUB_TOKEN = '';
var USER_NAME = '';
var REPO_NAME = '';

function createGitHubIssue(e) {
  var formResponse = e.namedValues;
  
  // Combine responses from Name/Handle and Project Name for the title.
  var handle = formResponse['Name/Handle'][0];
  var project = formResponse['Project Name'][0];
  var issueTitle = "Handle: " + handle + ", Project: " + project;

  // Building the body by iterating over all form questions and their responses.
  var issueBody = "";
  for (var question in formResponse) {
    if (formResponse.hasOwnProperty(question)) {
      // Append each question and response to the issue body, separated by new lines.
      // Noticed these populate the issue out of order, I'll debug that later.
      issueBody += question + ": " + formResponse[question][0] + "\n\n";
    }
  }

  // Building the GitHub API request for creating an issue.
  var url = 'https://api.github.com/repos/' + USER_NAME + '/' + REPO_NAME + '/issues';
  var payload = {
    "title": issueTitle,
    "body": issueBody,
    "labels": ["volunteer_submission", "demo"] // Adjust labels as needed.
  };

  var options = {
    "method": "post",
    "headers": {
      "Authorization": "token " + GITHUB_TOKEN,
      "Accept": "application/vnd.github.v3+json"
    },
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true // To prevent the script from stopping on HTTP errors.
  };

  // Sending the request to GitHub API.
  var response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());
}