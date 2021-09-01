const zoneInput = document.querySelector('.search-zone');
const search = document.querySelector('.search-btn');
const searchZone= document.querySelector('.search')
const form = document.querySelector('.form');
const Titre = document.querySelector('.title');
const affi = document.querySelector('.affichage');
const select = document.querySelector('.select-option');
const body = document.querySelector('body');
const zoneNoContent = document.querySelector('.msgNoContent');
const load = document.querySelector('.load');
const modalCover= document.querySelector('.modal-content-cover');
const exTitle=document.querySelector('.ex-title');
const exArtist=document.querySelector('.ex-artist');
const exAlbum=document.querySelector('.ex-album');
const exempleAffi=document.querySelector('.affichage-exemple');

load.style.visibility = 'hidden';
let offsetVar = 1;

let btnMore=document.createElement('button')
btnMore.className='more'
btnMore.textContent='more'


form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    exempleAffi.style.color='black';
    exTitle.style.color='black';
    exArtist.style.color='black';
    exAlbum.style.color='black';
    affi.textContent = ' ';
    offsetVar = 1;
    addMore()
    if (select.value == 'Title'){
        exTitle.style.color='orange';
        Title(offsetVar);
    }else if(select.value == 'Artist'){
        exArtist.style.color='orange';
        Artist(offsetVar);
    }else if (select.value == 'Album'){
        exAlbum.style.color='orange';
        Album(offsetVar);
    }else if(select.value == 'Everything'){
        exempleAffi.style.color='orange';
        exTitle.style.color='orange';
        exArtist.style.color='orange';
        exAlbum.style.color='orange';
        Everything(offsetVar);
    }
})

let countRequest = document.createElement('p');
function printCount(count){
    countRequest.textContent = count +' resultat' ;
    if(count <=100){
        btnMore.style.visibility='hidden'
    }
    if(count <= 0){
        btnMore.style.visibility ='hidden'
        let zoneNoResult= document.createElement('div');
        zoneNoResult.className='zoneNoResult';
        
        let msgNoResult = document.createElement('p')
        msgNoResult.className='msgNoResult';
        msgNoResult.textContent='No result for this search'

        affi.appendChild(zoneNoResult)
        zoneNoResult.appendChild(msgNoResult)
        searchZone.appendChild(countRequest)
    }else{
    countRequest.textContent = count-1 +' resultat' ;
    searchZone.appendChild(countRequest)
    }
}

function addrequest(nbr,artist,title,album,length,ratingID,cover,tabTag){

    let affichageDiv = document.createElement('div')
    affichageDiv.className = 'affichage-nom affichage-content';

    let nbrId = document.createElement('p');
    nbrId.className='nbrId';
    nbrId.textContent = nbr;

    let artistId = document.createElement('p');
    artistId.className='artist';
    artistId.textContent = artist;

    let titleId = document.createElement('p');
    titleId.className='title';
    titleId.textContent = title;

    let albumId = document.createElement('p');
    albumId.className='album';
    albumId.textContent = album;

    let actionId = document.createElement('button');
    actionId.className='action';
    actionId.textContent = '➕';

    let line = document.createElement('hr')
    line.className='hr-affiche';
    

    actionId.addEventListener('click',function(){
        modalCover.textContent=' ';
        showModal()
        addModal(artist,title,album,length,ratingID,cover,tabTag)
    });


    affi.appendChild(affichageDiv);
    affichageDiv.appendChild(nbrId);
    affichageDiv.appendChild(artistId);
    affichageDiv.appendChild(titleId);
    affichageDiv.appendChild(albumId);
    affichageDiv.appendChild(actionId);
    affi.appendChild(line)
}

