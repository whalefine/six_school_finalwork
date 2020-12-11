const item = document.querySelector('.item');
const result = document.querySelector('.result');
const topPadding = document.querySelector('.top');

//變色過後的class
const result2 = document.querySelector('.result2');
const BMIresult = document.querySelector('.BMIresult');
const BMIText = document.querySelector('.BMIText');
const result_icon = document.querySelector('.result_icon');
const judgeText = document.querySelector('.judgeText');

//身高體重的輸入值
const inputHeight = document.querySelector('.inputHeight');
const inputWeight = document.querySelector('.inputWeight');

const content = document.querySelector('.content');
let data = JSON.parse(localStorage.getItem('datalist')) || [];//將資料提取分析後的變數



window.onload = function(){//想請問網頁打開或重新整理時，要判斷或執行的函式都是用在onload上嗎?
//還是有其他的指令，可以判斷做最開始要做的動作?
    if(data == ""){
        content.textContent = "目前沒有資料，趕快來測試你的BMI吧!";
    }
    else showList();
}
result_icon.addEventListener('click',function(){//變過顏色後的按扭
    inputHeight.focus();
    if(isNaN(Number(inputHeight.value)) ||isNaN(Number(inputWeight.value))){
        inputHeight.value = "";
        inputWeight.value = "";
        alert("請輸入數字");
        return;
    }
    else if(inputHeight.value == "" || inputWeight.value == ""){
        alert("輸入欄不能為空");
        return;
    }
    addStorage();
    colorChange();
    inputHeight.value = "";//清空input
    inputWeight.value = "";//清空input
})
result.addEventListener('click',function(){//初始的按扭
    inputHeight.focus();
    if(isNaN(Number(inputHeight.value)) ||isNaN(Number(inputWeight.value))){
        inputHeight.value = "";
        inputWeight.value = "";
        return;
    }
    else if(inputHeight.value == "" || inputWeight.value == ""){
        alert("輸入欄不能為空");
        return;
    }
    addStorage();
    topPadding.style.paddingRight = 67 + "px";
    this.style.display = "none";
    result2.style.display = "block";
    judgeText.style.display = "block";
    colorChange();
    inputHeight.value = "";//清空input
    inputWeight.value = "";//清空input
});
function colorChange(){//更換按扭區域的顏色和文字
    const x = cal();
    BMIresult.textContent = x;
    if(x<18.5){
        result2.style.border = "7px solid #31BAF9";
        BMIresult.style.color = "#31BAF9";
        BMIText.style.color = "#31BAF9";
        result_icon.style.backgroundColor = "#31BAF9";
        judgeText.style.color = "#31BAF9";
        judgeText.textContent = "過輕";

    }
    else if(x>=18.5 && x<24){
        result2.style.border = "7px solid #86D73F";
        BMIresult.style.color = "#86D73F";
        BMIText.style.color = "#86D73F";
        result_icon.style.backgroundColor = "#86D73F";
        judgeText.style.color = "#86D73F";
        judgeText.textContent = "理想";
    }
    else if(x>=24 && x<27){
        result2.style.border = "7px solid #FF982D";
        BMIresult.style.color = "#FF982D";
        BMIText.style.color = "#FF982D";
        result_icon.style.backgroundColor = "#FF982D";
        judgeText.style.color = "#FF982D";
        judgeText.textContent = "過重";
    }
    else if(x>=27 && x<30){
        result2.style.border = "7px solid #f77416f5";
        BMIresult.style.color = "#f77416f5";
        BMIText.style.color = "#f77416f5";
        result_icon.style.backgroundColor = "#f77416f5";
        judgeText.style.color = "#f77416f5";
        judgeText.textContent = "輕度肥胖";
    }
    else if(x>=30 && x<35){
        result2.style.border = "7px solid #f36845";
        BMIresult.style.color = "#f36845";
        BMIText.style.color = "#f36845";
        result_icon.style.backgroundColor = "#f36845";
        judgeText.style.color = "#f36845";
        judgeText.textContent = "中度肥胖";
    }
    else if(x>=35){
        result2.style.border = "7px solid #FF1200";
        BMIresult.style.color = "#FF1200";
        BMIText.style.color = "#FF1200";
        result_icon.style.backgroundColor = "#FF1200";
        judgeText.style.color = "#FF1200";
        judgeText.textContent = "重度肥胖";
    }
}

function cal(){//計算BMI
    return (inputWeight.value/Math.pow((inputHeight.value/100),2)).toFixed(2);
}

function addStorage(){//新增到data中
    let curDay = new Date();
    let str="";
    const BMIcal = cal();//取得的BMI值
    borderColors="";//胖瘦顏色
    str="";//儲存data(string)
    //判斷顏色和胖瘦
    if(BMIcal<18.5){
        borderColors = "skinny";
        str="過輕";
    }
    else if(BMIcal>=18.5 && BMIcal<24){
        borderColors = "normal";
        str="正常";
    }
    else if(BMIcal>=24 && BMIcal<27){
        borderColors = "overweight";
        str="過重";
    }
    else if(BMIcal>=27 && BMIcal<30){
        borderColors = "overweight1";
        str="輕度肥胖";
    }
    else if(BMIcal>=30 && BMIcal<35){
        borderColors = "overweight2";
        str="中度肥胖";
    }
    else if(BMIcal>=35){
        borderColors = "overweight3";
        str="重度肥胖";
    }


    const todo = {//新增物件
        judgmentColor: borderColors,
        judgment: str,
        BMI: cal(),
        weight: inputWeight.value + 'kg',
        height: inputHeight.value + 'cm',
        date: (curDay.getMonth()+1) + '-' + curDay.getDate() + '-' + curDay.getFullYear(),
    }
    data.push(todo);//物件放到data陣列
    localStorage.setItem('datalist',JSON.stringify(data));
    showList();
}

function showList(){//顯示在瀏覽器中
    let str="";
    for(let i=data.length-1;i>=0;i--){
        str += `<div class="item ${data[i].judgmentColor}">
            <div><h4>${data[i].judgment}</h4></div>
            <div class="centerData">
                <div class="font BMIArea">
                    <span>BMI</span>
                    <span class="BMI">${data[i].BMI}</span>
                </div>
                <div class="font weightArea">
                    <span>weight</span>
                    <span class="weight">${data[i].weight}</span>
                </div>
                <div class="font heightArea">
                    <span>height</span>
                    <span class="height">${data[i].height}</span>
                </div>
            </div>
            <div class="dateBox">
                <span class="date">${data[i].date}</span>
            </div>
        </div>`
    }
    content.innerHTML = str;
}