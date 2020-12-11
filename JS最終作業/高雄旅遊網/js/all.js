const goTop = document.querySelector(".goTop");
const areaChoose = document.querySelector(".area");
const hotbox = document.querySelector(".hotBox");
const hotboxnav = document.querySelector('.hotBoxNav');
const content = document.querySelector('.content');
let areaTitle = document.querySelector('.areaTitle');

const openUrl = "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json";
let xhr = new XMLHttpRequest();
xhr.open('GET',openUrl,true);   //get網址的資料 ，true代表資料不會回傳
xhr.send(null);                 //將網址資料傳送給網頁
let data;
xhr.onreadystatechange = () =>{ //一開始的時候
    if(xhr.readyState === 4 && xhr.status === 200){
        data = JSON.parse(xhr.responseText).result.records;//解析字串
        init();
        // console.log(xhr.readyState);
        // console.log( xhr.status);
    }
};
function init(){
let str = '<option value="notChoose">請選擇</option>';//select使用
let str2 = "";//content使用
let areaNum = 0;
let areaArray = [data[0].Zone];

//select地區儲存(areaArray)
for(let i=0;i<data.length;i++){ //data
    let x=0;//判斷地區有沒有存過
    for(let j=0;j<areaArray.length;j++){//areaArray
        if(data[i].Zone == areaArray[j]){
            x++;
            break;
        }
        
    }
    if(x==0){
        areaArray[areaNum] = data[i].Zone;
        areaNum++;
    }
    
    

}

    //HTML製作option
    for(let i=0,areaNum=0;i<areaArray.length;i++,areaNum++){
        str += `<option value="${areaArray[i]}">${areaArray[i]}</option>`;
    }
    areaChoose.innerHTML = str;
    
    //HTML製作.content的內容
    for(let i=0;i<data.length;i++){
        str2 += `<div class="box">
                <div class="areaImg">
                    <img src=${data[i].Picture1} alt="">
                    <div class="attractionName">${data[i].Name}</div>
                    <div class="areaName">${data[i].Zone}</div>
                </div>
                <ul class="item">
                    <li><div class="icon"><img src="img/icons_clock.png" alt=""></div><span class="opentime">${data[i].Opentime}</span></li>
                    <li><div class="icon"><img src="img/icons_pin.png" alt=""></div><span class="address">${data[i].Add}</span></li>
                    <li><div class="icon"><img src="img/icons_phone.png" alt=""></div><span class="tel">${data[i].Tel}</span></li>
                </ul>
                <div class="free"><img src="img/icons_tag.png" alt=""><span>${data[i].Ticketinfo}</span></div>
            </div>`;
            content.innerHTML = str2;
        
    }
};



areaChoose.addEventListener('change',function changeContent(e){//選單選擇了事件
    const index = areaChoose.selectedIndex;
    if(areaChoose.options[index].value=="notChoose") return; //如果按到"請選擇"就離開
    areaTitle.textContent = areaChoose.options[index].value;//把title地區名稱做更換

    let str="";
    for(let i=0;i<data.length;i++){
        if(areaChoose.options[index].value == data[i].Zone){
            str += `<div class="box">
            <div class="areaImg">
                <img src=${data[i].Picture1} alt="">
                <div class="attractionName">${data[i].Name}</div>
                <div class="areaName">${data[i].Zone}</div>
            </div>
            <ul class="item">
                <li><div class="icon"><img src="img/icons_clock.png" alt=""></div><span class="opentime">${data[i].Opentime}</span></li>
                <li><div class="icon"><img src="img/icons_pin.png" alt=""></div><span class="address">${data[i].Add}</span></li>
                <li><div class="icon"><img src="img/icons_phone.png" alt=""></div><span class="tel">${data[i].Tel}</span></li>
            </ul>
            <div class="free"><img src="img/icons_tag.png" alt=""><span>${data[i].Ticketinfo}</span></div>
        </div>`;
        content.innerHTML = str;
        }
    }
});

goTop.addEventListener('click',function(){
    window.document.documentElement.scrollTop = 0;
});

hotboxnav.addEventListener('click',function(e){//熱門按扭
    let str = '';
    if(e.target.nodeName !== "LI") return;
    for(let i=0;i<data.length;i++){
        if(e.target.textContent == data[i].Zone){
            str += `<div class="box">
            <div class="areaImg">
                <img src=${data[i].Picture1} alt="">
                <div class="attractionName">${data[i].Name}</div>
                <div class="areaName">${data[i].Zone}</div>
            </div>
            <ul class="item">
                <li><div class="icon"><img src="img/icons_clock.png" alt=""></div><span class="opentime">${data[i].Opentime}</span></li>
                <li><div class="icon"><img src="img/icons_pin.png" alt=""></div><span class="address">${data[i].Add}</span></li>
                <li><div class="icon"><img src="img/icons_phone.png" alt=""></div><span class="tel">${data[i].Tel}</span></li>
            </ul>
            <div class="free"><img src="img/icons_tag.png" alt=""><span>${data[i].Ticketinfo}</span></div>
        </div>`;
        content.innerHTML = str;
        }
    }
});