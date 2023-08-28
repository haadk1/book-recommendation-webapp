/**
 * Function will take list of all books and partitions into 
 * different subarrays of sized 6 (max) in order to account for carousel
 * @param {*} data : the data to extract from 
 * @returns the modified array of subarrays
 */
function getRowList(data, dislikes) {
    if (data == undefined) return;
    console.log(data);
    let newData = [];
    let counter = 0;
    for (let i = 0; i < 30; i++) {
        if (data[i] == undefined) return newData;

        if (counter == 6 || counter == 0) {
            counter = 0;
            let temp = [];
            newData.push(temp);
        }

        if (!dislikes.includes(data[i].volumeInfo.title)) {
            newData[Math.floor(i / 6)].push(data[i]);
            counter++;
        } else {
            data.splice(i, 1);
            i--;
            continue;
        }
    }
    console.log(newData);
    return newData;

}

function getRowList2(data) {
    if (data == undefined || data.length === 0) return [];
    console.log(data);
    let newData = [];
    let counter = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i] == undefined) return newData;

        if (counter == 6 || counter == 0) {
            counter = 0;
            let temp = [];
            newData.push(temp);
        }

        newData[Math.floor(i / 6)].push(data[i]);
        counter++;

    }
    console.log(newData);
    return newData;

}

//this will become API later
function getImage(id) {
    switch (id) {
        case 1:
            return "/tempAssets/book1.jpg";
        case 2:
            return "/tempAssets/book2.jpg";
        case 3:
            return "/tempAssets/book3.jpg";
        default:
            //throw new Error("no image");
            return "/tempAssets/book1.jpg"
    }

}

export { getImage, getRowList, getRowList2 }