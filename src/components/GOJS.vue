<template>

        <b-container fluid="sm">
                <div id="myDiagramDiv"></div>


        </b-container>
</template>

<script>
    import go from 'gojs'
    var appData = require('../data/32379955_gold_complete.json')
    var mylist = appData["study results"]["Arm 1"].results
    console.log(mylist);
    // var ind = 0;
    var sources = [];
    mylist.forEach(
            item=> sources.push({key: String(item['Outcome'].trim()), color: "orange"})
    );
    console.log(sources);
    var targets=[];
    mylist.forEach(
            item=> targets.push({key: String(item['Observation'].trim()), color: "grey"})
    );
    console.log(targets);

    var linksList = [];
    sources.forEach((num1, index) => {
            const num2 = targets[index];
            linksList.push({from: String(num1.key), to: String(num2.key)});
            console.log(num1, num2);
    });

    var keysList = sources.concat(targets);


    // console.log(appData.abstract);
    export default {
        name: "myGoJS",
            data(){
                return{
                        myJson: appData,
                        myList: mylist,
                }
            },
        mounted() {
            const $ = go.GraphObject.make;  // for conciseness in defining templates
            const myDiagram =
                $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
                    { // enable undo & redo
                        "undoManager.isEnabled": true
                    });

            // define a simple Node template
            myDiagram.nodeTemplate =
                $(go.Node, "Auto",  // the Shape will go around the TextBlock
                    $(go.Shape, "RoundedRectangle",
                        { strokeWidth: 0, fill: "white" },  // default fill is white
                        // Shape.fill is bound to Node.data.color
                        new go.Binding("fill", "color")),
                    $(go.TextBlock,
                        { margin: 8 },  // some room around the text
                        // TextBlock.text is bound to Node.data.key
                        new go.Binding("text", "key"))
                );

            // but use the default Link template, by not setting Diagram.linkTemplate

            // create the model data that will be represented by Nodes and Links
                myDiagram.model = new go.GraphLinksModel(keysList, linksList);
            // myDiagram.model = new go.GraphLinksModel(
            //     [
            //         { key: "Alpha", color: "lightblue" },
            //         { key: "Beta", color: "orange" },
            //         { key: "Gamma", color: "lightgreen" },
            //         { key: "Delta", color: "pink" }
            //     ],
            //     [
            //         { from: "Alpha", to: "Beta" },
            //         { from: "Alpha", to: "Gamma" },
            //         { from: "Beta", to: "Beta" },
            //         { from: "Gamma", to: "Delta" },
            //         { from: "Delta", to: "Alpha" }
            //     ]);
        }

    };
</script>

<style>
    #myDiagramDiv {
        width: 100%;
        height: 500px;
    }
</style>
