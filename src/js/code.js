function loadData() {
    let request = new XMLHttpRequest();
    request.open("GET", "http://127.0.0.1:5000/");
    request.responseType = 'json';

    request.onload = function() {
        buildVisualization(request.response)
    };
    request.send()
}

function initializeElt(eltTag, innerHTML) {
    // Clean way to generate an HTML element that is of a specific tag-type
    newNode = document.createElement(eltTag)
    newNode.innerHTML = innerHTML
    return newNode
}

function buildVisualization(data) {
    // Main driver function, calls subfunctions
    const fmtData = reformatData(data);
    console.log(fmtData)

    buildOverview(fmtData)
    buildStudyDesign(fmtData["study_design"])
    buildStudyResults(fmtData["study_results"])
    buildSentences(fmtData["sentences"])
}

function buildOverview(data) {
    const overviewDiv = document.getElementById("overview")

    // Add Document ID
    var doc_link = "https://pubmed.ncbi.nlm.nih.gov/".concat(data["doc_id"])
    overviewDiv.appendChild(initializeElt("p", "<b>Document ID</b>: " + data["doc_id"].link(doc_link)))
    overviewDiv.appendChild(initializeElt("p", "<b>Question Type</b>: " + data["type of study"]))
    overviewDiv.appendChild(initializeElt("p", "<b>Title</b>: \"" + data["title"].bold()+"\""))
    overviewDiv.appendChild(initializeElt("p", "<b>Abstract</b>: " + data["abstract"]))
}

function mergeCell(table1, startRow, endRow, col) {
    var tb = document.getElementById(table1);
    if(!tb || !tb.rows || tb.rows.length <= 0) {
        return;
    }
    if(col >= tb.rows[0].cells.length || (startRow >= endRow && endRow != 0)) {
        return;
    }
    if(endRow == 0) {
        endRow = tb.rows.length - 1;
    }
    for(var i = startRow; i < endRow; i++) {
        if(tb.rows[startRow].cells[col].innerHTML == tb.rows[i + 1].cells[col].innerHTML) {
            tb.rows[i + 1].removeChild(tb.rows[i + 1].cells[col]);
            tb.rows[startRow].cells[col].rowSpan = (tb.rows[startRow].cells[col].rowSpan) + 1;
        } else {
            mergeCell(table1, i + 1, endRow, col);
            break;
        }
    }
}

function buildStudyDesign(designData) {
    const designDiv = document.getElementById("design")

    // Hypothesis information
    designDiv.appendChild(initializeElt('h3', "Hypothesis"))
    const hypTable = initializeElt('table', "")
    
    // Build table header
    const hypTableHeader = initializeElt('tr', "")
    hypTableHeader.appendChild(initializeElt('th', 'Intervention'))
    hypTableHeader.appendChild(initializeElt('th', 'Observation'))
    hypTableHeader.appendChild(initializeElt('th', 'Outcome'))

    hypTable.appendChild(hypTableHeader)
    designData["Hypothesis"].forEach(function (datum) {
        // Append the Intervention/Observation/Outcome rows for the hypothesis
        const hypTableRow = initializeElt('tr', "")
        hypTableRow.appendChild(initializeElt('td', datum["Intervention"]))
        hypTableRow.appendChild(initializeElt('td', datum["Observation"]))
        hypTableRow.appendChild(initializeElt('td', datum["Outcome"]))
        hypTable.appendChild(hypTableRow)
    })
    designDiv.appendChild(hypTable)

    designDiv.appendChild(initializeElt('h3', "PICO Elements"))
    const partTable = initializeElt('table', "")
    const partTableHeader = initializeElt('tr', "")
    partTableHeader.appendChild(initializeElt('th', 'PICO'))
    partTableHeader.appendChild(initializeElt('th', 'Term'))
    partTableHeader.appendChild(initializeElt('th', 'Negation'))
    partTableHeader.appendChild(initializeElt('th', 'UMLS CUI'))
    partTable.appendChild(partTableHeader)
    var pico_keys = ["Participant", "Intervention", "Outcome"]
    for (const key in pico_keys){
        //designDiv.appendChild(initializeElt('h3', "Participants"))
        
        designData[pico_keys[key]].forEach(function (datum) {
            const partTableRow = initializeElt('tr', "")
            partTableRow.appendChild(initializeElt('td', pico_keys[key]))
            partTableRow.appendChild(initializeElt('td', datum["term"]))
            partTableRow.appendChild(initializeElt('td', datum["negation"]))
            partTableRow.appendChild(initializeElt('td', datum["umls"]))
            partTable.appendChild(partTableRow)
    })
    designDiv.appendChild(partTable)
    }
    console.log(designDiv);
}

