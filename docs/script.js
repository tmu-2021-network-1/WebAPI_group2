const uri = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=';
// const id = 'sunflower';
// const objectID = 436524
// const sheet = 'Studio';
// const endpoint = `${uri}${id}`;

const uri2 = 'https://collectionapi.metmuseum.org/public/collection/v1/objects';

const showMessage = () => {
    const textbox = document.getElementById("input-message");
    // console.log("tes");
    // console.log(textbox);
    const inputValue = textbox.value;
    getData(inputValue);


    // //テキストボックスの値を使って、出力するメッセージを生成する
    // const output = "入力された内容は「" + inputValue + "」です。";
    // //出力用のp要素にメッセージを表示
    // document.getElementById("output-message").innerHTML = output;
}


const renderJson = (json) => {
    const studios = json;
    // console.log(studios);

    // studios.forEach(studio => {
    const studioDiv = document.createElement('div');
    const studioTitle = document.createElement("p");
    studioTitle.className = 'studio-title';
    studioTitle.textContent = studios['title'];

    const studioTitlePhoto = document.createElement("img");
    studioTitlePhoto.width = 100;
    studioTitlePhoto.className = 'studio-photo';
    studioTitlePhoto.src = studios['primaryImage'];
    studioDiv.appendChild(studioTitle);
    studioDiv.appendChild(studioTitlePhoto);
    document.getElementById('Top').appendChild(studioDiv);
    
}

const getData = async (keyword) => {
    try {
        const endpoint = `${uri}${keyword}`;
        const response = await fetch(endpoint);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse.objectIDs);
            jsonResponse.objectIDs.forEach(ID => {
                console.log(`ID : ${ID}`);
                getData2(ID);
            });
            // renderJson(jsonResponse.objectIDs);
            // console.log("HELLO");
        }
    }
    catch (error) {
        console.log(error);
    }
}

const getData2 = async (objectID) => {
    try {
        const endpoint2 = `${uri2}/${objectID}`;
        console.log(`endpoint2 =  ${endpoint2}`)
        const response2 = await fetch(endpoint2);
        console.log(response2)
        if (response2.ok) {
            const jsonResponse2 = await response2.json();
            // console.log(jsonResponse);
            renderJson(jsonResponse2);
            console.log("HELLO");
        }
    }
    catch (error) {
        console.log("BAD");
        console.log(error);
    }
}

// getData();


const load_func = function () {
    console.log(document);
    const textarea = document.getElementById("input-message");
    console.log(textarea);
    textarea.addEventListener("keydown", function (e) {
        if (e.code === 'Enter') {
            // console.log('nisituzi')
            showMessage();
        }
    })


    const button = document.getElementById("push");
    button.addEventListener("click", function (e) {
        showMessage();
    })
}

console.log(document);

window.addEventListener('load', function () {
    load_func()
})