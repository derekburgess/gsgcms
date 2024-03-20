var GITHUB_TOKEN = '';
var USER_NAME = '';
var REPO_NAME = '';

function createGitHubIssue(e) {
    var formResponse = e.namedValues;
    var discordHandle = formResponse['Discord Handle'][0];
    var email = formResponse['Email'][0];
    var project = formResponse['Project Name'][0];
    var issueTitle = "Submission from: " + discordHandle + ", Project: " + project;
  
    var issueBody = "";
    var fieldOrder = [
      'Name/Handle',
      'Discord Handle',
      'Email',
      'Project Name',
      'Project Description',
      'Links to Project'
    ];
  
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1");
    var data = sheet.getDataRange().getValues();
    var emailCount = 0;
    
    for (var i = 1; i < data.length; i++) {
      if (data[i][3] === email) {
          emailCount++;
      }
    }
  
    if (emailCount > 5) {
      return;
    }
  
    var submissionCount = Math.max(emailCount);
    
    fieldOrder.forEach(function(field) {
      if (formResponse.hasOwnProperty(field)) {
        issueBody += field + ": " + formResponse[field][0] + "\n";
      }
    });
  
    var url = 'https://api.github.com/repos/' + USER_NAME + '/' + REPO_NAME + '/issues';
    var payload = {
      "title": issueTitle,
      "body": issueBody,
      "labels": ["volunteer_submission", "submission: " + submissionCount]
    };
  
    var options = {
      "method": "post",
      "headers": {
        "Authorization": "token " + GITHUB_TOKEN,
        "Accept": "application/vnd.github.v3+json"
      },
      "contentType": "application/json",
      "payload": JSON.stringify(payload),
      "muteHttpExceptions": false
    };
  
    var response = UrlFetchApp.fetch(url, options);
    Logger.log(response.getContentText());
  }