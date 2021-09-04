const birthdayInput=document.querySelector("#birthday")
const btnCheck=document.querySelector('#btn-check')
const btnShowNextDate=document.querySelector('#btn-showNextDate')
const output1=document.querySelector("#output1")
const msg=document.querySelector("#msg")
const output2=document.querySelector("#output2")
const outputDate=document.querySelector("#output-date")
const outputCount=document.querySelector('#count')
const section1=document.querySelector("#section1")
const errorText=document.querySelector("#error")

function checkIfPlaindrome(str)
{
    return str.split('').reverse().join('')===str
}
function convertDatetoString(date)
{
    let dateStr=date.day+""+date.month+""+date.year;
    //console.log(dateStr)
    return dateStr
}

function getAllDateFormat(date)
{
    let ddmmyyyy=date.day+""+date.month+""+date.year;
    let mmddyyyy=date.month+''+date.day+''+date.year;
    let yyyymmdd=date.year+''+date.month+''+date.day;
    let ddmmyy=date.day+''+date.month+''+date.year.slice(-2);
    let mmddyy=date.month+''+date.day+''+date.year.slice(-2)
    let yyddmm=date.year.slice(-2)+''+date.day+''+date.month

    let dateArr=[ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yyddmm]
    //console.log(dateArr)
    return dateArr;
}

function lookforPlaindrome(dateArr)
{
    let isPlaindrome=false;
    for(let i=0;i<dateArr.length;i++)
    {
        if(checkIfPlaindrome(dateArr[i]))
        {
            //console.log(dateArr[i])
            isPlaindrome=true;
            break;
        }
    }
    return isPlaindrome;
}

function isYearLeap(year)
{
    let isLeap=false;
    if(year%400===0)
    {
        isLeap=true;
    }
    if(year%100===0)
    {
        isLeap=false;
    }
    if(year%4===0)
    {
        isLeap=true;
    }

    return isLeap;
}
function datetoObject(day,month,year)
{
    if(day<10)
    {
        day=0+''+day
    }
    if(month<10)
    {
        month=0+''+month
    }

    return date={
        day:day.toString(),
        month:month.toString(),
        year:year.toString()
    }
}

function getPreviousDate(date)
{
    let day=parseInt(date.day)-1;
    let month=parseInt(date.month)
    let year=parseInt(date.year)

    let daysinMonth=[31,28,31,30,31,30,31,31,30,31,30,31] 

    if(day===0)
    {
        month--;

        if(month===0)
        {
            year--;
            month=12;
            day=31;
        }
        else if(month===2)
            {
                if(isYearLeap(year))
                {
                    day=29;
                }
                else
                {
                    day=28;
                }
            }
            else
            {
                day=daysinMonth[month-1]
            }
        
    }
    let previousDate=datetoObject(day,month,year)
    return previousDate;
}
function getNextDate(date)
{
    let day=parseInt(date.day)+1;
    let month=parseInt(date.month)
    let year=parseInt(date.year)

    let daysinMonth=[31,28,31,30,31,30,31,31,30,31,30,31]

    if(month===2)
    {
        if(isYearLeap(year))
        {
            if(day>29)
            {
                day=1;
                month=3;
            }
        }
        else
        {
            if(day>28)
            {
                day=1;
                month=3;
            }
        }
    }
    else
    {
        if(day>daysinMonth[month-1])
        {
            day=1;
            month+=1
        }
    }

    if(month>12)
    {
        month=1;
        year+=1
    }

    let nextDate=datetoObject(day,month,year)

    return nextDate;
}

function findNextPlaindromeDate(date)
{
    let countNext=1;
    let nextDate=getNextDate(date)

    while(1)
    {
        if(plaindrome(nextDate))
        {
            console.log(nextDate+'  '+countNext)
            break;
        }
        else{
            nextDate=getNextDate(nextDate)
            countNext++
        }
    }
    return [nextDate,countNext];
}

function findPreviousPalindromeDate(date)
{
    let countPrevious=1;
    let previousDate=getPreviousDate(date);

    while(1)
    {
        if(plaindrome(previousDate))
        {
            console.log(previousDate+'  '+countPrevious)
            break;
        }
        else
        {
            previousDate=getPreviousDate(previousDate)
            countPrevious++
        }
    }

    return [previousDate,countPrevious];
}

function plaindrome(date)
{
    let dateArr=getAllDateFormat(date)
    return lookforPlaindrome(dateArr)
}

btnCheck.addEventListener('click',()=>
{
    //console.log("input  :"+birthdayInput.value)

    if(birthdayInput.value==='')
    {
        errorText.style.display="block"
        section1.style.display='none'
        output1.style.display='none'
        output2.style.display='none'
        return;
    }
    else{
        errorText.style.display="none"
    }

    let birthday=birthdayInput.value.split("-")
    let date={
        day:birthday[2],
        month:birthday[1],
        year:birthday[0]
    }
   // console.log(date)
    let dateisPlaindrome=plaindrome(date)
    //console.log(dateisPlaindrome)
    output1.style.display='block'
    if(dateisPlaindrome===false)
    {
        section1.style.display='block'
        output1.textContent="NOT A PALINDROME DATE 😢"
        btnShowNextDate.style.display='block'
        msg.style.display='block'
        let [previousDate,countPrevious]=findPreviousPalindromeDate(date)
        let [nextDate,countNext]=findNextPlaindromeDate(date)

        console.log(nextDate)
        if(countNext<countPrevious)
        {
            outputDate.textContent=`${nextDate.day}-${nextDate.month}-${nextDate.year}`
            outputCount.textContent=`${countNext}`
        }
        else
        {
            outputDate.textContent=`${previousDate.day}-${previousDate.month}-${previousDate.year}`
            outputCount.textContent=`${countPrevious}`
        }
    
    }
    else
    {
        output1.textContent="PALINDROME DATE 🎉🎊"
        section1.style.display='none'
        output2.style.display='none'
    }
})

btnShowNextDate.addEventListener('click',()=>
{
    console.log('show clicked')
    output2.style.display='block'
})