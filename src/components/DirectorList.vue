<template>
    <v-container class="" >
        <v-responsive class="align-center text-center fill-height ">
        <h3 class="text-h4 font-weight-bold">디렉터 찾기</h3>

        <div class="py-14" />
        <v-row class="d-flex align-center justify-center">
            <v-list
            :items="items"
            item-props
            lines="three"
            >
                <template v-slot:subtitle="{ subtitle }">
                    <div v-html="subtitle"></div>
                </template>
            </v-list>
        </v-row>

        <!-- <v-row class="d-flex align-center justify-center">
            <v-col cols="auto">
            <v-btn
                href="https://vuetifyjs.com/components/all/"
                min-width="164"
                rel="noopener noreferrer"
                target="_blank"
                variant="text"
            >
                <v-icon
                icon="mdi-view-dashboard"
                size="large"
                start
                />

                Components
            </v-btn>
            </v-col>

            <v-col cols="auto">
            <v-btn
                color="primary"
                href="https://vuetifyjs.com/introduction/why-vuetify/#feature-guides"
                min-width="228"
                rel="noopener noreferrer"
                size="x-large"
                target="_blank"
                variant="flat"
            >
                <v-icon
                icon="mdi-speedometer"
                size="large"
                start
                />

                Get Started
            </v-btn>
            </v-col>

            <v-col cols="auto">
            <v-btn
                href="https://community.vuetifyjs.com/"
                min-width="164"
                rel="noopener noreferrer"
                target="_blank"
                variant="text"
            >
                <v-icon
                icon="mdi-account-group"
                size="large"
                start
                />

                Community
            </v-btn>
            </v-col>
        </v-row> -->
        </v-responsive>
    </v-container>
</template>

<script>
import apiClient from '../api';
const dummyRequest = {
    distance: 3,
    property: "프로그래밍",
    hasSchedule: false,
    searchText: null,
    page: 1,
    size: 20
};

export default {
  data: () => ({
    items: [
      { type: 'subheader', title: 'Today' },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Brunch this weekend?',
        subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      { type: 'divider', inset: true },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Summer BBQ',
        subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      },
      { type: 'divider', inset: true },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Oui oui',
        subtitle:
          '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      },
      { type: 'divider', inset: true },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Birthday gift',
        subtitle:
          '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
      { type: 'divider', inset: true },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Recipe to try',
        subtitle:
          '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      },
    ],
  }),
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      console.log("12356");
      apiClient.post('/user/director/list', dummyRequest)
        .then(response => {
          this.data = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
  },

}

</script>
  