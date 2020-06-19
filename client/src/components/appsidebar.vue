<template class="body">
  <v-list-item link>
    <v-list-item-action>
      <v-icon>{{ icon }}</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>
        {{ title }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "appsidebar",
  props: { icon: { type: String }, title: { type: String } }
};
</script>

<style></style>
