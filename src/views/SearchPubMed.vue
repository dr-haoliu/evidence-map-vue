<template>
    <b-col class="home">
        <b-container fluid>
            <b-row align-v="start">
                <b-col sm="1"></b-col>
                <b-col sm="2">
                    <b-card>
                        <div class="box_large">
                            <div class="img_large">
                                <img class="myimg" alt="Vue logo" src="../assets/logo.png">
                            </div>
                        </div>
                    </b-card>

                </b-col>
                <b-col sm="1"></b-col>
                <b-col sm="8" class="float-right">
                    <b-card no-body>
                        <b-form class="d-flex flex-row">
                            <b-form-input
                                    v-model="pubid"
                                    id="input-1"
                                    placeholder="Search by Pubmed ID "
                                    style="margin-right: 4px"
                            ></b-form-input>
                            <b-button type="submit" variant="primary" @click="onSearch">Search</b-button>
                        </b-form>
                    </b-card>

                    <b-card style="margin-top: 10px" title="Select different visualizations" >
                        <b-row class="d-flex flex-row justify-content-between">
                            <b-col sm="2">
                                <div class="box">
                                    <div class="img">
                                        <img src="@/assets/monitor.png" @click="show('B')"/>
                                    </div>
                                  Graphic View
                                </div>
                            </b-col>
                            <b-col sm="2">
                                <div class="box">
                                    <div class="img">
                                        <img src="@/assets/draw.png" @click="show('A')"/>
                                    </div>
                                  Tabular View
                                </div>
                            </b-col>
                            <b-col sm="2" style="margin-top: 5px">
                                <div class="box">
                                    <div class="img">
                                        <img src="@/assets/checklist.png" @click="show('C')"/>
                                    </div>
                                  Sentence Breakdown
                                </div>

                            </b-col>
                            <b-col sm="2">
                                <div class="box">
                                    <div class="img">
                                        <img src="@/assets/edit-tools.png" @click="show('D')"/>
                                    </div>
                                  Json View
                                </div>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>

            </b-row>

            <b-row>
                <b-col sm="4">
                    <b-card style="margin-top: 10px">

                    <div class="card-title">
                        <p class="font-weight-bold text-uppercase">
                            Observational Study of Hydroxychloroquine in Hospitalized Patients with Covid-19.
                        </p>
                    </div>
                    <div class="card-text text-left">
                        <p class="font-weight-bold">BACKGROUND</p>
                        Hydroxychloroquine has been widely administered to patients with Covid-19 without robust evidence supporting its use.
                        <br/>
                        <p class="font-weight-bold">METHODS</p>
                        We examined the association between hydroxychloroquine use and intubation or death at a large medical center in New York City.
                        Data were obtained regarding consecutive patients hospitalized with Covid-19 , excluding those who were intubated , died , or discharged within 24 hours after presentation to the emergency department ( study baseline ).
                        The primary end point was a composite of intubation or death in a time-to-event analysis.
                        We compared outcomes in patients who received hydroxychloroquine with those in patients who did not , using a multivariable Cox model with inverse probability weighting according to the propensity score.
                        <br/>
                        <p class="font-weight-bold">RESULTS</p>
                        Of 1446 consecutive patients , 70 patients were intubated , died , or discharged within 24 hours after presentation and were excluded from the analysis.
                        Of the remaining 1376 patients , during a median follow-up of 22.5 days , 811 ( 58.9 % ) received hydroxychloroquine ( 600 mg twice on day 1 , then 400 mg daily for a median of 5 days ) ; 45.8 % of the patients were treated within 24 hours after presentation to the emergency department , and 85.9 % within 48 hours.
                        Hydroxychloroquine-treated patients were more severely ill at baseline than those who did not receive hydroxychloroquine ( median ratio of partial pressure of arterial oxygen to the fraction of inspired oxygen , 223 vs. 360 ).
                        Overall , 346 patients ( 25.1 % ) had a primary end-point event ( 180 patients were intubated , of whom 66 subsequently died , and 166 died without intubation ).
                        In the main analysis , there was no significant association between hydroxychloroquine use and intubation or death ( hazard ratio , 1.04 , 95 % confidence interval , 0.82 to 1.32 ).
                        Results were similar in multiple sensitivity analyses.
                        <br/>
                        <p class="font-weight-bold">CONCLUSIONS</p>
                        In this observational study involving patients with Covid-19 who had been admitted to the hospital , hydroxychloroquine administration was not associated with either a greatly lowered or an increased risk of the composite end point of intubation or death .
                        Randomized , controlled trials of hydroxychloroquine in patients with Covid-19 are needed.
                    </div>

                </b-card>
                </b-col>
                <b-col sm="8">
                    <b-card style="margin-top: 10px">
                        <component :is="name" />
                        <!--                        <TestHighCharts/>-->
                    </b-card>
                </b-col>
            </b-row>
        </b-container>


        <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <!--    <GOJS/>-->
    </b-col>
</template>

<script>
    // @ is an alias to /src

    import TestHighCharts from "../components/TestHighCharts";


    export default {
        name: 'SearchPubMed',
        components: {
            TestHighCharts
        },
        data () {
            return {
                name:'B',
                pubid:'',
                title:'',
                abstract:'',
            }
        },
        methods:{
            show(id){
                switch (id){
                    case 'A':
                        this.name = () => import('../components/GOJS')
                        break;
                    case 'B':
                        this.name = () => import('../components/TestHighCharts')
                        break;
                }
            },
            onSearch() {
                console.log('search!'+ this.pubid);
                // this.setPubid(this.pubid);
                this.$store.commit('setPubid', this.pubid);
                console.log(this.$store.state.pubid);
                this.show('B');
            },
        },
        mounted() {
            this.show('B');
            this.pubid = this.$store.state.pubid;
        }
    }
</script>

<style scoped>
    .box{
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
        align-content: center;
        width: 100px;
        height: 140px;
        margin: 0px;
    }
    .box .img{
        width: 100px;
        height: 100px;
        box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.1),
        -18px -18px 30px rgba(255, 255, 255, 1);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #efeeee;
        transition: box-shadow .2s ease-out;
        position: relative;
    }

    .box .img  img{
        width: 80px;
        transition: width 0.2s ease-out;
    }
    .box p{
        color: slategrey;
    }
    .box .img:hover{
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2),
        0px 0px 0px rgba(255, 255, 255, 0.8),
        inset 18px 18px 30px rgba(0, 0, 0, 0.1),
        inset -18px -18px 30px rgba(255, 255, 255, 1);
        transition: box-shadow .2s ease-out;
    }
    .box .img:hover img{
        width: 58px;
        transition: width 0.2s ease-out;
    }

    .box_large .img_large{
        width: 100%;
        height: 100%;
        box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.1),
        -18px -18px 30px rgba(255, 255, 255, 1);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #efeeee;
        transition: box-shadow .2s ease-out;
        position: relative;
    }

    .box_large .img_large  img{
        width: 90%;
        transition: width 0.2s ease-out;
    }

    .box_large .img_large:hover{
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2),
        0px 0px 0px rgba(255, 255, 255, 0.8),
        inset 18px 18px 30px rgba(0, 0, 0, 0.1),
        inset -18px -18px 30px rgba(255, 255, 255, 1);
        transition: box-shadow .2s ease-out;
    }

    /*.box_large .img_large:hover img{*/
    /*    width: 80%;*/
    /*    transition: width 0.2s ease-out;*/
    /*}*/

    .myimg{
        width: 100%;
        height: auto;
    }
</style>
