<template>
  <div>
    <!-- Study Design Section -->
    <b-container align="left" style="margin-top: 10px">
      <h2>Study Design</h2>
      <div class="content" id="design" style="padding-left: 40px">
        <b-row style="justify-content: space-between; margin-top: 10px">
          <h3>Hypothesis</h3>
          <b-button v-b-toggle.collapse-1 variant="primary">Toggle Collapse</b-button>
        </b-row>
        <b-collapse visible id="collapse-1" class="mt-2" style="margin-top: 10px">
          <b-card>
            <b-table striped hover :items="hypo_items" :fields="hypo_fields"></b-table>
          </b-card>
        </b-collapse>

        <b-row style="justify-content: space-between; margin-top: 10px">
          <h3>PICO Elements</h3>
          <b-button v-b-toggle.collapse-2 variant="info">Toggle Collapse</b-button>
        </b-row>
        <b-collapse visible id="collapse-2" class="mt-2">
          <b-card>
            <b-table striped hover :items="pico_items" :fields="pico_fields"></b-table>

          </b-card>
        </b-collapse>

      </div>
    </b-container>

    <!-- Study Results Section -->
    <b-container align="left" style="margin-top: 10px">
      <h2>Study Results</h2>
      <div class="content" id="results" style="padding-left: 40px">

        <b-row style="justify-content: space-between; margin-top: 10px">
          <h3>Study Arm 1: {{ arm1_term }}</h3>
          <b-button v-b-toggle.collapse-3 variant="primary">Toggle Collapse</b-button>
        </b-row>
        <b-collapse visible id="collapse-3" class="mt-2">
          <b-card>
            <b-table striped hover :items="arm1_items" :fields="arm1_fields"></b-table>

          </b-card>
        </b-collapse>

        <b-row style="justify-content: space-between; margin-top: 10px">
          <h3>Study Arm 2: {{ arm2_term }}</h3>
          <b-button v-b-toggle.collapse-4 variant="info">Toggle Collapse</b-button>
        </b-row>
        <b-collapse visible id="collapse-4" class="mt-2">
          <b-card>
            <b-table striped hover :items="arm2_items" :fields="arm2_fields"></b-table>

          </b-card>
        </b-collapse>

        <b-row style="justify-content: space-between; margin-top: 10px">
          <h3>All Arms: </h3>
          <b-button v-b-toggle.collapse-5 variant="warning">Toggle Collapse</b-button>
        </b-row>
        <b-collapse visible id="collapse-5" class="mt-2">
          <b-card>
            <b-table striped hover :items="allarms_items" :fields="allarms_fields"></b-table>

          </b-card>
        </b-collapse>


        <b-row style="justify-content: space-between; margin-top: 10px">
          <h3>Comparison:</h3>
          <b-button v-b-toggle.collapse-6 variant="success">Toggle Collapse</b-button>
        </b-row>
        <b-collapse visible id="collapse-6" class="mt-2">
          <b-card>
            <b-table striped hover :items="comparison_items" :fields="comparison_fields"></b-table>

          </b-card>
        </b-collapse>


      </div>
    </b-container>
  </div>

</template>

<script>

var appData = require('../data/32379955_gold_complete.json');

export default {
  name: "TableView",
  data() {
    return {
      interviewees: "",
      jsonData: appData,
      hypo_fields: ['Intervention', 'Observation', 'Outcome'],
      hypo_items: appData["study design"]['Hypothesis'],
      pico_fields: [
        {key: 'type', label: 'PICO'},
        {key: 'term', label: 'Term'},
        {key: 'negation', label: 'Negation'},
        {key: 'umls', label: 'UMLS CUI'},
      ],
      pico_items: [],
      arm1_term: appData["study results"]["Arm 1"]["term"],
      arm1_fields: ['Outcome', 'Observation', 'Count'],
      arm1_items: appData["study results"]["Arm 1"]["results"],
      arm2_term: appData["study results"]["Arm 2"]["term"],
      arm2_fields: ['Outcome', 'Observation', 'Count'],
      arm2_items: appData["study results"]["Arm 2"]["results"],
      allarms_fields: ['Outcome', 'Observation', 'Count'],
      allarms_items: appData["study results"]["All Arms"],
      comparison_fields: ['Intervention', 'Observation', 'Outcome', 'Count'],
      comparison_items: appData["study results"]["Comparison"],
      sent_items: appData["Sentences-level Breakdown"],
    }
  },
  methods: {

    getHyperlink(data) {
      return "https://pubmed.ncbi.nlm.nih.gov/".concat(data["doc_id"]);
    },
    getPicoElements(data) {
      var result = []
      data["study design"]['Participant'].forEach(t => {
        t['type'] = 'Participant';
        result.push(t);
      });
      data["study design"]['Intervention'].forEach(t => {
        t['type'] = 'Intervention';
        result.push(t);
      });
      data["study design"]['Outcome'].forEach(t => {
        t['type'] = 'Outcome';
        result.push(t);
      });
      return result;
    },

  },
  created() {
    this.pico_items = this.getPicoElements(this.jsonData);
  }

}
</script>

<style scoped>

</style>