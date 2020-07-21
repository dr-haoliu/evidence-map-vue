<template>

        <b-container style="overflow: scroll; height: 600px">

                <highcharts :options="chartOptions" class="mychart" ></highcharts>

        </b-container>



</template>

<script>

    import Highcharts from 'highcharts'
    // import Stock from 'highcharts/modules/stock'
    import Org from 'highcharts/modules/organization'
    import exporting from 'highcharts/modules/exporting'
    import sankey from 'highcharts/modules/sankey'
    import oldie from 'highcharts/modules/oldie'
    import {mapMutations} from 'vuex'

    var observation =  require('@/assets/statics.png')
    var people =  require('@/assets/people.png')
    var sentence =  require('@/assets/sentence.png')

    exporting(Highcharts)
    sankey(Highcharts)
    oldie(Highcharts)
    Org(Highcharts)

    var appData = require('../data/32379955_gold_complete.json');
    var mylist = appData["study results"]["Arm 1"].results;
    console.log('data: ');
    console.log(appData);
    console.log(mylist);

    var nodeDict={};
    var nodes=[];
    var keyIndex = 0;
    var fromToData = [];

    nodes.push({id: keyIndex, name:'Final', level:0});
    keyIndex++;
    nodes.push({id: keyIndex, name:'comparator', level:1});
    keyIndex++;
    nodes.push({id: keyIndex, name:'intervertion', level:2, image: sentence});
    keyIndex++;

    fromToData.push([0, 1]);
    fromToData.push([1, 2]);
    fromToData.push([2, 3]);


    mylist.forEach(
        item=> {
            key = String(item['Observation'].trim());
            if(key.length >0 && !nodeDict[key]){
                nodeDict[key] = keyIndex;
                nodes.push({id: keyIndex, name:key, level:3, color: '#e0e0e0', image: observation, type:'Observation'});
                keyIndex++;
            }

            var key = String(item['Outcome'].trim());
            if(key.length >0 && !nodeDict[key]){
                nodeDict[key] = keyIndex;
                nodes.push({id: keyIndex, name:key, level:4, color: '#FFFF33', image: people, type:'Outcome'});
                keyIndex++;
            }
        }
    );


    mylist.forEach(
        item=> {
            var from = String(item['Observation'].trim());
            var to = String(item['Outcome'].trim());
            fromToData.push([nodeDict[from], nodeDict[to]])
        }
    );




    export default {
        name: "TestHighCharts",
        data() {
            return {
                pubid: '32379955',
                chartOptions: '',
            }
        },
        methods:{
            ...mapMutations(['setPubid']),

        },
        mounted(){

        },
        created(){
            if (this.$store.state.pubid.length == 0){
                this.pubid = '32379955';
                this.setPubid(this.pubid);
                console.log('Found null');
                console.log(this.pubid);
            }else{
                this.pubid = this.$store.state.pubid;
                console.log('Found not null');
                console.log(this.pubid+' after change');
            }
            // this.pubid= '32379955';
            this.chartOptions = {
                chart: {
                    height: 600,
                    inverted: true,
                    // scrollablePlotArea: {
                    //     minWidth: 1600,
                    //     scrollPositionX: 0.5
                    // },
                    style: {
                        fontFamily: 'serif',
                        fontSize: '18px',
                        maxFontSize: '8px',
                        minFontSize: '1px',
                        textOverflow: 'allow'
                    }
                },
                title: {
                    text: 'Results Map for '+ this.pubid,
                    style:{
                        fontSize:"20px"
                    }
                },
                series: [{
                    type: 'organization',
                    name: 'Results Map',
                    keys: ['from', 'to'],
                    data: fromToData,
                    // data: [
                    //     ['Shareholders', 'Board'],
                    //     ['Board', 'CEO'],
                    //     ['CEO', 'CTO'],
                    //     ['CEO', 'CPO'],
                    //     ['CEO', 'CSO'],
                    //     ['CEO', 'CMO'],
                    //     ['CEO', 'HR'],
                    //     ['CTO', 'Product'],
                    //     ['CTO', 'Web'],
                    //     ['CSO', 'Sales'],
                    //     ['CMO', 'Market']
                    // ],
                    levels: [{
                        level: 0,
                        color: 'silver',
                        dataLabels: {
                            color: 'black'
                        },
                        height: 60
                    }, {
                        level: 1,
                        color: 'silver',
                        dataLabels: {
                            color: 'black'
                        },
                        height: 60
                    }, {
                        level: 2,
                        color: '#66cc00',
                        height: 60
                    }, {
                        level: 3,
                        color: '#e0e0e0',
                        height: 60,
                        dataLabels: {
                            color: 'black'
                        },
                        },
                        {
                        level: 4,
                        color: '#FFFF33',
                        height: 60,
                        dataLabels: {
                            color: 'black'
                        },
                    }],
                    nodes: nodes,
                    // nodes: [{
                    //     id: 'Shareholders',
                    //     name: 'I am a Shareholder'
                    // },
                    //     {
                    //     id: 'Board'
                    // }, {
                    //     id: 'CEO',
                    //     title: 'CEO',
                    //     name: 'Grethe Hjetland',
                    //     image: observation,
                    // }, {
                    //     id: 'HR',
                    //     title: 'HR/CFO',
                    //     name: 'Anne Jorunn Frendas',
                    //     color: '#007ad0',
                    //     image: observation,
                    //     column: 3,
                    //     offset: '75%'
                    // }, {
                    //     id: 'CTO',
                    //     title: 'CTO',
                    //     name: 'Christer Vasseng',
                    //     column: 4,
                    //     image: people,
                    //     layout: 'hanging',
                    // }, {
                    //     id: 'CPO',
                    //     title: 'CPO',
                    //     name: 'Torstein Hønsi',
                    //     column: 4,
                    //     image: sentence,
                    // }, {
                    //     id: 'CSO',
                    //     title: 'CSO',
                    //     name: 'Anita Nesse',
                    //     column: 4,
                    //     image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12132313/Anita.jpg',
                    //     layout: 'hanging'
                    // }, {
                    //     id: 'CMO',
                    //     // title: 'CMO',
                    //     name: 'Vidar Brekke sTest',
                    //     column: 4,
                    //     image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/13105551/Vidar.jpg',
                    //     layout: 'hanging'
                    // }, {
                    //     id: 'Product',
                    //     name: '产品研发',
                    //     column: 5,
                    // }, {
                    //     id: 'Web',
                    //     name: '运维',
                    //     description: '网站开发，系统维护',
                    //     column: 5,
                    // }, {
                    //     id: 'Sales',
                    //     name: '销售部',
                    //     column: 5,
                    // }, {
                    //     id: 'Market',
                    //     name: '市场部',
                    //     column: 5,
                    // }],
                    colorByPoint: false,
                    color: '#007ad0',
                    dataLabels: {
                        enabled: true,
                        color: 'white',
                        allowOverlap:true,
                        style: {
                            fontSize: '8px',
                            wordBreak: 'break-all',
                            textOverflow: 'allow'
                        }
                    },
                    borderColor: 'white',
                    nodeWidth: 80,
                }],
                tooltip: {
                    outside: true,
                    style:{
                        fontSize:"18px"
                    },
                    formatter(){
                            // console.log(this);
                        return '<b style="font-size: 28px;text-align: center">'+ this.point.name+'</b>';
                    }
                },
                exporting: {
                    allowHTML: true,
                    sourceWidth: 800,
                    sourceHeight: 600
                },
                plotOptions:{
                    organization: {
                        nodePadding: 10,
                        linkLineWidth: 4,
                        linkRadius:20,
                        dragDrop: {
                            draggableX: true,
                            draggableY: true
                        }

                    }
                }

            };


        }
    }
</script>

<style scoped>

        /deep/ h4{
            text-transform: none;
            font-size: 1.2rem;
            font-weight: normal;
            }

.mychart{
    width: 1400px;
}

</style>