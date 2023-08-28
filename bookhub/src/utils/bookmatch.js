import { getBook, getGenre, getDislikes } from "../firebaseAPI/firebaseAPI";

//Main algorithms for fetching books based on preferences

//Function for default landing page
/**
 * @param cb : callback function to use
 * @returns array of 5 most popular attributes predefined
 */
function default_fetch(cb) {
    const attributes = [
        { key: "Fantasy", type: "subject" },
        { key: "Fiction", type: "subject" },
        { key: "Science", type: "subject" },
        { key: "Adventure", type: "subject" },
        { key: "Romance", type: "subject" },
    ]

    let data = [];
    let i = 0;

    for (const attr of attributes) {
        data.push(getFunct(attr.key, attr.type));
    };

    Promise.all(data).then((val) => {
        let sub = [];
        val.map(a => sub.push(a.json()))
        console.log(sub)
        Promise.all(sub).then((val) => {
            let final = []
            for (let i = 0; i < attributes.length; i++) {
                let obj = {
                    data: val[i].items,
                    attr: attributes[i].key
                }
                final.push(obj)
            }
            cb(final);
        })
    });

}

function personalized_fetch(uid, cb) {
    const attributes = [
        { key: "Fantasy", type: "subject" },
        { key: "Fiction", type: "subject" },
        { key: "Science", type: "subject" },
        { key: "Adventure", type: "subject" },
        { key: "Romance", type: "subject" },
    ]
    let attributes_arr = ["Fantasy", "Fiction", "Science", "Adventure", "Romance"];
    let per_arr = [];

    getGenre(uid).then(function (val) {
        if (val === null) {
            default_fetch(cb);
        }
        else {
            per_arr = getGenrePer(val);
            console.log(per_arr)


            let data = [];
            let i = 0;

            for (const attr of per_arr) {
                data.push(getFunct(attr.key, attr.type));
            };

            Promise.all(data).then((val) => {
                let sub = [];
                val.map(a => sub.push(a.json()))
                console.log(sub)
                Promise.all(sub).then((val) => {
                    let final = []
                    for (let i = 0; i < per_arr.length; i++) {
                        let obj = {
                            data: val[i].items,
                            attr: per_arr[i].key
                        }
                        final.push(obj)
                    }
                    console.log(final);
                    cb(final);
                })
            });
        }
    })

    cb([]);
    return null;
}

function getGenrePer(val) {
    let arr = []
    let attributes_arr = ["Fantasy", "Fiction", "Science", "Adventure", "Romance"];

    if (val.length >= 5) {
        for (let i = 0; i < val.length; i++) {
            let obj = {
                key: val[i],
                type: "subject"
            }
            arr.push(obj);
        }
    } else {
        for (let i = val.length; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (val.includes(attributes_arr[j])) continue;
                else {
                    val.push(attributes_arr[j]);
                    break;
                }
            }
        }

        for (let i = 0; i < val.length; i++) {
            let obj = {
                key: val[i],
                type: "subject"
            }
            arr.push(obj);
        }

    }
    return arr;
}

//helper for attribute
async function getFunct(attr, identifier) {
    let ans;
    switch (identifier) {
        case "name":
            return await getBook(attr, "any", "any");
        case "author":
            return await getBook("any", attr, "any");
        case "subject":
            return await getBook("any", "any", attr);
        default:
            return await getBook("any", "any", "any");
    }
}

export { default_fetch, personalized_fetch };