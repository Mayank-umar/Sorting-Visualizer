let lastFrameTime =0;
let size = document.getElementById('size').value;
let speed = document.getElementById('speed').value;
let height = 75;
let stop = false;
let idx =0;
let count =0;
let arr=[];
let dummy = [];
let animation = [];
let color = [];

function main(currentTime){
    if(stop){
        return 
    }
    window.requestAnimationFrame(main)
    let seconds = (currentTime-lastFrameTime)/1000;
    if(seconds<1/speed){
        return;
    }
    lastFrameTime = currentTime;
    update()
    updateVariable()
    draw()
}
function draw(){
    let main = document.getElementById('main-count');
    main.innerHTML=''
    dummy.forEach((el,index)=>{
        let newBar = document.createElement('div')
        newBar.classList.add("bar")
        newBar.style.height=`${el}vh`
        newBar.style.width="1vw"
        newBar.style.backgroundColor=`${color[index]}`
        main.appendChild(newBar)
    })
}
function updateVariable(){
    speed = document.getElementById('speed').value
}

function update(){
    let asize = animation.length
    if(idx>=asize){
        for(let i=0;i<size;i++)
        {
            color[i]=`rgb(67, 74, 106)`
        }
        draw()
        stop = true
        return 
    }
    for(let i=0;i<size;i++){
        color[i] = `rgb(67, 74, 106)`
    }
    let opType = animation[idx][0]
    let i = animation[idx][1]
    let j = animation[idx][2]
    if(opType == 0){
        color[i]=`#39FF14`
        color[j]=`#39FF14`
        let t=dummy[i]
        dummy[i] = dummy[j]
        dummy[j] = t
    }
    else if(opType == 1){
        color[i] = `rgb(227, 252, 6)`
        color[j] = `rgb(227, 252, 6)`
    }
    else if(opType == 2){
        color[i] = `#39FF14`
        dummy[i] = j
    }
    idx++
}
function resize(){
    let prevSize = size
    if(prevSize === document.getElementById('size').value)return
    size = document.getElementById('size').value
    document.getElementById("sizeChange").innerHTML = size
    reset()
}
function start(){
    stop = true;
    animation = []
    color = []
    idx = 0
    count = 0;
    for(let i=0;i<size;i++){
        arr[i]==dummy[i]
    }
    let algorithm = document.getElementById("algorithm").value
    if(algorithm == "bubble"){
        bubbleSort()
    }
    if(algorithm=="quick"){
        quickSort(0,size-1)
    }
    if(algorithm == "merge"){
        mergeSort()
    }
    if(algorithm=="insertion"){
        insertionSort()
    }
    if(algorithm=='rQuick'){
        randomizedQuickSort(0,size-1)
    }

    if(algorithm=="selection"){
        selectionSort()
    }
    stop = false
    window.requestAnimationFrame(main)
}
function reset(){
    updateVariable()
    count = 0;
    idx = 0;
    arr = []
    dummy = []
    animation = []
    color = []
    let total = height/size;
    for(let i=0,sz=1;i<size;i++,sz+=total){
        arr[i] = sz
        dummy[i] = arr[i]
        color[i] = `rgb(67, 74, 106)`
    }
    arr.sort(randomSort)
    for(let i=0;i<size;i++){
        dummy[i] = arr[i]
    }
    stop = false
    draw()
}

function randomSort(){
    return Math.random()-0.5;
}
function random(){
    return Math.floor(Math.random()*height+1)
}
function speedValue(val){
    document.getElementById("speedChange").innerHTML=val
}
reset()
draw()

//<============================= Sorting Algoritjms ================================>

function swap(i,j){
    let t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
}
function bubbleSort(){
    for(let i=0;i<size;i++){
        for(let j=0;j<size-1;j++){
            if(arr[j]>arr[j+1]){
                swap(j,j+1)
                animation.push([0,j,j+1])
            }
            else{
                animation.push([1,j,j+1])
            }
        }
    }
}
function quickSort(l,r){
    if(l<r){
        let pvt = pivot(l,r)
        quickSort(l,pvt-1)
        quickSort(pvt+1,r)
    }
}
function randomizedQuickSort(l,r){
    if(l<r){
        let i = l+Math.floor(Math.random()*(r-l+1))
        swap(i,l);
        animation.push([0,i,l])
        let pvt = pivot(l,r)
        randomizedQuickSort(l,pvt-1)        
        randomizedQuickSort(pvt+1,r)        
    }
}
function pivot(l,r){
    let pvt = arr[l],left =l,right=r;
    while(left<right){
        while(arr[left]<=pvt && left<r){
            animation.push([1,left,l])
            left++;
        }
        while(arr[right]>=pvt && right>l){
            animation.push([1,right,l])
            right--;
        }
        if(left<right){
            animation.push([0,left,right])
            swap(left,right);
        }
    }
    animation.push([0,l,right])
    swap(l,right);
    return right;
}

function mergeSort(){
    const axarr = arr.slice();
    merge(arr,0,arr.length-1,axarr);
}
function merge(mainarr,start,end,axarr, ){
    if(start === end)return;
    const mid = Math.floor((start+end)/2);
    merge(axarr,start,mid,mainarr,animation);
    merge(axarr,mid+1,end,mainarr,animation);
    doMerge(mainarr,start,mid,end,axarr,animation);
}
function doMerge(mainarr,start,mid,end,axarr,animation){
    let k = start;
    let i = start;
    let j = mid+1;
    while(i<=mid && j<= end){
        if(axarr[i]<=axarr[j]){
            animation.push([1,k,i]);
            animation.push([2,k,axarr[i]]);
            mainarr[k++] = axarr[i++];
        }
        else{
            animation.push([1,k,i]);
            animation.push([2,k,axarr[j]]);
            mainarr[k++]=axarr[j++];
        }
    }
    while(i<=mid){
        animation.push([1,k,i]);
        animation.push([2,k,axarr[i]]);
        mainarr[k++] = axarr[i++];
    }
    while(j<=end){
        animation.push([1,k,j]);
        animation.push([2,k,axarr[j]]);
        mainarr[k++] = axarr[j++];
    }
}
function insertionSort(){
    let n = arr.length;
    for(let i=1;i<n;i++){
        let key = arr[i];
        let j = i-1;
        while(j>=0 && arr[j]>key){
            animation.push([1,j,j+1]);
            animation.push([2,j+1,arr[j]]);
            arr[j+1] = arr[j];
            j = j-1;
        }
        arr[j+1] = key;
        animation.push([2,j+1,key]);
    }
}
function selectionSort(){
    let n = arr.length;
    for(let i=0;i<n;i++){
        let minIdx = i;
        for(let j = i+1;j<n;j++){
            animation.push([1,j,minIdx]);
            if(arr[minIdx]>arr[j]){
                minIdx = j;
            }
        }
        animation.push([0,i,minIdx]);
        swap(i,minIdx);
    }
}