function buildSentences(sentencesData) {
    // console.log(sentencesData)
    // Break down the results by sentence
    const allSentenceDiv = document.getElementById("sentences")
    var currentSection = null;

    sentencesData.forEach(function (datum) {
        if (currentSection !== datum["section"]) {
            currentSection = datum["section"]
            const newHeader = initializeElt("h3", currentSection)
            newHeader.setAttribute('class', 'sentence-section-header')
            allSentenceDiv.appendChild(newHeader)
        }
        allSentenceDiv.appendChild(initializeElt('hr', ''))
        sentenceDiv = initializeElt('div', "")
        sentenceDiv.setAttribute('class', 'sentence-block content')
        sentenceDiv.appendChild(initializeElt('p', '<b>Text</b>: ' + datum["text"].italics()))
       
        // Evidence Element Tables
        sentenceDiv.appendChild(initializeElt('h3', "<b>Evidence Elements</b>"))
        picoEltTable = initializeElt('table', '')
        picoEltTableHeader = initializeElt('tr', '')
        picoEltTableHeader.appendChild(initializeElt('th', 'PICO'))
        picoEltTableHeader.appendChild(initializeElt('th', 'Term'))
        picoEltTableHeader.appendChild(initializeElt('th', 'Negation'))
        picoEltTableHeader.appendChild(initializeElt('th', 'UMLS CUI'))

        picoEltTable.appendChild(picoEltTableHeader)

        
        for (var key in Object.keys(datum["Evidence Elements"])){            
            if (Object.keys(datum["Evidence Elements"]).length >0) {
                var pico_key = Object.keys(datum["Evidence Elements"])[key]
                datum["Evidence Elements"][pico_key].forEach(function (datum2) {
                    picoEltTableRow = initializeElt('tr', '')

                    picoEltTableRow.appendChild(initializeElt('td', pico_key))
                    picoEltTableRow.appendChild(initializeElt('td', datum2["term"]))
                    picoEltTableRow.appendChild(initializeElt('td', datum2["negation"]))
                    picoEltTableRow.appendChild(initializeElt('td', datum2["umls"]))
                    picoEltTable.appendChild(picoEltTableRow)
                }) 

                sentenceDiv.appendChild(picoEltTable)    
            }   
            
        }
    
   
        // Evidence Propositions Tables
        sentenceDiv.appendChild(initializeElt('h3', "<b>Evidence Propositions</b>"))        
        MepTable = initializeElt('table', '')
        MepTableHeader = initializeElt('tr', '')
        MepTableHeader.appendChild(initializeElt('th', 'Intervention'))
        MepTableHeader.appendChild(initializeElt('th', 'Observation'))
        MepTableHeader.appendChild(initializeElt('th', 'Outcome'))
        MepTableHeader.appendChild(initializeElt('th', 'Count'))
        MepTable.appendChild(MepTableHeader)
    
        if (datum["Evidence Propositions"].length != 0){

            datum["Evidence Propositions"].forEach(function (datum2) {
                          
                MepTableRow = initializeElt('tr', '')
               
                MepTableRow.appendChild(initializeElt('td', datum2['Intervention']))
                MepTableRow.appendChild(initializeElt('td', datum2['Observation']))
                MepTableRow.appendChild(initializeElt('td', datum2['Outcome']))
                MepTableRow.appendChild(initializeElt('td', datum2['Count']))
                MepTable.appendChild(MepTableRow)
            }) 
                
            
            sentenceDiv.appendChild(MepTable)    
        }
        
           
        allSentenceDiv.appendChild(sentenceDiv)
        

    });
}

