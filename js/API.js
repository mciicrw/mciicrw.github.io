
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
const octokit = new Octokit();
const name = "mciicrw";

const activiTypes = {
    CommitCommentEvent :{
        type: "Comment",
        color: "#b48ead"
    },
    CreateEvent:{
        type: "Create",
        color: "#b48ead"
    },
    DeleteEvent:{
        type: "Delete",
        color: "#b48ead"
    },
    ForkEvent:{
        type: "Fork",
        color: "#b48ead"
    },
    GollumEvent:{
        type: "Gollum",
        color: "#b48ead"
    },
    IssueCommentEvent:{
        type: "Comment",
        color: "#b48ead"
    },
    IssuesEvent:{
        type: "Issues",
        color: "#b48ead"
    },
    PublicEvent:{
        type: "Public",
        color: "#b48ead"
    },
    PullRequestEvent:{
        type: "PR",
        color: "#b48ead"
    },
    PullRequestReviewEvent:{
        type: "Comment",
        color: "#b48ead"
    },
    PushEvent:{
        type: "Push",
        color: "#b48ead"
    },
    ReleaseEvent:{
        type: "Release",
        color: "#b48ead"
    },
    WatchEvent:{
        type: "Watch",
        color: "#b48ead"
    }
}

const actiDescNoPayload = {
    Delete: "Repository deleted for good",
    Public: "Repository is now public!",
}

/** fetch user's latest activity details from github using octokit/core.js */
async function getActivityDetails(username){
    const actiList = await octokit.request(`GET /users/{username}/events/public`,{
        username: username,
        per_page: 1,
    })
    return actiList.data[0];
}

/** fetch user details from github using octokit/core.js */
async function getUserDetails(username) {
    const details = await octokit.request(`GET /users/{username}`,{
        username: username,
    })
    return details.data;
}

/** return string data from payload  */
async function fetchDescription(type, data){
    // check if event type is delete or public
    // if true imedieately return object vaule from actiDescNoPayload
    if (type === "Delete" || type === "Public") return actiDescNoPayload[type];

    let output = ""
    switch(type){
        case "Comment": 
            output = data.payload.comment.body;
            break;
        case "Create":
            output = data.payload.description;
            break;
        case "Fork":
            output = `Forked to ${data.payload.forkee.full_name}`
            break;
        case "Gollum":
            if(data.payload.pages.length > 1) output = `${data.payload.pages.length} wiki pages updated!`;
            output = data.payload.pages[0].title;
            break;
        case "Issues":
            output = data.payload.issue.title;
            break;
        case "PR":
            output = data.payload.pull_request.title;
            break;
        case "Push":
            output = data.payload.commits[0].message;
            break;
        case "Release":
            output = data.payload.description;
            break;
        case "Watch":
            output = `${data.payload.action} the repos!`
            break;
        default:
            output = "unknown activities";
    }
    return output;
}

/** Parse Date into readable format */
async function parseDate(date){
    // split string into individual character
    const dateArr = date.split('');

    // remove last character from array, in this case is "Z"
    const rmZ = dateArr.pop();

    // join array after last character removed
    const datenoZ = dateArr.join('');

    // using moment.js parse date into "x ago" format
    const dateResult = moment.parseZone(datenoZ).local().fromNow();

    return dateResult;
}


async function actiObjBuilder(username){
    // get the data from github API
    const actiDetails = await getActivityDetails(username);

    // parse the type to get he type text & color 
    const type = activiTypes[actiDetails.type];

    // fetch description from activity payload
    // based on activity type
    const actiDesc = await fetchDescription(type.type,actiDetails);
    
    // make empty object
    let activities = {};

    // put data from variable into one activity object
    activities.date = await parseDate(actiDetails.created_at);
    activities.type = type.type;
    activities.color = type.color;
    activities.repo = actiDetails.repo.name;
    activities.desc = actiDesc;

    return activities;
}


/** display data into html */
async function displayData(username){
    const userDetails = await getUserDetails(username);
    const activityDetails = await actiObjBuilder(username);

    // console.log(userDetails);
    // console.log(activityDetails);
    
    // display avatar, follow, and repo count
    document.querySelector('#pp').src = userDetails.avatar_url;
    document.querySelector('#follow').innerHTML = `<strong>${userDetails.followers} Followers ${userDetails.following} Following ${userDetails.public_repos} Repositories</strong>`

    // display recent activities
    document.querySelector('#type').innerHTML = `<strong>${activityDetails.type}</strong>`;
    document.querySelector('#type').style.background = activityDetails.color;
    document.querySelector('#repo').innerHTML = `<a href="https://github.com/${activityDetails.repo}">${activityDetails.repo}</a>`;
    document.querySelector('#comment').innerHTML = activityDetails.desc;
    document.querySelector('#time').innerHTML = activityDetails.date;
    
}

displayData(name);





/*
flow
display data ---> display user --> get user details
              |-> 

get user details -> check type -> get type -> print

document.querySelector('#pp').src = details.data.avatar_url;
    document.querySelector('#follow').innerHTML = `<strong>${details.data.followers} Followers ${details.data.following} Following ${details.data.public_repos} Repositories</strong>`

*/