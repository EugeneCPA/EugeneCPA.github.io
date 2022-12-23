let arr = new Array(100);
for (let i = 0; i < 100; i++)
    arr[i] = i // Create an array contain 100 number from 0 -> 99

const input = document.getElementsByTagName("input");

let button = document.getElementsByTagName("button")[0];
button.addEventListener("click", function() {
    const div = document.getElementsByTagName("div");
    for (let val of div)
        val.replaceChildren()

    /** let p = document.createElement("p");
    p.style = "font-size: 40px; text-align: center; font-weight: bold";
    p.innerText = "PROCESSING";

    const interval = setInterval(function() {
        if (txt.endsWith("..."))
            p.innerText = p.innerText.slice(0, p.innerText.length - 3)
        else
            p.innerText += "."
    }, 333);
    div[0].appendChild(p); **/
    const begin = new Date().getTime();

    start(parseInt(input[0].value.split(".").join("")), parseInt(input[1].value.split(".").join("")));

    const end = new Date().getTime();

    let p = document.createElement("p");
    p.innerText = "Execution time : " + (end - begin) / 1000 + " seconds";

    document.getElementsByTagName("div")[1].appendChild(p)

    // div[0].removeChild(p);
    // clearInterval(interval)
})

function sum(arr) { // input Array MUST contain only number, return sum of all element in that Array
    let sum = 0;
    for (let i = 0; i < arr.length; i++)
        sum += arr[i]
    return sum
}

/** function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp
    }
    return array
}   **/

function pickRandom(arr, num=6) { // pick num random elements from original Array arr
    let index_arr = new Array(num);
    let result = new Array(num);
    let i = 0;
    while (i < num) {
        const rand = Math.floor(Math.random()*arr.length);
        if (!index_arr.includes(rand)) {
            result[i] = arr[rand];
            index_arr[i] = rand;
            i++
        }
    }
    return result
}

function checkDuplicate(arr1, arr2) { // 2 input Arrays should have same length, return number of duplicate items in 2 arrays
    let count = 0;
    for (let i = 0; i < arr1.length; i++)
        if (arr2.includes(arr1[i]))
            count++
    return count
}

function showProgress(holder, done=false) {
    const div = document.getElementsByTagName("div")[2];
    div.replaceChildren();

    div.style = "border: 1px solid Silver";

    let p = document.createElement("p");
    p.style = "font-size: 20px";
    p.innerText = (done) ? "FINAL RESULT :" : "LATEST RESULT :";

    div.appendChild(p);

    const m = sum(holder);
    for (let i = 0; i < 7; i++) {
        const str = String(i);
        const h = holder[i];
        let label = document.createElement("label");
        label.for = "prog" + str;
        label.innerText = str + " duplicate number : ";

        let progress = document.createElement("progress");
        progress.style = "width: 50%; height: 20px; background-color: Chartreuse";
        progress.id = "prog" + str;
        progress.value = h;
        progress.max = m;

        let p = document.createElement("p");
        p.innerText = " ( " + String(h) + " times - " + String(100*h / m) + "% )";

        const br = document.createElement("br");

        div.appendChild(label);
        div.appendChild(progress);
        div.appendChild(p);
        div.appendChild(br)
    }
}

/** function checkDuplicateNums(arr1, arr2) {
    let arr = new Array();
    for (let val of arr1)
        if (arr2.includes(val))
            arr.push(val)
    return arr
}   **/

/** function createTxt(arr) {
    let str = "";
    for (let i = 0; i < arr.length; i++)
        str += String(arr[i]) + ", "
    return str.slice(0, str.length - 2)
}   **/

function showBestArr(int, comp_arr) {
    const div = document.getElementsByTagName("div")[1];

    let p1 = document.createElement("p");
    p1.style = "font-size: 30px; text-align: center";
    p1.innerText = "Best result gained this trial : " + int + " duplicate numbers";

    let special = document.createElement("h1");
    special.style = "font-size: 75px; color: Red; text-align: center";
    special.innerText = "CONGRATULATIONS ! YOU FOUND A PERFECT LIST OF NUMBER";

    let p2 = document.createElement("p");
    p2.style = "font-size: 30px; text-align: center";
    p2.innerText = "These pairs are : [" + String(comp_arr[0]) + "] & [" + String(comp_arr[1]) + "]";

    div.appendChild((int < 6) ? p1 : special);
    div.appendChild(p2)
}

function start(int, opt=10000000) {
    if (opt < 0)
        opt = 0

    let holder = [0, 0, 0, 0, 0, 0, 0];
    let maxDup = 0;
    let maxArrDuel = [];
    const arr1 = pickRandom(arr);
    for (let i = 0; i < int; i++) {
        const arr2 = pickRandom(arr);
        const dup = checkDuplicate(arr1, arr2);
        if (dup > maxDup) {
            maxDup = dup;
            maxArrDuel = [arr1, arr2]
        }
        holder[dup]++
        // if (i % opt == 0)
            // showProgress(holder)
    }
    showBestArr(maxDup, maxArrDuel);
    showProgress(holder, true)
}