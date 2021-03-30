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


async function getActivityDetails(username){
    const actiList = await octokit.request(`GET /users/{username}/events/public`,{
        username: username,
        per_page: 1,
    })
    return actiList[0];
}

async function getUserDetails(username) {
    const details = await octokit.request(`GET /users/{username}`,{
        username: username,
    })
    return details;
}


/** Parse Date into readable format */
async function parseDate(date){
    const dateArr = date.split('');
    const rmZ = dateArr.pop();
    const datenoZ = dateArr.join('');
    const dateResult = moment(datenoZ).fromNow();

    return dateResult;
}


async function actiObjBuilder(username){
    // get the data from github API
    const actiDetails = getActivityDetails(username).then(response => response.json()).then(response => response).catch(err => console.error(err));

    // parse the type to get he type text & color 
    const type = activiTypes[actiDetails.type];
    
    // make empty object
    let activities = {};

    // put data from variable into one activity object
    activities.date = parseDate(actiDetails.data.created_at);
    activities.type = type.type;
    activities.color = type.color;

    return activities;
}


/** display data into html */
function displayData(username){
    const userDetails = getUserDetails(username).then(result => result.json()).then(result => console.log(result));
    const activityDetails = actiObjBuilder(username)
    console.log(activityDetails);
    console.log(userDetails);
    

    // console.log(userDetails);
    // console.log(activityDetails);
    /*
    // display avatar, follow, and repo count
    document.querySelector('#pp').src = userDetails.data.avatar_url;
    document.querySelector('#follow').innerHTML = `<strong>${userDetails.data.followers} Followers ${userDetails.data.following} Following ${userDetails.data.public_repos} Repositories</strong>`

    // display recent activities
    document.querySelector('#type').innerHTML = `<strong>${activityDetails.type}</strong>`;
    document.querySelector('#type').style.background = activityDetails.color;
    document.querySelector('#repo').innerHTML = `<a href="https://github.com/${activityDetails.data.repo.name}">${activityDetails.data.repo.name}</a>`;
    document.querySelector('#comment').innerHTML = "";
    document.querySelector('#time').innerHTML = activityDetails.date;
    */
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