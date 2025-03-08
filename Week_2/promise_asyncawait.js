function fakeApiCall(){
    var p1 = new Promise ((resolve, reject)=>{
        setTimeout(()=>{
            resolve("I will go to picnic....");
        }, 3000);
    });
    return p1;
}

fakeApiCall()
.then((message)=>{
    console.log(message);
})
.catch((error) =>{
    console.log("Error....",error);
});

async function callApi(){
    try{
        const message = await fakeApiCall();
        console.log(message);
    }
    catch(error){
        console.error(error);
    }
}

callApi();