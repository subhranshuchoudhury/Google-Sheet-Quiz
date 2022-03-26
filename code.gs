function doGet(){
  const d = JSON.stringify(dataObj());
  //Logger.log(d);
  return ContentService.createTextOutput(d).setMimeType(ContentService.MimeType.JSON);

}

function dataObj(){
  const id = 'enter your sheet id here......';
  const data = SpreadsheetApp.openById(id).getSheetByName('enter your sheet name here...by default Sheet1').getDataRange().getValues();
  const headings = data[0];
  const rows = data.slice(1);
  const res = rows.map((row)=>{
    const temp = {question:row[0],answer:row[1],opts:[]};
    //i=2 and i<6 depends upon your options. here i have 4 option.
    //my 1st row in sheet: Questions | Corrcet | Option1 | Option2 | Option3 | Option4
    //in my sheet: 6 columns. rows depends on how many question you have..
    for(let i=2;i<6;i++){
      const val = row[i];
      if(val){
        temp.opts.push(val);
      }

    }
    return temp;
  })
  return res;

}


function doGet2(e){
  const output = {
    first : 'Subhranshu',
    last : 'Choudhury'
  }
  const strOutput = JSON.stringify(getSheetInfo());
  Logger.log(strOutput);
  return ContentService.createTextOutput(strOutput).setMimeType(ContentService.MimeType.JSON);
}

function getSheetInfo() {

  const id = 'enter your sheet id here......';
  const ss = SpreadsheetApp.openById(id);
  //console.log(ss);
  Logger.log(ss);
  const sheet = ss.getSheetByName('questions');
  Logger.log(sheet);
  const range = sheet.getDataRange();
  Logger.log(range);
  const data = range.getValues();
  Logger.log(data);
  data.forEach(row =>{
    //Logger.log(row);
  })
  return data;
}