function addModal(artist,title,album,length,ratingID,cover,tabTag){

    addRatings(ratingID);

    let titleModal = document.createElement('h3');
    titleModal.className = 'titleModal';
    titleModal.textContent = 'Title : ' + title;

    let artistModal = document.createElement('h3');
    artistModal.className = 'artistModal';
    artistModal.textContent = 'Artist : ' + artist;

    let albumModal = document.createElement('h3');
    albumModal.className = 'albumModal';
    albumModal.textContent = 'Album : ' + album;

    
    let tagModal = document.createElement('h3')
    tagModal.className='tagModal';
    tagModal.textContent = 'Tags : ' + tabTag


    let lengthModal = document.createElement('h3');
    lengthModal.className = 'lengthModal';
    lengthModal.textContent ='Length : ' + length +'min';
    
    let lineModal = document.createElement('hr')

    let coverTitle = document.createElement('h3')
    coverTitle.className='coverTitle';
    coverTitle.textContent='Cover'

    

    addCover(cover) ;
    

    modalContent.appendChild(titleModal)
    modalContent.appendChild(artistModal)
    modalContent.appendChild(albumModal)
    modalContent.appendChild(lengthModal)
    modalContent.appendChild(tagModal)
    


}

function addMore(){  
    body.appendChild(btnMore);
    btnMore.addEventListener('click',function(){
        offsetVar += 100 ;
        if(select.value == 'Title'){
            Title(offsetVar)
        }else if(select.value == 'Artist'){
            Artist(offsetVar)
        }else if(select.value == 'Album'){
            Album(offsetVar)
        }else if(select.value == 'Everything'){
            Everything(offsetVar)
        }
    })
}


function Title(offsetVar){
    const requestTitle = new XMLHttpRequest();
    requestTitle.open('GET', 'https://musicbrainz.org/ws/2/recording?limit=100&offset='+offsetVar+'&fmt=json&query=recording:'+ '"'+encodeURIComponent(zoneInput.value)+'"', true);
    requestTitle.addEventListener('readystatechange', function () {
        load.style.visibility = 'visible';
        if (requestTitle.readyState === XMLHttpRequest.DONE) {
            if (requestTitle.status === 200) {
                console.log('request good');
                load.style.visibility = 'hidden';
                let response = JSON.parse(requestTitle.responseText);
                console.log(response) ;
                printCount(response.count)
                for (let i = 0;i<response.recordings.length;i++){
                    let tabAlb=[];
                    if(response.recordings[i].releases == undefined){
                        tabAlb = 'Undefined' ;
                    }else{
                        for(l in response.recordings[i].release){
                            tabAlb.push( response.recordings[i].releases[l].title)
                            }
                        albumTitle = response.recordings[i]['releases'][0].title ;
                    }
                    let coverId=[];
                    if(response.recordings[i]['releases'] === undefined){
                        coverId = 'Undefined' ;
                    }else{
                        for(l in response.recordings[i].releases){
                            coverId.push(response.recordings[i]['releases'][l].id )
                            }
                    }
                    let tabTag=[];
                    if(response.recordings[i]['tags'] == undefined){
                        tabTag = 'No tags was find for this song'
                    }else{
                        for(l in response.recordings[i].tags){
                            tabTag.push( response.recordings[i].tags[l].name)
                            }
                    }
                    if (response.recordings[i].length === undefined){
                        lengthMusic = 'No length for this song'
                    }else{
                        lengthMusic= response.recordings[i].length
                    }
                    let tabArtist=[];
                    for(l in response.recordings[i]['artist-credit']){
                        tabArtist.push(response.recordings[i]['artist-credit'][l].name)
                        }
                    addrequest(offsetVar++,tabArtist,response.recordings[i].title,albumTitle,Math.round
                    (lengthMusic/1000/60),response.recordings[i].id,coverId,tabTag)
                }
            } else {
                console.log(requestTitle.status);
            }
        }
    })
    requestTitle.send();
}
function Artist(offsetVar){
    const requestArtist = new XMLHttpRequest();
    requestArtist.open('GET', 'https://musicbrainz.org/ws/2/recording?inc=tags&limit=100&offset='+offsetVar+'&fmt=json&query=artist:'+ '"' + encodeURIComponent(zoneInput.value)+ '"', true) ;
    requestArtist.addEventListener('readystatechange', function () {
        load.style.visibility = 'visible';
        if (requestArtist.readyState === XMLHttpRequest.DONE) {
            if (requestArtist.status === 200) {
                load.style.visibility = 'hidden';
                console.log('request good');
                let responseArtist = JSON.parse(requestArtist.responseText);
                printCount(responseArtist.count);
                console.log(responseArtist)
                for (let i = 0;i<responseArtist.recordings.length;i++){
                    let tabAlb=[];
                    if(responseArtist.recordings[i].releases == undefined){
                        tabAlb = 'Undefined' ;
                    }else{
                        for(l in responseArtist.recordings[i].releases){
                            tabAlb.push( responseArtist.recordings[i].releases[l].title)
                            }
                    }
                    if (responseArtist.recordings[i].length === undefined){
                        lengthMusic = 'No length for this song'
                    }else{
                        lengthMusic= responseArtist.recordings[i].length
                    }
                    let tabTag=[];
                    if(responseArtist.recordings[i]['tags'] == undefined){
                        tabTag = 'No tags was find for this song'
                    }else{
                        for(l in responseArtist.recordings[i].tags){
                            tabTag.push( responseArtist.recordings[i].tags[l].name)
                            }
                    }
                    let coverId=[];
                    if(responseArtist.recordings[i]['releases'] === undefined){
                        coverId = 'Undefined' ;
                    }else{
                        for(l in responseArtist.recordings[i].releases){
                            coverId.push(responseArtist.recordings[i]['releases'][l].id )
                            }

                    }
                    console.log(coverId)
                    let tabArtist=[];
                    for(l in responseArtist.recordings[i]['artist-credit']){
                        tabArtist.push(responseArtist.recordings[i]['artist-credit'][l].name)
                        }
                    addrequest(offsetVar++,tabArtist,responseArtist.recordings[i].title,tabAlb,Math.round(lengthMusic/1000/60),responseArtist.recordings[i].id,coverId,tabTag)
                }
                
                
            } else {
                console.log(requestArtist.status);
            }
        }
    })
    requestArtist.send();
}

