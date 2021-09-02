const birthdayInput=document.querySelector("#birthday")
const btnCheck=document.querySelector('#btn-check')
const btnShowNextDate=document.querySelector('#btn-showNextDate')
const output1=document.querySelector("#output1")
const msg=document.querySelector("#msg")
const output2=document.querySelector("#output2")
const outputDate=document.querySelector("#output-date")
const outputCount=document.querySelector('#count')

function checkIfPlaindrome(str)
{
    return str.split('').reverse().join('')===str
}
function convertDatetoString(date)
{
    let dateStr=date.day+""+date.month+""+date.year;
    console.log(dateStr)
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
            console.log(dateArr[i])
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
            else
            {
                if(day>28)
                {
                    day=1;
                    month=3;
                }
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
    let count=1;
    let nextDate=getNextDate(date)

    while(1)
    {
        if(plaindrome(nextDate))
        {
            //console.log(`next palindrome date is ${convertDatetoString(nextDate)} missed by ${count} days`)
            outputDate.textContent=`${nextDate.day}-${nextDate.month}-${nextDate.year}`
            outputCount.textContent=`${count}`
            break;
        }
        else{
            nextDate=getNextDate(nextDate)
            count++
        }
    }
    return nextDate
}


function plaindrome(date)
{
    let dateArr=getAllDateFormat(date)
    return lookforPlaindrome(dateArr)
}

btnCheck.addEventListener('click',()=>
{
    //console.log(birthdayInput.value)
    let birthday=birthdayInput.value.split("-")
    let date={
        day:birthday[2],
        month:birthday[1],
        year:birthday[0]
    }
    console.log(date)
    let dateisPlaindrome=plaindrome(date)
    console.log(dateisPlaindrome)
    output1.style.display='block'
    if(dateisPlaindrome===false)
    {
        
        output1.textContent="NOT A PALINDROME DATE 😢"
        btnShowNextDate.style.display='block'
        msg.style.display='block'
        //console.log(getNextDate(date))
        let nextPlaindromeDate=findNextPlaindromeDate(date)
        console.log(nextPlaindromeDate)
    }
    else
    {
        output1.textContent="PALINDROME DATE 🎉🎊"
    }
})

btnShowNextDate.addEventListener('click',()=>
{
    console.log('show clicked')
    output2.style.display='block'
})