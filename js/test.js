
const pass = "hello123"
const user = "momen"

// * Counter
let artecount = 0;
let subcount = 0;
let weapcount = 0;
let taletcount = 0;


function addArtifactCol(){
    // console.log('aaaa')
    const arteListArea = document.querySelector(`#arte${artecount}`)
    arteListArea.insertAdjacentHTML('afterend',`<input type="text" name="arte" id="arte${artecount+1}">`)
    artecount += 1;
}

function addSubCol(){
    const subListArea = document.querySelector(`#sub${subcount}`)
    subListArea.insertAdjacentHTML('afterend', `<input type="text" name="sub" id="sub${subcount+1}">`)
    subcount += 1;
}

function addWeapCol(){
    const weapList = document.querySelector(`#weap${weapcount}`)
    weapList.insertAdjacentHTML('afterend', `<input type="text" name="weap" id="weap${weapcount+1}">`)
    weapcount += 1;
}

function addTalentCol(){
    const talentList = document.querySelector(`#talent${taletcount}`)
    talentList.insertAdjacentHTML('afterend',`<input type="text" name="talent" id="talent${taletcount+1}">`)
    taletcount +=1;
}

/**
 * 
 * @param {string} data data type, can be artifact, talent, substat or weapon
 * @param {number} counter counter number
 * @returns 
 */
function getDataArray(data,counter){
    const dataArr = [];
    for(let i =0; i < counter+1; i++){
        dataArr.push(document.querySelector(`#${data}${i}`).value)
    }
    return dataArr;
}

function getArteList(){
    const arteArr = [];
    for(let i = 0; i < artecount+1; i++){
        arteArr.push(document.querySelector(`#arte${i}`).value.split(', '))
    }
    return arteArr;
}

function getWeaponList(){
    const weapArr = [];
    for(let i = 0; i < weapcount+1; i++){
        const weapData = document.querySelector(`#weap${i}`).value.split(', ')
        const weapName = weapData[0].toLowerCase().replaceAll("'","").replaceAll(' ','_')
        console.log([weapData, weapData.length])
        const weapObj = {};
        weapObj.id = weapName;

        if (weapData[1]){
            const weapRefine = weapData[1].split(/-/g)
            const refiNumber = []
            weapRefine.forEach(e => {
                refiNumber.push(Number(e))
            })
            weapObj.refine = refiNumber;
            // console.log(weapRefine)
        }
        if (weapData[2]){
            const weapStack = Number(weapData[2])
            weapObj.stack = weapStack
        }
        weapArr.push(weapObj);
    }
    return weapArr;
}


function convert(){
    const cName = document.querySelector(`#name`).value
    const cBuild = document.querySelector(`#build`).value
    const cDesc = document.querySelector('#desc').value
    const isRecommend = document.querySelector('#recomm').checked
    const tips = document.querySelector('#tip').value

    const aSand = document.querySelector('#sand').value
    const aGoblet = document.querySelector('#goblet').value
    const aCirclet = document.querySelector('#circlet').value

    const artelist = getArteList();
    const sublist = getDataArray('sub',subcount);
    const weapList = getWeaponList();
    const talentList = getDataArray('talent', taletcount);

    const out = document.querySelector('#out');

    const dataObj = {
        [cName]: {
            roles: {
                [cBuild]: {
                    recommended: isRecommend,
                    weapons: weapList,
                    artifacts: artelist,
                    mainStats: {
                        sands: aSand,
                        goblet: aGoblet,
                        circlet: aCirclet
                    },
                    subStats: sublist,
                    talent: talentList,
                    tip: tips,
                    note: cDesc
                }
            }
        }
    }

    out.value = JSON.stringify(dataObj,null, 2);
    const blob = new Blob([dataObj],{type: "application/json"})
    saveAs(blob,'test.json')
    console.log(weapList);
}