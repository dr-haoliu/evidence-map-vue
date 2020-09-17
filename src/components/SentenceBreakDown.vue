<template>
  <!-- Sentence Breakdowns Section -->
  <b-container align="left" style="margin-top: 10px">
    <h2>Sentence-level Breakdown</h2>
    <div class="content" id="elements" style="padding-left: 40px; margin-top: 10px"
         v-for="(item, index) in sent_items" :key="index">

      <b-card>
          <b>{{ item["Section"] }}: </b>
          {{ item["text"] }}
          <hr>
<!--        <hr>-->
<!--        <p>-->
<!--          <b>Text</b> {{ item["text"] }}-->
<!--        </p>-->


        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="info">Evidence Elements</b-button>
          </b-card-header>
          <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-table-simple>
                <b-thead>
                  <b-tr>
                    <b-th>PICO</b-th>
                    <b-th>Term</b-th>
                    <b-th>Negation</b-th>
                    <b-th>UMLS CUI</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody v-for="(value, name, index) in item['Evidence Elements']" :key="index">
                  <b-tr v-for="(v, k, index) in value" :key="index">
                    <b-td>{{ name }}</b-td>
                    <b-td>{{ v['term'] }}</b-td>
                    <b-td>{{ v['negation'] }}</b-td>
                    <b-td>{{ v['UMLS'] }}</b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-card-body>
          </b-collapse>
        </b-card>

        <!--        <p>-->
        <!--          <b>Evidence Propositions</b>-->
        <!--        </p>-->
        <!--        <b-table-simple>-->
        <!--          <b-thead>-->
        <!--            <b-tr>-->
        <!--              <b-th>Intervention</b-th>-->
        <!--              <b-th>Observation</b-th>-->
        <!--              <b-th>Outcome</b-th>-->
        <!--              <b-th>Count</b-th>-->
        <!--            </b-tr>-->
        <!--          </b-thead>-->
        <!--          <b-tbody v-for="(value, name, index) in item['Evidence Propositions']" :key="index">-->
        <!--            <b-tr>-->
        <!--              <b-td>{{ value['Intervention'] }}</b-td>-->
        <!--              <b-td>{{ value['Observation'] }}</b-td>-->
        <!--              <b-td>{{ value['Outcome'] }}</b-td>-->
        <!--              <b-td>{{ value['Count'] }}</b-td>-->
        <!--            </b-tr>-->
        <!--          </b-tbody>-->
        <!--        </b-table-simple>-->


        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-2 variant="primary">Evidence Propositions</b-button>
          </b-card-header>
          <b-collapse id="accordion-2" visible accordion="my-accordion-2" role="tabpanel">
            <b-card-body>
              <b-table-simple>
                <b-thead>
                  <b-tr>
                    <b-th>Intervention</b-th>
                    <b-th>Observation</b-th>
                    <b-th>Outcome</b-th>
                    <b-th>Count</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody v-for="(value, name, index) in item['Evidence Propositions']" :key="index">
                  <b-tr>
                    <b-td>{{ value['Intervention'] }}</b-td>
                    <b-td>{{ value['Observation'] }}</b-td>
                    <b-td>{{ value['Outcome'] }}</b-td>
                    <b-td>{{ value['Count'] }}</b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-card-body>
          </b-collapse>
        </b-card>

      </b-card>
    </div>

  </b-container>

</template>

<script>

var appData = require('../data/32379955_gold_complete.json');

export default {
  name: "SentenceBreakDown",
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