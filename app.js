console.log("I am here!");
let viz
const containerDiv = document.getElementById('vizContainer');
const btn = document.getElementById('btn');
const showBtn = document.getElementById("showBtn");
const exportPDF = document.getElementById("exportPDF");
const exportImage = document.getElementById("exportImage");
const url ="https://public.tableau.com/views/ResaleFlatPriceHistory/Dashboard1";

const options ={
    hideTabs: true,
    height: 800,
    width: 1000,
    onFirstInteractive: function(){
        console.log("Hey, my dashboard is ready!");
    },
    onFirstVizSizeKnown: function(){
        console.log("Hey, my dashboard has a size!")
    }
};

function initViz(){
     viz = new tableau.Viz(containerDiv, url, options)
}

document.addEventListener("DOMContentLoaded", initViz);
// listen for  clicks to hide the viz
btn.addEventListener('click',function(){console.log('Hello from my button!');
viz.hide();
})
// listen for clicks to show viz
showBtn.addEventListener('click',function(){
    viz.show();
});
// listen for click to export to pdf
exportPDF.addEventListener('click', function(){
    viz.showExportPDFDialog();
});
// listen for click to export to image
exportImage.addEventListener('click', function(){
    viz.showExportImageDialog();
});

function getRangeValues(){
    //get the values from the input
    const minValue = document.getElementById("minValue").value
    const maxValue = document.getElementById("maxValue").value
    // get the workbook object
    const workbook = viz.getWorkbook();
    // get the active sheet in the window - this is the dashboard
    const activeSheet =workbook.getActiveSheet();
    // get all the sheets in the dashboard
    const sheets = activeSheet.getWorksheets();
    const sheetTofilter = sheets[1];
    sheetTofilter.applyRangeFilterAsync("Sales",{min:minValue,max:maxValue}).then(console.log('Filter applied!'));
    console.log(sheets);
}

document.getElementById('applyFilter').addEventListener('click',function(){
    getRangeValues();
})