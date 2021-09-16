<template>
  <div class="editor">
    <tiptap-vuetify v-model="content" :extensions="extensions" />
  </div>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";
// https://www.npmjs.com/package/tiptap-vuetify
export default {
  components: {
    TiptapVuetify,
  },

  data() {
    return {
      extensions: [
        History,
        Blockquote,
        Link,
        Bold,
        Italic,
        Underline,
        Strike,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
      content:
        "<h1>Yay Headlines!</h1><p>All these <strong>cool tags</strong> are working now.</p>",
    };
  },

  mounted() {},

  methods: {},
};
</script>
