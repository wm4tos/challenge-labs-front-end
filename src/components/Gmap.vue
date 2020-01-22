<template>
  <GmapMap
    :center="center"
    :zoom="17"
    style="width: 500px; height: 300px"
  />
</template>

<script>
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
};
</script>