function Album(offsetVar){
    const requestAlbum = new XMLHttpRequest();
    requestAlbum.open('GET', 'https://musicbrainz.org/ws/2/recording?inc=tags&status:official&limit=100&offset='+offsetVar+'&fmt=json&query=release:'+ '"' + encodeURIComponent(zoneInput.value)+ '"', true) ;
    requestAlbum.addEventListener('readystatechange', function () {
        load.style.visibility = 'visible';
        if (requestAlbum.readyState === XMLHttpRequest.DONE) {
            if (requestAlbum.status === 200) {
                load.style.visibility = 'hidden';
                console.log('request album good');
                let responseAlbum = JSON.parse(requestAlbum.responseText);
                console.log(responseAlbum)
                printCount(responseAlbum.count);
                for (let i = 0;i<responseAlbum.recordings.length;i++){
                    if (responseAlbum.recordings[i].length === undefined){
                        lengthMusic = 'No length for this song'
                    }else{
                        lengthMusic= responseAlbum.recordings[i].length
                    }
                    let tabAlb=[];
                    if(responseAlbum.recordings[i].releases == undefined){
                        tabAlb = 'Undefined' ;
                    }else{
                        for(l in responseAlbum.recordings[i].releases){
                            tabAlb.push( responseAlbum.recordings[i].releases[l].title)
                            }
                    }
                    let tabTag=[];
                    if(responseAlbum.recordings[i]['tags'] == undefined){
                        tabTag = 'No tags was find for this song'
                    }else{
                        for(l in responseAlbum.recordings[i].tags){
                            tabTag.push( responseAlbum.recordings[i].tags[l].name)
                            }
                    }
                    let coverId=[];
                    if(responseAlbum.recordings[i]['releases'] === undefined){
                        coverId = 'Undefined' ;
                    }else{
                        for(l in responseAlbum.recordings[i].releases){
                            coverId.push(responseAlbum.recordings[i]['releases'][l].id )
                            }
                    }
                    let tabArtist=[];
                    for(l in responseAlbum.recordings[i]['artist-credit']){
                        tabArtist.push(responseAlbum.recordings[i]['artist-credit'][l].name)
                        }
                    addrequest(offsetVar++,tabArtist,responseAlbum.recordings[i].title,tabAlb,Math.round(lengthMusic/1000/60),responseAlbum.recordings[i].id,coverId,tabTag)
                }
            } else {
                console.log(requestAlbum.status);
            }
        }
    })
    requestAlbum.send();
}

