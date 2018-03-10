module.exports.execu=function(data,addSkill,addSkillextra,addCareer,addLang,addProject,addExp,addEdu,addHobbie,myKeys,misdata){
    // var misdata=data
    var DateDiff = require('date-diff');
    var words=require("./words.js")
    const tableData = require('./tables').table
    const DomParser = require('dom-parser');
    const parser = new DomParser();
    const stream=require('stream')
    const readline=require('readline')

    //   console.error(misdata)
    //console.log("my hobbie execu returned array is :",hobbieExecu);
    let misExecu =mis(misdata)
    if(misExecu!= undefined){
       words.obj.miscellaneous=misExecu
    }
    let hobbieExecu=activities(addHobbie)
    if(hobbieExecu!=undefined){
        words.obj.hobbies=hobbieExecu;
    }
    let skillExecu=activities(addSkill)
    //console.log("my skill execu returned array is :",skillExecu);
    if(skillExecu!=undefined){
      words.obj.technicalSkills=skillExecu;
    }
    let extraskillExecu=activities(addSkillextra)
    //console.log("my extra skill execu returned array is :",extraskillExecu);
    if(extraskillExecu!=undefined){
      words.obj.skills=extraskillExecu;
    }

    let careerExecu=activities(addCareer)
    //console.log("my career execu returned array is :",careerExecu);
    if(careerExecu!=undefined){
        words.obj.careerObjective=careerExecu.toString();
  }

  let langExecu=activities(addLang)
  //console.log("my lang execu returned array is :",langExecu);
  if(langExecu!=undefined){
      words.obj.languages=langExecu
  }

  let projectExecu=experience(addProject)
  //console.log("my project execu returned array is :",projectExecu);
  if(projectExecu!=undefined){
      words.obj.project=projectExecu
  }

  let expExecu=experience(addExp)
  //console.log("my experience execu returned array is :",expExecu);
  if(expExecu!=undefined){
      words.obj.professionalExperience=expExecu
  }

  let eduExecu=education(addEdu)
  //console.log("my education execu returned array is :",eduExecu);
  if(eduExecu!=undefined){
      words.obj.academicQualifications=eduExecu.filter(ele=>ele!=null)
  }

    function activities(myArr)
    {
//   console.error("mykeysAAAAA",myArr)
      if(myArr==null || myArr == undefined || myArr.length==0){
        //console.log("Not present");
        return;
      }
      else{
        str=myArr.join('\n');
        for(let i=0;i<myKeys.length;i++){
            let reg=new RegExp(`${myKeys[i]}`,'gmi')
            // console.error("AAAAA",str,"SSSSs",myKeys[i])
            str=str.replace(reg,'')
        }
        let returnArr=mis(str)
        return returnArr;
      }
    }



  function education(edu){
    edu=edu.splice(1,edu.length-2);
    edu=[edu.toString().replace(/<strong>\s*\W\s*<\/strong>/gm,'')]
    let arr = {}
    edu.forEach( (ele,i) => {
        ele = ele.replace( /<\/body>|\s*(Page \d{2}\s*)/gim,'' )
        ele=ele.replace(/<h\d>/gm,'<strong>').replace(/<\/h\d>/gm,'</strong>')
        //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!! ele is",ele);
        if (( parser.parseFromString(ele).getElementsByTagName('table') || parser.parseFromString(ele).getElementsByTagName('table') )&& ele.includes('<table>','</table>','<td>','</td>') ){
            arr[i] = tableData(data)
        }else if( parser.parseFromString(ele).getElementsByTagName('ul').length >= 1 ){
            //console.log(" 🤷‍♀asnkcnsalkn" )
            arr[i] = listData(ele)
        }else if( parser.parseFromString(ele).getElementsByTagName('strong').length >= 1 ){
            //console.log( edu )
            strongList = dommer( ele, 'strong' )
            let strongArr = []
            strongList.forEach( (value, index, ar) => {
                strongArr.push(value.innerHTML.trim())
            } )
            let finalStrong = []
            let flag = false;
            //console.log( " 😋", strongArr )
            edu=edu.toString().replace(/<h\d>/gm,'<strong>').replace(/<\/h\d>/gm,'</strong>')
            edu=edu.toString().split('<strong>');
            console.error(edu);
            // readNow(edu,strongArr)
  //           function readNow(baseText, lastArray){
  //   const buf = new Buffer(baseText);
  //   // //console.log(lastArray)
  //   const bufferStream = new stream.PassThrough();
  //   bufferStream.end(buf);
  //
  //   const rl = readline.createInterface({
  //       input: bufferStream,
  //   });
  //   var flag=false;
  //   var newStr;
  //   var newArr = [];
  //   let count = 0;
  //   let base = null
  //   rl.on('line', function (line) {
  //     console.error(line);
  //     if(line.includes(lastArray[0])){
  //       flag=true;
  //     }
  //     if(flag==true){newStr+=line;
  //       if(lastArray[count] === undefined){
  //       }else if(line.includes(lastArray[count])){
  //           newArr.push(newStr)
  //           newStr=null;
  //       }}
  //       // //console.log( " ❌",base)
  //
  //
  //   });
  //   rl.on('close', (data) => {
  //        // //console.log(lastObj)
  //        console.error(" fffffffffffffffffffffff::  ",newArr);
  //       return newArr;
  //   })
  //
  // }
            // strongArr.forEach( (el,i) => {
            //     // //console.log( ' 🇿🇼 ', el, new RegExp(`\\n*\\s*(${ el })(.*)\\n*\\s*(${ strongArr[i+1] })`,'gm'));
            //
            //     if( strongArr[i+1] === null || strongArr[i+1] === undefined ) return ;
            //     if (ele.match(new RegExp(`\\n*\\s*(${ el })(.*)\\n*\\s*(${ strongArr[i+1] })`,'gm')) != null){
            //         flag = true;
            //         finalStrong.push( ele.match(new RegExp(`\\n*\\s*(${ el })(.*)\\n*\\s*(${ strongArr[i+1] })`,'gm')).join().replace( strongArr[i+1], '').replace(/<\w+>|<\/\w+>/g,'').replace(/(,,+)/g,','))
            //     }
            // } )
            // if (ele.match(new RegExp(`(${ strongArr[(strongArr.length) - 1] })\\n*\\s*(.*)`,'gm')) != null){
            //     finalStrong.push( ele.match(new RegExp(`(${ strongArr[(strongArr.length) - 1] })\\n*\\s*(.*)`,'gm')).join().replace(/<\w+>|<\/\w+>/g,'').replace(/(,,+)/g,','))
            // }
            // ele = ele.toString().replace(/<\w+>|<\/\w+>/gm,'').trim()
            let listArr = []
            checkData = strongArr
            // console.error(checkData);
            edu.forEach( el => {
                var listObj={
                    degree:'',

                    year:'',
                    university:'',
                    marks:''
                }
                listArr.push(breakStrong(el,listObj))
            })
            // console.error(listArr);
            arr[i] = listArr //end of strong
        }else{
            let listArr = []
            var listObj={
                degree:'',
                year:'',
                university:'',
                marks:''
            }
            ele = ele.toString().replace(/<\w+>|<\/\w+>/gm,'').replace(/(,,+)/g,',').trim()
            // console.error("!!!!!!!!!!!!!!!!!!!!!!!!!ele is",ele)
            listArr.push(breakStrong(ele, listObj))
            arr[i] = listArr
        }
    })

    function dommer( d, st ){
        let dom = parser.parseFromString(d);
        let ul = dom.getElementsByTagName(st);
        let list = []
        return Array.prototype.slice.call(ul);

    }

    function breakStrong(ele,obj){
    //   console.error(ele);
        // let dateReg = /((\s*(19[5-9]\d|20[0-4]\d|2050))|(Jan|Apr|May|June|July|Aug|Sep|Oct|Nov|Dec)\s\d{2})/gi
        let dateReg = /(\s*([^\w]|^)(19[5-9]\d|20[0-4]\d|2050))/gi
        let degreeReg = /\s*(Bachelor(|s) of Science|MBA|Masters of Business Administration|Bachelor of Commerce|B\.S|HSC|SSC|PGDM|PGDCA|M.Tech|B.Tech|B\.Tech|Biotechnology|Diploma|\bBA\b|Doctorate |Bachelors of (|commerce)|B(|\W)Tech(|\W)|M(|\W)Tech(|\W)|XII|\bX\b|12th|10th|([A-Za-z]+\s*[A-Za-z]+)\s*(M|m)anagement)\s*/gmi
        let universityReg = /(university|Institute|P.S.E.B|college|Vidhalaya|school)/gim
        let marksReg = /((\s*(\d{2}|\d{2}[\.](\d{1,2}))[\%])|(\s*\d{1}\.\d{1,2}\b)|\b(\d{1}|\d{2})\s*(cgpa|grades)\b|((cgpa(\s*:|\s*)|grades(\s*:|\s*)|percentage(\s*:|\s*))\s*((\d{1}.\d{1,2})|(\d{2}[\.](\d{1,2})|\d{2}))))/g
        //console.log( " ❌" , ele)
        ele = ele.replace(/\s\s+/gm,' ').split(',').filter( el => el.length > 1 ).map( el => el.replace(/\.$|<\w+>|<\/\w+>/g,'').replace(/\t/g,' '))
        console.error( " ❌" , ele)
        // obj.year = ele.map( el => dateReg.test(el) ? el.match(dateReg) : undefined).filter( el => el != undefined ).map( el => el.toString().trim())
        // let f = ele.map( el => dateReg.test(el) ? //console.log( " 👳‍♀", el.match(dateReg), ' ::' ,el) : undefined)
        // //console.log( " 🤼‍♀", f)
        obj.year = ele.map( el => dateReg.test(el) ? el.match(dateReg) : undefined).filter( el => el != undefined ).map( el => el.toString().trim())

          // ele.filter( el => replace())
        obj.university = ele.filter( el => el.match(universityReg) != null ? true : false).map(ele=> ele.replace(dateReg,''))
        let arrayDegree = ele.map( el => degreeReg.test( el ) ? el.match( degreeReg ) : undefined).filter(el => el != undefined).map( el => el.toString().trim() )
        if(arrayDegree!=null && arrayDegree!=undefined)
        {
          if(arrayDegree.length>1){
            let stringDegree='';
            for(let i=0;i<arrayDegree.length;i++){
              stringDegree=stringDegree+','+arrayDegree[i]
            }
            obj.degree=stringDegree;
          }
          else{
            obj.degree=arrayDegree;
          }
        }
        obj.marks = ele.map( el => marksReg.test(el) ? el.match(marksReg) : undefined).filter( el => el != undefined ).map( el => el.toString().trim())
        //console.log( " 🔧", obj)
        if(obj.year.length==0  &&obj.university.length==0  &&obj.marks.length==0 && obj.degree.length==0 ){
          return;
        }

        return obj
    }
    function listData(data){
        var inputList2 = dommer( data, 'ul' )
        let list = []
        //console.log(inputList2[0].innerHTML)
        if ( inputList2.length === 1){
            dom = parser.parseFromString( inputList2[0].innerHTML )
            ul = dom.getElementsByTagName('li')
            let liList = Array.prototype.slice.call(ul)
            liList.forEach(ShowResults3);
        }else{
            inputList2.forEach(ShowResults3);

        }
        function ShowResults3(value, index, ar) {
            let listObj = {
                degree:'',
                year:'',
                university:'',
                marks:''
            }
            //console.log( ' 💯', value.innerHTML)
            list.push(breakStrong(value.innerHTML, listObj))
        }
        return list
    }
    // //console.log( ' 💯', arr[0] )
    return arr[0]
}

function experience(exp){
  console.log("In experience function",exp)
  if(exp !=null && exp != undefined)
  {

    var str=exp.join('\n')
    for(let i=0;i<myKeys.length;i++){
        let reg=new RegExp(`${myKeys[i]}`,'gmi')
        str=str.replace(reg,'')
        if(i === myKeys.length){

            return str
        }
    }
    // misdata=mis(misdata,str)
    // console.error('LLLLLLL',misdata)
    // var str=exp.splice(1,exp.length-2).join('\n')
    str=str.replace(/<table>|<\/table>|<td>|<\/td>|<tr>|<\/tr>|<th>|<\/th>|<thead>|<\/thead>|<tbody>|<\/tbody>|<(strong|h[1-6]|p)>\n*\s*(\.)?<\/(strong|h[1-6]|p)>/gmi,"")
    str=str.replace(/(<\/strong>|<\/h[1-6])\n*\s*(.*)?\n*\s*<\/p>\n*\s*<p>\n*\s*(<strong>|<h[1-6]>)/gmi,"")
    var misexp = str
    // for(i=0;i<myKeys.length;i++){
    //     var reg=new RegExp(myKeys[i],'gmi')
    //     str=str.replace(/${reg}/gm,'')
    //     if(i === myKeys.length){
    //         return str
    //     }
    // }
    console.error("In experience function AAAAAAAAA",str)
var keys3 = /(^(\s*<h[1|2|3]>|\s*<strong>)\n*(.*)([^(Roles (&amp;|and|)|key|)Responsibilities|^Key Responsibilities Handling|^(Primary|Secondary|Job) Responsibilities(\-|:)?|^Key Accomplishments(:)?|^Company’s Profile|^Page 1 of 3]).*(\n*\s*(<\/h[1|2|3]>|<\/strong>))\n*(((<[a-z]>)\n*\s*((([A-Za-z]+\s*\d{4}\s*[\-|\W ]?\s*[A-Za-z]+\s*(\d{4})?)+\s*)|(\d{2}\s*[\/]\s*\d{4}\s*[\-]?\s*)+)(\\(.*\\))?)\n*\s*(<\/[a-z]+>))?|(^\s*(<[a-z]+><\/[a-z]+>)(\s*<h[1|2|3]>|\s*<strong>)\n*.*(\n*\s*(<\/h[1|2|3]>|<\/strong>)))|(^\s*(<em><\/em>)(\s*<h[1|2|3]>|\s*<strong>)\n*.*(\n*\s*(<\/h[1|2|3]>|<\/strong>)))|(^(\s*<p>)\n*\s*[A-Za-z]+\s([A-Za-z\s*\-\–]+?\d{4}[A-Za-z\s*\-\–]+?)+)(\n*\s*<\/p>))/gm

var matches4 = str.match(keys3)
// console.log(matches4)
  if(matches4 == null){
    var obj={
        title:null,
          startDate:null,
          endDate:null,
          description:null,
          role:null,
          miscellaneous:null
    }


    var keys1 = /(^(\s*<li>)\n*.*(\n*\s*<\/li>)|^(\s*<p>)\n*.*(\n*\s*<\/p>))/gm
    var c=str.match(keys1)
    if(c!=null&& c!=undefined){
    var exparr1;
           var exparr=c.map((ele)=>ele.replace(/<[a-z]+>|\|\•|<\/[a-z]+>|<[a-z]+\/>|\t|\:|\n|\s\s+/gmi,'').trim())

           exparr = exparr.filter(function(x){
            return (x !== (undefined || null || ''));
          });

           obj.role=exparr
           exparr1=Object.assign({},obj);

    }
          return exparr1
         }else{

var b=[];
var a=[];
if(matches4.length > 1){

    var regarr = matches4.map(element => element.trim().replace(/\s+|\n+|\t/gm, '\\n*\\s*').replace(/\(/gm,'\\(').replace(/\)/gm,'\\)'))
   for(let i=0;i<regarr.length - 1;i++){
        var j=i;
        var matches6 = regarr[j].trim('\n')
        var matches5 = regarr[++j]

        let regex = `(${ matches6 })\\n?(.*\\n)+\n?(\\s*${ matches5 })`
        keys1 = new RegExp(regex,'gm')



        if(str.match(keys1))
      {
        var h_i=str.match(keys1);
        h_j=h_i.join('\n').split('\n');
        // //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",h_j);
        if(h_j.length>5)
        {
            b.push(h_i);
            // //console.log("h_i",h_i);
        }

      }
    }
    // //console.log(matches5);
    b.push(str.match(new RegExp(`${ matches5 }\\n?(.*\\n)+`,'gm')))
}else{
    var regarr = matches4.map(element => element.trim().replace(/\s+|\n+|\t/g, '\\n*\\s*'))
    //console.log(regarr)
    b.push(str.match(new RegExp(`${ regarr }\\n?(.*\\n)+`,'gm')))
}

var b = b.filter((x)=>{
  if(x!=null)return x;
});

// console.log("hello b WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",b)
if(b!=null && b!= undefined){
let c = b.map(element=> element.join('\n').split('\n'))
var final_experience=[];
var obj={
        title:null,
          startDate:null,
          endDate:null,
          duration:null,
          description:null,
          role:null,
          miscellaneous:null
    }
for(let j=0;j<b.length;j++){
    obj.title=null;
    obj.startDate=null;
    obj.endDate=null;
    obj.duration=null;
    obj.description=null;
    obj.role=null;
    obj.miscellaneous=null;
let experience=b[j].toString().split('\n')
experience.pop()
experience.pop()
experience=experience.join('\n')
//console.log("EEEEEEEEEEEEEEEEEEEE",experience)
//    experience=experience.splice(0,experience.length-2)
   let exptitle=experience.split('\n').splice(0,3)
   if(exptitle != null && exptitle != undefined){
   exptitle=exptitle.toString().replace(/<[a-z\d]+>|<\/[a-z\d]+>|<[a-z\d]+\/>|&amp;|\t|\:|\,|(([A-Za-z]+\s*\d{4}[ \-|\–]?)|\d{2}\/\d{4})|Present|\–|\n|(\(.*\))|(([A-Za-z]+\s*\d{4}\s*[\-|\s*|]\s*)+\s*|\s\s+)|Page 1 of 3/gmi,'').trim()
   obj.title=exptitle
   }
   //    experience=experience.splice(0,experience.length-2)
// //console.log("!!!!!",duration);
let expdur=experience.split('\n').splice(0,5)
let duration = expdur.toString().match(/((([A-Za-z]+(\.|)\s*\d{4}\s*(\-|\–|\s*|\b.*\b)\s*([A-Za-z]+(\.|)\s*\d{4}|present|current))|(\d{2}\s*[\/]\s*\d{4}\s*[\-|\–]?\s*([a-z]*\s*))+)(\(.*\)|)|([A-Za-z]+(\.|)\s*\d{4}))/gmi)
if(duration != null && duration != undefined){
   if((/.*(\-|\–|\b(to)\b)/img).test(duration.toString())){
   regexDuStart=duration.toString().match(/.*(\-|\–|\b(to)\b)/img)

   regexDuend=duration.toString().match(/(\-|\–|\b(to)\b).*/img)
   if(regexDuStart!=undefined&&regexDuStart!=null&&regexDuend!=undefined&&regexDuend!=null){
     let totaldur=totalDuration(regexDuStart,regexDuend)
     if(totaldur!=null && totaldur!=undefined){
         console.error(totaldur)
        obj.duration=totaldur
     }

   }

   obj.startDate=regexDuStart.toString().replace(/(\-|\–|\b(to)\b)/gmi,'');
    obj.endDate=regexDuend.toString().replace(/(\-|\–|\b(to)\b)/gmi,'');
  }else{
      obj.endDate=duration;
  }
}
   let keys1 = /(^(\s*<li>)\n*.*(\n*\s*<\/li>))/gm
   let keys2=/^(\s*<p>)\n*.*(\n*\s*<\/p>)?/gm
//    //console.log("eeeeeeeeeeeeeeeeeeeeeeeeee",experience)
   if(keys1.test(experience)){
    let role=experience.match(keys1)
    if(role!=null && role!= undefined){
        //console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",role)
        regex=new RegExp(exptitle,'i');
        regex1=new RegExp(duration,'i');

    role=role.map(ele => {
        ele=ele.toString().replace(/<[a-z]+>|<\/[a-z]+>|<[a-z]+\/>|&amp;|\t|\–|\-|\:|\|((([A-Za-z]+\s*\d{4}\s*[\-| ]\s*[a-z]*\s*)+\s*)|(\d{2}\s*[\/]\s*\d{4}\s*[\-]?[a-z]*\s*)+)(\(.*\))?|\n|<(.*)>|\●|\•|►|\s\s+/gmi,'').trim(',')
     return ele
   });
   role=role.map((element)=>{
          return element.trim()
      })
    }
     role = role.filter(function(x){
        return (x !== (undefined || null ||' '|| ''));
      });
   obj.role=role
   }

   if(keys2.test(experience)){
    let description=experience.match(keys2)
    if(description!=null && description!= undefined){
        //console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ",description)
        regex=new RegExp(exptitle,'gi');
        regex1=new RegExp(duration,'gi');
      description=description.map((ele)=>ele.replace(/((([A-Za-z]+(\.|)\s*\d{4}\s*(\-|\s*|\b.*\b)\s*([A-Za-z]+(\.|)\s*\d{4}|present))|(\d{2}\s*[\/]\s*\d{4}\s*[\-]?[a-z]*\s*)+)(\(.*\)|)|([A-Za-z]+(\.|)\s*\d{4}))|<[a-z]+>|<\/[a-z]+>|<[a-z]+\/>|&amp;|\t|\–|\-|\:|((([A-Za-z]+\s*\d{4}\s*[\-| ]\s*[a-z]*\s*)+\s*)|(\d{2}\s*[\/]\s*\d{4}\s*[\-]?[a-z]*\s*)+)(\(.*\))?|\n|\(|\)|\\(.*\\)|job responsibilitie(s|)|key accomplishment|Responsibilitie(s|)|<(.*)>|\s\s+|\●|\•|►|\s*\n*\/gmi,'').trim().trim(','))

    }
     description = description.filter(function(x){
        return (x !== (undefined || null || ''));
      });
   obj.description=description
   }

   var misstr=b[j].toString()

   for(let i=0;i<matches4.length;i++){
    var regarr = matches4[i].replace(/\s+|\n+|\t/gm, '\\n*\\s*').replace(/\(/gm,'\\(').replace(/\)/gm,'\\)')
    let reg=new RegExp(`${regarr}`,'gmi')

    var misstr=misstr.replace(reg,'')

    misexp=misexp.replace(reg,'')

    }
    // console.error(misstr)
    let regdata =misstr.trim().replace(/\s+|\n+|\t/g, '\\n*\\s*').replace(/\(/gm,'\\(').replace(/\)/gm,'\\)').replace(/\//gmi,'\\/').replace(/\+/gmi,'\\+').replace(/\$/gmi,'\\$')
       let reg=new RegExp(`${ regdata }`,'gmi')
    //    console.error("::::????????>>>>>>",reg)
       misexp=misexp.replace(reg,"")
    // console.error("::::????????>>>>>>",misexp)
    // console.error(j,b.length)

    if(misexp!=null && misexp!=undefined ){
        let keys1 = /(^(\s*<li>)\n*.*(\n*\s*<\/li>)|^(\s*<p>)\n*.*(\n*\s*<\/p>))/gm
         let c=misexp.match(keys1)
         if(c!=null&& c!=undefined){

         let exparr=c.map((ele)=>ele.replace(/<[a-z]+>|\|\•|<\/[a-z]+>|<[a-z]+\/>|\t|\:|\n|\s\s+/gmi,'').trim())

                exparr = exparr.filter(function(x){
                 return (x !== (undefined || null || ''));
               });
               if(j == b.length-1){
                // console.error("::::????????>>>>>>",misexp)
                obj.miscellaneous=exparr
            }

     }


 }

    final_experience[j]=Object.assign({},obj);
}
return final_experience;
}
}

}

}
// function mis(fulldata,data1){


// }
function mis(data2){
    let keys1 = /(^(\s*<li>)\n*.*(\n*\s*<\/li>)|^(\s*<p>)\n*.*(\n*\s*<\/p>))/gm
    let c=data2.match(keys1)
    if(c!=null&& c!=undefined){
    let exparr=c.map((ele)=>ele.replace(/<[a-z]+>|\|\|\•|\●|<\/[a-z]+>|<[a-z]+\/>|Languages|Tools|\t|\:|\n|\●|\•|►|\s\s+/gmi,'').trim())
    if(exparr!=null && exparr!=undefined){
        exparr = exparr.filter(function(x){
            return (x !== (undefined || null || ''));
          });
        return exparr
    }
}
}
function totalDuration(start,end){
    console.error("start",start,"end",end)
    let startMonth=start.toString().match(/jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december|\b\d{2}\b/gmi)
    let endMonth=end.toString().match(/jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december|present|current|\b\d{2}\b/gmi)
    let startYear=start.toString().match(/\d{4}/gmi)
    let endYear=end.toString().match(/\d{4}/gmi)
    // console.error(startMonth,endMonth,startYear,endYear)
    if(startYear!=null&&endYear!=null&&startYear!=undefined&&endYear!=undefined){
        startYear=startYear.toString()
        endYear=endYear.toString()
        let arr=[]
        arr.push(startMonth[0],endMonth[0])
        return monthdate(arr)
    }else{
        startYear=startYear.toString()
        var today = new Date();
        var dd = today.getDate();
         endMonth = today.getMonth()+1; //January is 0!
         endYear = today.getFullYear();
        //  console.error("endmonth",endMonth)
        let arr=[]
        arr.push(startMonth[0],endMonth)
        // console.error()
       return monthdate(arr)
    }
    // console.error(year)
    function monthdate(arr){
    var regex=/jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december/i
// console.error(arr)

for(let i=0;i<arr.length;i++)
  {

    if(regex.test(arr[i])){
      if(isNaN(arr[i])){
        str=arr[i].toLowerCase()
        console.error(str)
      }

      switch(true)
      {


          case (str=="january"||str=="jan"):
          arr[i]=1;
          console.log(arr[i])
          break;
          case (str=="february"||str=="feb"):
          arr[i]=2;
          console.log(arr[i])
          break;
          case (str=="march"||str=="mar"):
          arr[i]=3;
          console.log(arr[i])
          break;
          case (str=="april"||str=="apr"):
          arr[i]=4;
          console.log(arr[i])
          break;
          case (str=="may"):
          arr[i]=5;
          console.log(arr[i])
          break;
          case (str=="june"||str=="jun"):
          arr[i]=6;
          console.log(arr[i])
          break;
          case (str=="july"||str=="jul"):
          arr[i]=7;
          console.log(arr[i])
          break;
          case (str=="august"||str=="aug"):
          arr[i]=8;
          console.log(arr[i])
          break;
          case (str=="september"||str=="sept"||str=="sep"):
          arr[i]=9;
          console.log(arr[i])
          break;
          case (str=="october"||str=="oct"):
          arr[i]=10;
          console.log(arr[i])
          break;
          case (str=="november"||str=="nov"):
          arr[i]=11;
          console.log(arr[i])
          break;
          case (str=="december"||str=="dec"):
          arr[i]=12;
          console.log(arr[i])
          break;
          default :
          console.error(arr[i])
          arr[i]=arr[i]
      }

    }
         }
        //  console.error(arr)
        return diffdate(arr)
      }

      function diffdate(arr){

 if(Number.isInteger(parseInt(arr[0],10)) && Number.isInteger(parseInt(arr[1],10)) && startYear!=null&&endYear!=null&&startYear!=undefined&&endYear!=undefined ){
    startMonth=arr[0].toString();
    endMonth=arr[1].toString();
    let date1 = new Date(startYear,startMonth , 1); // 2015-12-1
    let date2 = new Date(endYear,endMonth, 28);
    var diff = new DateDiff(date1, date2);
 console.error(startYear,endYear,startMonth,endMonth)
console.error(diff.months())
    let months=parseInt(diff.months())
    if(months!=null&&months!=undefined){
        months=months.toString().replace(/\-/gmi,'')
        if(months >= 12){
            year=months/12
            years=parseInt(year)*12
            month=months-years
            return month +" months "+ parseInt(year) +" years "
        }else{
            return months+"months 0 years"
        }
    }
    }
  }
}
}
