<template>
    <div class="home">
        <b-container fluid>
            <b-row align-v="start">
                <b-col md="1"></b-col>
                <b-col md="2" style="height: 300px">
                    <b-card no-body>
                        <div class="box_large">
                            <div class="img_large">
                                <img class="myimg" alt="Vue logo" src="../assets/logo.png">
                            </div>
                        </div>
                    </b-card>
                </b-col>

                <b-col>
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

                    <b-card style="margin-top: 10px">
                        <b-form class="d-flex flex-column" >
                            <b-form-group
                                    label-cols-sm="4"
                                    label-cols-lg="3"
                                    label="Population"
                                    label-for="input-horizontal"
                            >
                                <b-form-input
                                        v-model="population"
                                        id="input-2"
                                        placeholder="Enter Population"
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group
                                    label-cols-sm="4"
                                    label-cols-lg="3"
                                    label="Intervention"
                                    label-for="input-horizontal"
                            >
                                <b-form-input
                                        v-model="intervention"
                                        id="input-3"
                                        placeholder="Enter Intervention"
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group
                                    label-cols-sm="4"
                                    label-cols-lg="3"
                                    label="Outcome"
                                    label-for="input-horizontal"
                            >
                                <b-form-input
                                        v-model="outcome"
                                        id="input-4"
                                        placeholder="Enter Outcome"
                                ></b-form-input>
                            </b-form-group>

                        </b-form>
                        <b-button class="float-right" type="submit" variant="info" @click="onSearchPIO">Submit</b-button>


                    </b-card>

                    <b-card style="margin-top: 10px">
                        <TestHighCharts/>
                    </b-card>

                </b-col>


            </b-row>
        </b-container>

    </div>
</template>

<script>
    // @ is an alias to /src

    import TestHighCharts from "../components/TestHighCharts";
    import {mapMutations} from 'vuex';



    export default {
        name: 'Home',
        components: {
            TestHighCharts
        },
        data(){
            return{
                pubid: '',
                population: '',
                intervention: '',
                outcome: '',
            }
        },
        methods:{
            ...mapMutations([
                'setPubid',
                'setPopulation',
                'setInvervention',
                'setOutcome',
                ]),
            onSearch() {
                console.log('submit!'+ this.pubid);
                // this.setPubid(this.pubid);
                this.$store.commit('setPubid', this.pubid);
                console.log(this.$store.state.pubid);
                this.$router.push({name: 'Search', params:{pubid: this.pubid}});
            },
            onSearchPIO() {
                console.log('submit!'+ this.population);
                console.log('submit!'+ this.intervention);
                console.log('submit!'+ this.outcome);

                // this.setPopulation(this.population);
                // this.setInvervention(this.intervention);
                // this.setOutcome(this.outcome);

                this.$store.commit('setPopulation', this.population);
                this.$store.commit('setInvervention', this.intervention);
                this.$store.commit('setOutcome', this.outcome);
                console.log(this.$store.state.population);
            }

        }
    }
</script>

<style scoped>
    .myimg{
        width: 100%;
        height: auto;
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
</style>