export const download = (url:string) => new Promise( (resolve, rejecet ) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = event =>{
        resolve(xhr.response)
    };
    xhr.open('GET',url);
    xhr.send();

});