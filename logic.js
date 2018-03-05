module.exports.logic=function(strongArr,arr,h1Arr,html,data){
  console.log("in logic tables");

  var textRact=require("./textract.js");
  var pincodes=require('./pincode.js');
  var words=require('./words.js');
  var skill1=require('./skills.js');
  var dateChanger=require("./dob.js");
  var new_arr=[];
  var myName;

  for(i=0;i<strongArr.length;i++){
    strongArr[i]=strongArr[i].toString().replace(/<[a-z]+>/gm,"").replace(/<\/[a-z]+/gm,"").replace(/\<.*\>/gm,"");
    strongArr[i]=strongArr[i].trim();
  }

  for(i=0;i<h1Arr.length;i++){
    h1Arr[i]=h1Arr[i].toString().replace(/<[a-z]+>/gm,"").replace(/<\/[a-z]+/gm,"").replace(/\<.*\>/gm,"");
    h1Arr[i]=h1Arr[i].trim();
  }
  console.log(data);
  //console.log("Array would be :",arr);
  console.log("strong array would be :",strongArr);
  console.log("h1 array would be:",h1Arr);

  var  new_arr=arr.join('')
  //console.log(new_arr);
  new_arr=new_arr.replace(/<[a-z0-3]+>/gmi,'').replace(/<\/[a-z0-3]+>/gmi,'\n')
  var update_arr=new_arr.split('\n');
  //console.log(update_arr);
  for(let i=0;i<update_arr.length;i++)
  {
    update_arr[i]=update_arr[i].replace(/<[a-z]+>/gm,'').replace(/<\/[a-z]+>/gm,'').replace(/\<.*\>/gm,"").replace(/\t/gm,'').replace(/\s{2,}/gm,'').replace(/<a id="page\d">/gm,'')
    update_arr[i]=update_arr[i].trim()
  }
  //console.log("My updated array after removing image tag is : ",update_arr)


  var update_arr = update_arr.filter(function(x){
    return (x !== (undefined || null || ''));
  });
  //console.log(arr);
  console.log(update_arr);

  function foo(update_arr)
  {
    myName=update_arr;
    var name=[];
    update_arr=update_arr.trim();
    name=update_arr.split(' ');

    if(name.length==1)
    {
      words.obj.details.name.firstName=name[0];
      console.log(name[0]);
    }
    else
    {
      words.obj.details.name.firstName=name[0];
      words.obj.details.name.lastName=name[name.length - 1];
      console.log(name[0]);
      console.log(name[name.length-1]);
    }
  }

//for finding name
  if(h1Arr != null && h1Arr.length>0)
  {
    if( h1Arr[0].trim()!="CV" && h1Arr[0].trim()!="RESUME")
    {
        console.log("Name is in h1:",update_arr[0]);
        foo(update_arr[0]);

    }
    else {
       console.log("Name is in h1 :",update_arr[1])
       foo(update_arr[1]);
    }
  }

  else if(strongArr != null && strongArr.length>0) {

       if( strongArr[0].toLowerCase().trim()!="cv" && strongArr[0].toLowerCase().trim()!="resume" && strongArr[0].toLowerCase().trim()!="curriculum vitae")
       {
         console.log("Name is in strong :",update_arr[0]);
         foo(update_arr[0]);
       }
       else{
         console.log("Name is in strong :",update_arr[1])
         foo(update_arr[1]);
       }
     }
     else {
       console.log("Name is :",update_arr[0])
       foo(update_arr[0]);
     }

   //end of name
   //console.log("**************",arr[0]);

//Start for Gender
    var gend1=/\bmale/i;
    var gend2=/\bfemale/i;
    if(gend1.test(arr))
    {
      console.log("Gender : male");
      words.obj.details.gender="Male";
    }
    else if(gend2.test(arr)){
      console.log("Gender : female");
      words.obj.details.gender="Female";
    }
    else{
      console.log("NO gender found")
    }//End of Gender

//DOB starts here
if( /((\d{1,2}(,|<sup>th<\/sup>|<em>rd<\/em>|<em>th<\/em>|<em>nd<\/em>|<sup>rd<\/sup>|<sup>nd<\/sup>)(\s)?(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)(\s)?(,)?(\s)?\d{4})|(\d{1,4}[/|-]\d{2}[|/|-]\d{1,4})|\d{1,2}(th|nd|rd|st|\s|,)*(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)(\s|\,)*\d{4})/gmi.test(arr))
    {

      var dob1=[];
      var dob1 = arr.toString().match(/((\d{1,2}(,|<sup>th<\/sup>|<em>rd<\/em>|<em>th<\/em>|<em>nd<\/em>|<sup>rd<\/sup>|<sup>nd<\/sup>)(\s)?(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)(\s)?(,)?(\s)?\d{4})|(\d{1,4}[/|-]\d{2}[|/|-]\d{1,4})|\d{1,2}(th|nd|rd|st|\s|,)*(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)(\s|\,)*\d{4})/gmi);
      if(dob1 != null && dob1!==undefined && dob1.length > 0){
        dob1[0]=dob1[0].replace(/<(\/)?[a-z]+>/gm,'')
        console.log("DOB : ",dob1[0]);
        var re=dateChanger.dateChanger(dob1[0])
        console.log("re is",re);
        words.obj.details.dob=re;
      }
      // else if(dob2 != null && dob2.length > 0)
      // {
      //   console.log("DOB : ",dob2[0]);
      //   words.obj.details.dateOfBirth=dob2[0];
      // }
      }
      else{
        console.log("No DOB found");
      } //End of DOB




//Email Starts here
      if(/[a-z]+\w+([.\w]+)+@[a-z]+([.][a-z]+){1,2}/.test(arr))
      {
        var mailId=arr.toString().match(/[a-z]+\w+([.\w]+)+@[a-z]+([.][a-z]+){1,2}/);
        console.log("email id is :",mailId[0]);
        words.obj.details.email=mailId[0];
        }
        else{
          console.log("No mail found");
        } //End of email

//contact starts here
      if(/((\(|\+|^\s)*\b(([\+])?([\(]?(\d{1}\-\d{3}|[+]|[+]\d{2}|\d{2,3}|\d{1})?[\)]?)[\-|\s|\.]*?([\(]\d{1}[\)])?[(]?\d{3,4}[)]?[\-|\s|\.]*?\d{3}[\-|\s|\.]*?\d{2}[\-|\s|\.]?\d{1,2})\b|(\(|\+|^\s)*\b(([\+])?([\(]?(\d{1}\-\d{3}|[+]|[+]\d{2}|\d{2,3}|\d{1})?[\)]?)[\-|\s|\.]*?[\(]?\d{5}[\)]?[\-|\s|\.]*\d{5})\b)/.test(arr))
        {
        var phone=arr.toString().match(/((\(|\+|^\s)*\b(([\+])?([\(]?(\d{1}\-\d{3}|[+]|[+]\d{2}|\d{2,3}|\d{1})?[\)]?)[\-|\s|\.]*?([\(]\d{1}[\)])?[(]?\d{3,4}[)]?[\-|\s|\.]*?\d{3}[\-|\s|\.]*?\d{2}[\-|\s|\.]?\d{1,2})\b|(\(|\+|^\s)*\b(([\+])?([\(]?(\d{1}\-\d{3}|[+]|[+]\d{2}|\d{2,3}|\d{1})?[\)]?)[\-|\s|\.]*?[\(]?\d{5}[\)]?[\-|\s|\.]*\d{5})\b)/gm);
        console.log("phone id is :",phone[0]);
        words.obj.details.mobile=phone[0].trim();
        }
        else{
          console.log("No phone found");
        }//phone

        // console.log(":::::::::::::::::::::::::::::::",myName);

        skill1.skill1(data,strongArr,h1Arr,update_arr,myName);

}