function buildStudyResults(resultsData) {
    const designDiv = document.getElementById("results")

    // StudyArm 1
    // Same logic as Hypothesis
    designDiv.appendChild(initializeElt('h3', "Study Arm 1: ".concat(resultsData["Arm 1"]["term"].italics()))) // resultsData["Arm 1"]["term"]
    const intTable = initializeElt('table', "")
    const intTableHeader  = initializeElt('tr', "")
    intTableHeader.appendChild(initializeElt('th', 'Outcome'))
    intTableHeader.appendChild(initializeElt('th', 'Observation'))
    intTableHeader.appendChild(initializeElt('th', 'Count'))
    intTable.appendChild(intTableHeader)
    resultsData["Arm 1"]["results"].forEach(function (datum) {
        const intTableRow = initializeElt('tr', "")
        intTableRow.appendChild(initializeElt('td', datum["Outcome"]))
        intTableRow.appendChild(initializeElt('td', datum["Observation"]))
        intTableRow.appendChild(initializeElt('td', datum["Count"]))
        intTable.appendChild(intTableRow)
    })
    designDiv.appendChild(intTable)

    // Study Arm 2
    // Same logic as Hypothesis
    designDiv.appendChild(initializeElt('h3', "Study Arm 2: ".concat(resultsData["Arm 2"]["term"].italics()) ))

    const outTable = initializeElt('table', "")
    const outTableHeader = initializeElt('tr', "")
    outTableHeader.appendChild(initializeElt('th', 'Outcome'))
    outTableHeader.appendChild(initializeElt('th', 'Observation'))
    outTableHeader.appendChild(initializeElt('th', 'Count'))
    outTable.appendChild(outTableHeader)
    resultsData["Arm 2"]["results"].forEach(function (datum) {
        const outTableRow = initializeElt('tr', "")
        outTableRow.appendChild(initializeElt('td', datum["Outcome"]))
        outTableRow.appendChild(initializeElt('td', datum["Observation"]))
        outTableRow.appendChild(initializeElt('td', datum["Count"]))
        outTable.appendChild(outTableRow)
    })
    designDiv.appendChild(outTable)

    // Hypothesis information
    designDiv.appendChild(initializeElt('h3', "All Arms"))
    const hypTable = initializeElt('table', "")
    
    // Build table header
    const hypTableHeader = initializeElt('tr', "")
    
    hypTableHeader.appendChild(initializeElt('th', 'Outcome'))
    hypTableHeader.appendChild(initializeElt('th', 'Observation'))
    hypTableHeader.appendChild(initializeElt('th', 'Count'))

    hypTable.appendChild(hypTableHeader)
    resultsData["All Arms"].forEach(function (datum) {
        // Append the Intervention/Observation/Outcome rows for the hypothesis
        const hypTableRow = initializeElt('tr', "")
        
        hypTableRow.appendChild(initializeElt('td', datum["Outcome"]))
        hypTableRow.appendChild(initializeElt('td', datum["Observation"]))
        hypTableRow.appendChild(initializeElt('td', datum["Count"]))
        hypTable.appendChild(hypTableRow)
    })
    designDiv.appendChild(hypTable)

    // Participants
    // Same logic as Hypothesis
    designDiv.appendChild(initializeElt('h3', "Comparison"))
    const partTable = initializeElt('table', "")
    const partTableHeader = initializeElt('tr', "")
    partTableHeader.appendChild(initializeElt('th', 'Intervention'))
    partTableHeader.appendChild(initializeElt('th', 'Observation'))
    partTableHeader.appendChild(initializeElt('th', 'Outcome'))
    partTableHeader.appendChild(initializeElt('th', 'Count'))

    
    partTable.appendChild(partTableHeader)
    resultsData["Comparison"].forEach(function (datum) {
        const partTableRow = initializeElt('tr', "")
        partTableRow.appendChild(initializeElt('td', datum["Intervention"]))
        partTableRow.appendChild(initializeElt('td', datum["Observation"]))
        partTableRow.appendChild(initializeElt('td', datum["Outcome"]))
        partTableRow.appendChild(initializeElt('td', datum["Count"]))
        partTable.appendChild(partTableRow)
    })
    designDiv.appendChild(partTable)
}

function reformatData(data) {
    // Any post-processing of the data goes here
    return data;
}