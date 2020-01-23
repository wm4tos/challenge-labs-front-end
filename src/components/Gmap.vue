<template>
  <GmapMap
    :center="center"
    :zoom="17"
    style="width: 500px; height: 300px"
  >
    <GmapMarker
      :position="center"
      clickable
      @click="redirect"
    />
  </GmapMap>
</template>

<script>
import { openURL } from 'quasar';
import { validateProps } from 'src/helpers';

export default {
  props: {
    center: {
      type: Object,
      required: true,
      validator(obj) {
        const props = ['lat', 'lng'];

        return validateProps(obj, ...props);
      },
    },
  },
  methods: {
    redirect() {
      const { lat, lng } = this.center;
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

      openURL(url);
    },
  },
};
</script>
