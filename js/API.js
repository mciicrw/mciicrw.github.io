/*
function activiTypes(type) {
    let event = "";
    if(type ==="PushEvent") event = "Push";
    if(type ==="ForkEvent") event = "Fork";
    if(type ==="CreateEvent") event = "Create";
    if(type ==="DeleteEvent") event = "Delete";
    if(type ==="GollumEvent") event = "Gollum";
    if(type ==="IssueEvent") event = "Issue";
    if(type ==="PullRequestEvent") event = "PR";
    //if(type.includes("Comment")) event = "Comment";
    event = "Unknown"
    return event;
}

function calcuDate(date){
    
}


fetch('https://api.github.com/users/mciicrw/events?per_page=1', {
    headers: {
        'Accept':'application/vnd.github.v3+json'
    }})
    .then(response => response.json())
    .then(data => {
        const activities = activiTypes(data.type);
       /* document.getElementById('status').innerHTML = activities;
        document.getElementById('repo').innerHTML = `<a href="https://github.com/${data.repo.name}>${data.repo.name}</a>`
        document.getElementById('comment').innerHTML = data.payload.commit.message;
        document.getElementById('time').innerHTML = data.created_at;
        
       console.log(activities);
       console.log(data.repo);

        
    })
    .catch(err => console.error(err)) 
    fetch('https://api.github.com/users/mciicrw', {
        headers: {
            'Accept':'application/vnd.github.v3+json'
        }})
        .then(response => response.json())
        .then( data =>{
            document.getElementById('pp').src = data.avatar_url;
            document.getElementById('follow').innerHTML = `<strong>${data.followers} Followers ${data.following} Following ${data.public_repos} Repositories</strong>`
        })
        .catch(err => console.error(err))
        */
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
const octokit = new Octokit();

/* async function getActivityDetails(username) {
    const actiList = await octokit.rest.activity.listPublicEventsForUser({
        username: username,
        per_page: 1,
    });
    console.log(actiList);
}
*/
async function getUserDetails(username) {
    const details = await octokit.request(`GET /users/{username}`,{
        username: username,
    })
    console.log(details.data.avatar_url);
}

getUserDetails('mciicrw');