function Everything(offsetVar){
    const requestEverything = new XMLHttpRequest();
    requestEverything.open('GET', 'https://musicbrainz.org/ws/2/recording?&limit=100&offset='+offsetVar+'&fmt=json&query='+ '"' + encodeURIComponent(zoneInput.value)+ '"', true) ;
    requestEverything.addEventListener('readystatechange', function () {
        load.style.visibility = 'visible';
        if (requestEverything.readyState === XMLHttpRequest.DONE) {
            if (requestEverything.status === 200) {
                load.style.visibility = 'hidden';
                console.log('request album good');
                let responseEverything = JSON.parse(requestEverything.responseText);
                console.log(responseEverything)
                printCount(responseEverything.count);
                for (let i = 0;i<responseEverything.recordings.length;i++){
                    if (responseEverything.recordings[i].length === undefined){
                        lengthMusic = 'No length for this song'
                    }else{
                        lengthMusic= responseEverything.recordings[i].length
                    }
                    let tabAlb=[];
                    if(responseEverything.recordings[i].releases == undefined){
                        tabAlb = 'Undefined' ;
                    }else{
                        for(l in responseEverything.recordings[i].releases){
                            tabAlb.push( responseEverything.recordings[i].releases[l].title)
                            }
                    }
                    let tabTag=[];
                    if(responseEverything.recordings[i]['tags'] == undefined){
                        tabTag = 'No tags was find for this song'
                    }else{
                        for(l in responseEverything.recordings[i].tags){
                            tabTag.push( responseEverything.recordings[i].tags[l].name)
                            }
                    }
                    
                    let coverId=[];
                    if(responseEverything.recordings[i]['releases'] === undefined){
                        coverId = 'Undefined' ;
                    }else{
                        for(l in responseEverything.recordings[i].releases){
                            coverId.push(responseEverything.recordings[i]['releases'][l].id )
                            }
                    }
                    let tabArtist=[];
                    for(l in responseEverything.recordings[i]['artist-credit']){
                        tabArtist.push(responseEverything.recordings[i]['artist-credit'][l].name)
                        }
                    addrequest(offsetVar++,tabArtist,responseEverything.recordings[i].title,tabAlb,Math.round(lengthMusic/1000/60),responseEverything.recordings[i].id,coverId,tabTag)
                }
                
            } else {
                console.log(requestEverything.status);
            }
        }
    })
    requestEverything.send();
}
function addRatings(ratingID){
    const requestRating = new XMLHttpRequest();
    requestRating.open('GET','https://musicbrainz.org/ws/2/recording/'+ratingID+'?inc=ratings&fmt=json',true);
    requestRating.addEventListener('readystatechange',function(){
        if(requestRating.readyState === XMLHttpRequest.DONE){
            if(requestRating.status === 200){
                let responseRatings=JSON.parse(requestRating.responseText)
                console.log(responseRatings)
                let noteRating = document.createElement('h3');
                noteRating.className='noteRating';
                if(responseRatings.rating.value===null){
                    noteRating.textContent='Note : No rating for this song';
                    modalContent.appendChild(noteRating);
                }else{
                noteRating.textContent='Note :'+responseRatings.rating.value+'/5' ;
                modalContent.appendChild(noteRating);
                }
            }else{
               
            }
        }
    })
    requestRating.send();
}

function addCover(cover){
    for(i=0;i<cover.length;i++){
const requestCover = new XMLHttpRequest();
    requestCover.open('GET','http://coverartarchive.org/release/'+cover[i], true);
    requestCover.addEventListener('readystatechange', function () {
        load.style.visibility = 'visible';
        if (requestCover.readyState === XMLHttpRequest.DONE) {
            if (requestCover.status === 200) {
                load.style.visibility = 'hidden';
                console.log('request good');
                let responseCover = JSON.parse(requestCover.responseText);
                console.log(responseCover)
                for (let i = 0;i<responseCover.images.length;i++){
                    let imgModal = document.createElement('img');
                    imgModal.src = responseCover.images[i]['thumbnails'].small;
                    modalCover.appendChild(imgModal);
                }
                }
                // if((requestCover.status == 404) ||(requestCover.status == 400)){
                //     let coverLess = document.createElement('p');
                //     coverLess.className='coverLess';
                //     coverLess.textContent = 'No cover was find for this album';
                //     modalCover.appendChild(coverLess)
                // }
            } else {
                console.log(requestCover.status);

            }
        })
    requestCover.send();
    }
}
